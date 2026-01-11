'use client'
import { useEffect, useState } from 'react'
import { exportMenuPdf } from '@/app/utils/exportMenuPdf'
import {
  FullMenuData,
  CateringPackagesData,
  SpecialOrdersData,
  EventsData,
  VendorMetadataData,
} from '@/data/siteContent'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  // Top: 0 takes us all the way back to the top of the page
  // Behavior: smooth keeps it smooth!
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const handleDownloadMenu = async () => {
    try {
      setIsExporting(true)
      await new Promise((resolve) => setTimeout(resolve, 100))

      // Separate menu items by availability
      const mainMenu = FullMenuData.filter(
        (item) => !item.availability || item.availability === 'standard'
      )
      const seasonalMenu = FullMenuData.filter(
        (item) => item.availability === 'seasonal' || item.availability === 'limited'
      )

      exportMenuPdf({
        menu: mainMenu,
        seasonal: seasonalMenu,
        catering: CateringPackagesData,
        specialOrders: SpecialOrdersData,
        events: EventsData,
        vendorName: VendorMetadataData.vendorName,
      })
    } finally {
      setIsExporting(false)
    }
  }

  useEffect(() => {
    // Button is displayed after scrolling for 500 pixels
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  return (
    <div className='fixed bottom-8 right-8 z-999'>
      <div className='flex items-center gap-2.5'>
        <button
          type='button'
          onClick={handleDownloadMenu}
          disabled={isExporting}
          className={`rounded-lg text-sm px-3 py-2.5 sm:px-4 sm:py-3.5 leading-none font-medium text-nowrap transition ${
            isExporting
              ? 'bg-primary/60 text-white cursor-not-allowed'
              : 'bg-primary text-white hover:bg-accent hover:text-deep'
          }`}>
          {isExporting ? 'Preparing…' : 'Download Menu'}
        </button>
        {isVisible && (
          <div
            onClick={scrollToTop}
            aria-label='scroll to top'
            className='back-to-top flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-primary text-white shadow-md transition duration-300 ease-in-out hover:bg-dark'>
            <span className='mt-[6px] h-3 w-3 rotate-45 border-l border-t border-white'></span>
          </div>
        )}
      </div>
    </div>
  )
}
