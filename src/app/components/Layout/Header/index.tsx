'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import Logo from './Logo'
import HeaderLink from './Navigation/HeaderLink'
import MobileHeaderLink from './Navigation/MobileHeaderLink'
import { Icon } from '@iconify/react/dist/iconify.js'
import { HeaderData } from '@/data/siteContent'
import LanguageSwitcher from './LanguageSwitcher'
import { useI18n } from '@/i18n/client'

const Header: React.FC = () => {
  const [navbarOpen, setNavbarOpen] = useState(false)
  const [sticky, setSticky] = useState(false)

  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const { t } = useI18n()

  const headerLink = HeaderData

  const handleScroll = () => {
    setSticky(window.scrollY >= 20)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target as Node) &&
      navbarOpen
    ) {
      setNavbarOpen(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [navbarOpen])

  useEffect(() => {
    if (navbarOpen) {
      // Calculate scrollbar width to prevent layout shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      
      // Prevent body scroll and compensate for scrollbar width
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollbarWidth}px`
      
      return () => {
        // Restore styles
        document.body.style.overflow = ''
        document.body.style.paddingRight = ''
      }
    }
  }, [navbarOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 py-3 md:py-5 w-full min-h-[60px] transition-all duration-300 ${
          sticky 
            ? 'shadow-lg bg-white backdrop-blur-sm' 
            : 'bg-transparent backdrop-blur-0'
        }`}>
        <div className='container flex items-center justify-between h-full'>
            <div>
              <Logo sticky={sticky} />
            </div>
            <nav className='hidden lg:flex grow items-center gap-4 xl:gap-6  justify-center'>
              {headerLink.map((item, index) => (
                <HeaderLink key={index} item={item} sticky={sticky} />
              ))}
            </nav>
            <div className='flex items-center gap-2 lg:gap-3'>
              <LanguageSwitcher sticky={sticky} />
              <Link
                href='tel:+10000000000'
                className={`text-lg font-medium hidden xl:block transition-colors duration-300 ${
                  sticky ? 'text-black hover:text-primary' : 'text-white hover:text-white/80'
                }`}
                aria-label={t('common.callReservations')}>
                <Icon
                  icon='solar:phone-bold'
                  className={`text-3xl lg:text-2xl inline-block me-2 transition-colors duration-300 ${
                    sticky ? 'text-primary' : 'text-white'
                  }`}
                />
                {t('common.phone')}
              </Link>
              <button
                onClick={() => setNavbarOpen(!navbarOpen)}
                className='block lg:hidden p-2 rounded-lg touch-manipulation'
                aria-label={t('common.toggleMenu')}
                aria-expanded={navbarOpen}>
                <span className={`block w-6 h-0.5 transition-colors duration-300 ${sticky ? 'bg-black' : 'bg-white'}`}></span>
                <span className={`block w-6 h-0.5 mt-1.5 transition-colors duration-300 ${sticky ? 'bg-black' : 'bg-white'}`}></span>
                <span className={`block w-6 h-0.5 mt-1.5 transition-colors duration-300 ${sticky ? 'bg-black' : 'bg-white'}`}></span>
              </button>
            </div>
          </div>
      </header>
      {/* Mobile menu backdrop - outside header to avoid backdrop-blur inheritance */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[45] transition-opacity duration-300 ${
          navbarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setNavbarOpen(false)}
        aria-hidden={!navbarOpen}
      />
      {/* Mobile menu - outside header to avoid backdrop-blur inheritance */}
      <div
        ref={mobileMenuRef}
        className='lg:hidden fixed top-0 right-0 h-full w-full shadow-lg max-w-xs z-50 transition-transform duration-300 ease-in-out mobile-menu'
        style={{
          transform: navbarOpen ? 'translateX(0)' : 'translateX(100%)',
          WebkitTransform: navbarOpen ? 'translateX(0)' : 'translateX(100%)',
          backgroundColor: '#ffffff',
          background: '#ffffff',
          isolation: 'isolate',
        }}>
        <div className='flex items-center justify-between gap-2 p-4'>
          <div>
            <Logo sticky={true} />
          </div>
          {/*  */}
          <button
            onClick={() => setNavbarOpen(false)}
            className="hover:cursor-pointer"
            aria-label={t('common.closeMenu')}>
            <Icon
              icon='material-symbols:close-rounded'
              width={24}
              height={24}
              className='text-black hover:text-primary text-24 inline-block me-2'
            />
          </button>
        </div>
        <div className='flex items-center justify-between px-4 mt-6'>
          <Link
            href='tel:+10000000000'
            className='text-lg font-medium hover:text-primary block md:hidden'
            aria-label={t('common.callReservations')}>
            <Icon
              icon='solar:phone-bold'
              className='text-primary text-3xl lg:text-2xl inline-block me-2'
            />
            {t('common.phone')}
          </Link>
          <LanguageSwitcher sticky={true} />
        </div>
        <nav className='flex flex-col items-start p-4'>
          {headerLink.map((item, index) => (
            <MobileHeaderLink 
              key={index} 
              item={item} 
              onLinkClick={() => setNavbarOpen(false)}
            />
          ))}
        </nav>
      </div>
    </>
  )
}

export default Header
