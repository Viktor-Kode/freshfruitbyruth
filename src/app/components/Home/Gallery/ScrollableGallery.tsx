'use client'

import Image from 'next/image'
import { GalleryImagesData } from '@/data/siteContent'
import { useI18n } from '@/i18n/client'
import { useRef, useState, useEffect } from 'react'

const ScrollableGallery = () => {
  const { t } = useI18n()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>(new Array(GalleryImagesData.length).fill(null))
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)

  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScrollability()
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', checkScrollability)
      window.addEventListener('resize', checkScrollability)
      
      // Use IntersectionObserver to detect active card
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
              const index = cardRefs.current.indexOf(entry.target as HTMLDivElement)
              if (index !== -1) {
                setActiveIndex(index)
              }
            }
          })
        },
        {
          root: container,
          threshold: 0.5,
        }
      )

      cardRefs.current.forEach((card) => {
        if (card) observer.observe(card)
      })

      return () => {
        container.removeEventListener('scroll', checkScrollability)
        window.removeEventListener('resize', checkScrollability)
        cardRefs.current.forEach((card) => {
          if (card) observer.unobserve(card)
        })
      }
    }
  }, [])

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = window.innerWidth < 768 ? 280 : 400
      scrollContainerRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = window.innerWidth < 768 ? 280 : 400
      scrollContainerRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' })
    }
  }

  return (
    <section id='gallery' className='scroll-mt-20 py-16 md:py-20 relative'>
      <div className='container relative'>
        <div className='text-center mb-12'>
          <p className='text-deep text-lg font-bold tracking-widest uppercase'>
            {t('gallery.title')}
          </p>
          <h2 className='mt-3'>{t('gallery.subtitle')}</h2>
          <p className='text-deep/70 max-w-2xl mx-auto mt-4'>
            {t('gallery.description')}
          </p>
        </div>

        <div className='relative'>
          {/* Scroll buttons - hidden on mobile */}
          <button
            onClick={scrollLeft}
            className={`hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-primary/90 hover:bg-primary text-deep rounded-full p-3 shadow-[8px_8px_16px_rgba(47,42,31,0.15),-8px_-8px_16px_rgba(255,255,255,0.1)] transition-all duration-300 hover:scale-110 ${
              !canScrollLeft ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            aria-label='Scroll left'
            disabled={!canScrollLeft}>
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'>
              <path d='M15 18l-6-6 6-6' />
            </svg>
          </button>
          <button
            onClick={scrollRight}
            className={`hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-primary/90 hover:bg-primary text-deep rounded-full p-3 shadow-[8px_8px_16px_rgba(47,42,31,0.15),-8px_-8px_16px_rgba(255,255,255,0.1)] transition-all duration-300 hover:scale-110 ${
              !canScrollRight ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            aria-label='Scroll right'
            disabled={!canScrollRight}>
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'>
              <path d='M9 18l6-6-6-6' />
            </svg>
          </button>

          {/* Scrollable container */}
          <div
            ref={scrollContainerRef}
            className='flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-4 md:pb-4 px-4 md:px-2 snap-x snap-mandatory'
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}>
            {GalleryImagesData.map((item, index) => (
              <div
                key={index}
                ref={(el) => {
                  cardRefs.current[index] = el
                }}
                className='flex-shrink-0 w-[calc(100vw-3rem)] md:w-[400px] snap-start bg-primary border border-primary/60 rounded-3xl overflow-hidden shadow-[8px_8px_16px_rgba(47,42,31,0.15),-8px_-8px_16px_rgba(255,255,255,0.1)] hover:shadow-[12px_12px_24px_rgba(47,42,31,0.2),-12px_-12px_24px_rgba(255,255,255,0.15)] transition-shadow duration-300 group'>
                <div className='relative h-[250px] md:h-[300px] overflow-hidden'>
                  <Image
                    src={item.src}
                    alt={item.name}
                    fill
                    className='object-cover group-hover:scale-105 transition-transform duration-300'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-deep/80 via-deep/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                </div>
                <div className='p-6'>
                  <h3 className='text-xl font-semibold text-deep mb-2'>{item.name}</h3>
                  <p className='text-2xl font-bold text-primary'>{item.price}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll gesture indicator - mobile only */}
          <div className='md:hidden flex flex-col items-center gap-3 mt-6 mb-4'>
            {/* Swipe gesture animation */}
            <div className='flex items-center gap-3 px-4 py-2.5 bg-primary/10 rounded-full border border-primary/30'>
              <svg
                className='w-6 h-6 text-deep animate-bounce-x'
                fill='none'
                stroke='currentColor'
                strokeWidth={2.5}
                viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M7 16l-4-4m0 0l4-4m-4 4h18'
                />
              </svg>
              <span className='text-sm font-bold text-deep'>Swipe to explore</span>
              <svg
                className='w-6 h-6 text-deep animate-bounce-x-reverse'
                fill='none'
                stroke='currentColor'
                strokeWidth={2.5}
                viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M17 8l4 4m0 0l-4 4m4-4H3'
                />
              </svg>
            </div>
            {/* Progress dots */}
            <div className='flex gap-2 items-center'>
              {GalleryImagesData.map((_, index) => (
                <div
                  key={index}
                  className={`rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'w-3 h-3 bg-primary shadow-sm'
                      : 'w-2 h-2 bg-primary/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ScrollableGallery
