'use client'

import { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react'
import { Locale } from './config'

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, params?: Record<string, any>) => string
  messages: Record<string, any>
  isLoading: boolean
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

// Preload messages for both locales
const messageCache: Record<Locale, Record<string, any> | null> = {
  en: null,
  es: null,
}

export function I18nProvider({ children, initialLocale = 'en' }: { children: ReactNode; initialLocale?: Locale }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale as Locale)
  const [messages, setMessages] = useState<Record<string, any>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSwitching, setIsSwitching] = useState(false)

  // Preload both languages immediately on mount for better performance
  useEffect(() => {
    let isMounted = true
    
    const preloadAllLanguages = async () => {
      const locales: Locale[] = ['en', 'es']
      const loadPromises = locales.map(async (loc) => {
        if (!messageCache[loc]) {
          try {
            const mod = await import(`../messages/${loc}.json`)
            messageCache[loc] = mod.default
          } catch (err) {
            console.error(`Failed to load messages for locale ${loc}:`, err)
          }
        }
      })

      await Promise.all(loadPromises)
      
      // Set initial messages from cache
      if (isMounted && messageCache[initialLocale]) {
        setMessages(messageCache[initialLocale]!)
        setIsLoading(false)
      }
    }

    preloadAllLanguages()
    
    return () => {
      isMounted = false
    }
  }, [initialLocale])

  // Handle locale changes (only after initial load)
  useEffect(() => {
    if (isLoading) return // Don't handle changes while initial loading

    const loadLocaleMessages = async () => {
      if (messageCache[locale]) {
        // Messages already cached, use immediately
        setMessages(messageCache[locale]!)
        setIsSwitching(false)
      } else {
        // Messages not cached, load them
        setIsSwitching(true)
        try {
          const mod = await import(`../messages/${locale}.json`)
          messageCache[locale] = mod.default
          setMessages(mod.default)
        } catch (err) {
          console.error(`Failed to load messages for locale ${locale}:`, err)
        } finally {
          setIsSwitching(false)
        }
      }
    }

    loadLocaleMessages()
  }, [locale, isLoading])

  useEffect(() => {
    // Save locale preference to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', locale)
    }
  }, [locale])

  const setLocale = useCallback((newLocale: Locale) => {
    if (newLocale === locale) return
    
    setIsSwitching(true)
    setLocaleState(newLocale)
    
    // If messages are cached, use them immediately (no loading needed)
    if (messageCache[newLocale]) {
      setMessages(messageCache[newLocale]!)
      setIsSwitching(false)
    }
    // Otherwise, the useEffect will handle loading
  }, [locale])

  const t = useCallback((key: string, params?: Record<string, any>): string => {
    const keys = key.split('.')
    let value: any = messages

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return key // Return key if translation not found
      }
    }

    if (typeof value !== 'string') {
      return key
    }

    // Replace parameters in the string
    if (params) {
      return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
        return params[paramKey] !== undefined ? String(params[paramKey]) : match
      })
    }

    return value
  }, [messages])

  const contextValue = useMemo(() => ({
    locale,
    setLocale,
    t,
    messages,
    isLoading: isLoading || isSwitching,
  }), [locale, setLocale, t, messages, isLoading, isSwitching])

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}

