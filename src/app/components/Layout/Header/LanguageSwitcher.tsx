'use client'

import { useI18n } from '@/i18n/client'
import { Locale } from '@/i18n/config'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useCallback, useRef } from 'react'

interface LanguageSwitcherProps {
  sticky: boolean
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ sticky }) => {
  const { locale, setLocale, isLoading } = useI18n()
  const isSwitchingRef = useRef(false)

  const toggleLanguage = useCallback(() => {
    if (isSwitchingRef.current || isLoading) return // Prevent rapid clicks or clicks during loading
    
    const newLocale: Locale = locale === 'en' ? 'es' : 'en'
    isSwitchingRef.current = true
    setLocale(newLocale)
    
    // Reset switching state after a short delay
    setTimeout(() => {
      isSwitchingRef.current = false
    }, 500)
  }, [locale, setLocale, isLoading])

  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-300 ${
        sticky
          ? 'text-black hover:bg-primary/10 hover:text-primary'
          : 'text-white hover:bg-white/10 hover:text-white'
      }`}
      aria-label={`Switch to ${locale === 'en' ? 'Spanish' : 'English'}`}
      title={`Switch to ${locale === 'en' ? 'Spanish' : 'English'}`}>
      <Icon
        icon='material-symbols:language'
        className='text-xl'
      />
      <span className='hidden sm:inline font-medium uppercase text-sm'>
        {locale === 'en' ? 'ES' : 'EN'}
      </span>
    </button>
  )
}

export default LanguageSwitcher

