'use client'

import { EventType } from '@/app/types/events'
import { useI18n } from '@/i18n/client'

interface EventsSectionProps {
  events: EventType[]
}

const EventsSection = ({ events }: EventsSectionProps) => {
  const { t } = useI18n()

  if (events.length === 0) return null

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    } catch {
      return dateString
    }
  }

  // Get map embed URL - uses mapEmbedUrl if provided, or generates from coordinates
  const getMapUrl = (event: EventType): string | null => {
    if (event.mapEmbedUrl) {
      return event.mapEmbedUrl
    }
    if (event.coordinates) {
      // Generate Google Maps embed URL from coordinates
      // Users can easily get embed URLs from Google Maps: Share > Embed a map
      return `https://www.google.com/maps?q=${event.coordinates.lat},${event.coordinates.lng}&output=embed`
    }
    return null
  }

  return (
    <section className='scroll-mt-20 py-16 md:py-20 relative'>
      <div className='container relative'>
        <div className='text-center mb-12'>
          <p className='text-deep text-lg font-bold tracking-widest uppercase'>
            {t('menu.events.title')}
          </p>
          <h2 className='mt-3'>{t('menu.events.subtitle')}</h2>
          <p className='text-deep/70 max-w-2xl mx-auto mt-4'>
            {t('menu.events.description')}
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {events.map((event, index) => {
            const mapUrl = getMapUrl(event)
            return (
              <div
                key={`${event.name}-${index}`}
                className='bg-primary border border-primary/60 rounded-3xl overflow-hidden shadow-[8px_8px_16px_rgba(47,42,31,0.15),-8px_-8px_16px_rgba(255,255,255,0.1)] hover:shadow-[12px_12px_24px_rgba(47,42,31,0.2),-12px_-12px_24px_rgba(255,255,255,0.15)] transition-shadow duration-300 flex flex-col'>
                {/* Map Section */}
                {mapUrl && (
                  <div className='relative w-full h-48 md:h-56 overflow-hidden'>
                    <iframe
                      src={mapUrl}
                      width='100%'
                      height='100%'
                      style={{ border: 0 }}
                      allowFullScreen
                      loading='lazy'
                      referrerPolicy='no-referrer-when-downgrade'
                      className='absolute inset-0'
                      title={`Map for ${event.name}`}
                    />
                  </div>
                )}
                
                {/* Content Section */}
                <div className='p-6 flex flex-col flex-grow'>
                  <div className='mb-4'>
                    <div className='flex items-start justify-between gap-3 mb-2'>
                      <h3 className='text-xl font-semibold text-deep flex-1'>{event.name}</h3>
                      <div className='text-primary font-semibold text-sm uppercase tracking-wider whitespace-nowrap'>
                        {formatDate(event.date)}
                      </div>
                    </div>
                    <p className='text-sm text-deep/70 mb-3'>
                      <span className='font-medium'>{t('menu.events.location')}:</span>{' '}
                      {event.location}
                    </p>
                    {event.description && (
                      <p className='text-sm text-deep/80 leading-6 mb-3'>{event.description}</p>
                    )}
                  </div>
                  
                  {event.menuItems && event.menuItems.length > 0 && (
                    <div className='mt-auto pt-3 border-t border-primary/30'>
                      <p className='text-xs font-medium text-deep/60 mb-2 uppercase tracking-wide'>
                        {t('menu.events.featuredItems')}:
                      </p>
                      <div className='flex flex-wrap gap-2'>
                        {event.menuItems.map((item, idx) => (
                          <span
                            key={idx}
                            className='px-2.5 py-1 rounded-full text-xs bg-secondary/80 text-deep/80 font-medium'>
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default EventsSection
