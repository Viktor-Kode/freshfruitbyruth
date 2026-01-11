'use client'

import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useCallback, useEffect, useRef } from 'react'
import { useI18n } from '@/i18n/client'

const Hero = () => {
  const { t } = useI18n()
  const autoplay = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnFocusIn: false }),
  )
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [autoplay.current],
  )

  const heroSlides = [
    {
      title: t('hero.slides.slide1.title'),
      description: t('hero.slides.slide1.description'),
      imageDesktop: '/images/hero-carousel-desktop/hero-carousel-1.jpeg',
      imageMobile: '/images/hero-carousel-mobile/hero-mobile-1.jpeg',
    },
    {
      title: t('hero.slides.slide2.title'),
      description: t('hero.slides.slide2.description'),
      imageDesktop: '/images/hero-carousel-desktop/hero-carousel-2.jpeg',
      imageMobile: '/images/hero-carousel-mobile/hero-mobile-2.jpeg',
    },
    {
      title: t('hero.slides.slide3.title'),
      description: t('hero.slides.slide3.description'),
      imageDesktop: '/images/hero-carousel-desktop/hero-carousel-3.jpeg',
      imageMobile: '/images/hero-carousel-mobile/hero-mobile-3.jpeg',
    },
  ]

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    const handleMouseEnter = () => autoplay.current.stop()
    const handleMouseLeave = () => autoplay.current.play()

    const rootNode = emblaApi.rootNode()
    rootNode.addEventListener('mouseenter', handleMouseEnter)
    rootNode.addEventListener('mouseleave', handleMouseLeave)

    autoplay.current.play()

    return () => {
      rootNode.removeEventListener('mouseenter', handleMouseEnter)
      rootNode.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [emblaApi])

  return (
    <section
      id='home-section'
      className='relative h-screen min-h-[640px] bg-secondary text-deep overflow-hidden'>
      <div className='absolute inset-0'>
        <div className='embla h-full' ref={emblaRef}>
          <div className='embla__container h-full flex'>
            {heroSlides.map((slide, index) => (
              <div
                key={slide.title}
                className='embla__slide relative min-w-full'>
                {/* Desktop Image */}
                <Image
                  src={slide.imageDesktop}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  sizes='100vw'
                  className='hidden md:block object-cover brightness-75'
                />
                {/* Mobile Image */}
                <Image
                  src={slide.imageMobile}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  sizes='100vw'
                  className='block md:hidden object-cover brightness-75'
                />
                <div className='absolute inset-0 bg-gradient-to-r from-deep/90 via-deep/60 to-transparent' />
                <div className='relative z-10 h-full flex items-center'>
                  <div className='container'>
                    <div className='max-w-3xl space-y-6'>
                      <p className='text-primary uppercase tracking-[0.35em] text-sm'>
                        {t('hero.cantina')}
                      </p>
                      <h1 className='text-[#fef6da]'>
                        {slide.title}
                      </h1>
                      <p className='text-lg text-[#fef6da]/80 leading-8'>
                        {slide.description}
                      </p>
                      <div className='flex flex-col sm:flex-row gap-4 pt-4'>
                        <button
                          onClick={() => {
                            const element = document.getElementById('menu-section')
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                            }
                          }}
                          className='rounded-full bg-primary text-deep font-semibold px-8 py-3 border border-primary hover:bg-accent transition'>
                          {t('hero.viewMenu')}
                        </button>
                        <button
                          onClick={() => {
                            const element = document.getElementById('contact')
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                            }
                          }}
                          className='rounded-full border border-[#fef6da] text-[#fef6da] px-8 py-3 font-semibold hover:bg-[#fef6da] hover:text-deep transition'>
                          {t('hero.contactUs')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='absolute inset-x-0 bottom-10 flex justify-center gap-6 px-6'>
          <button
            onClick={scrollPrev}
            className='h-12 w-12 rounded-full bg-secondary/80 text-deep backdrop-blur-sm hover:bg-secondary transition flex items-center justify-center text-lg font-semibold'>
            ‹
          </button>
          <button
            onClick={scrollNext}
            className='h-12 w-12 rounded-full bg-secondary/80 text-deep backdrop-blur-sm hover:bg-secondary transition flex items-center justify-center text-lg font-semibold'>
            ›
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
