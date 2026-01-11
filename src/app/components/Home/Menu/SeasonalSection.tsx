'use client'

import { useMemo } from 'react'
import { FullMenuType } from '@/app/types/fullmenu'
import { DietaryIcon, DietaryTag } from '@/components/dietary'
import { DietaryType } from '@/app/components/Common/DietaryIcons'
import { useI18n } from '@/i18n/client'

// Helper function to map old dietary types to new dietary tags
const mapDietaryTypeToTag = (oldType: DietaryType): DietaryTag | null => {
  const mapping: Record<string, DietaryTag> = {
    'vegetarian': 'vegetarian',
    'vegan': 'vegan',
    'gluten-free': 'glutenFree',
    'spicy': 'spicy',
    'nut-free': 'nutFree',
    'dairy-free': 'dairyFree',
  }
  return mapping[oldType] || null
}

interface SeasonalSectionProps {
  items: FullMenuType[]
}

const SeasonalSection = ({ items }: SeasonalSectionProps) => {
  const { t } = useI18n()

  const seasonalItems = useMemo(() => {
    return items.filter(
      (item) => item.availability === 'seasonal' || item.availability === 'limited'
    )
  }, [items])

  if (seasonalItems.length === 0) return null

  const formatDate = (dateString?: string) => {
    if (!dateString) return null
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    } catch {
      return dateString
    }
  }

  return (
    <section id='specials-events' className='scroll-mt-20 py-16 md:py-20 relative'>
      <div className='container relative'>
        <div className='text-center mb-12'>
          <p className='text-deep text-lg font-bold tracking-widest uppercase'>
            {t('menu.seasonal.title')}
          </p>
          <h2 className='mt-3'>{t('menu.seasonal.subtitle')}</h2>
          <p className='text-deep/70 max-w-2xl mx-auto mt-4'>
            {t('menu.seasonal.description')}
          </p>
        </div>

        <div className='space-y-4'>
          {seasonalItems.map((item) => {
            const availableUntil = formatDate(item.availableUntil)
            return (
              <div
                key={item.name}
                className='bg-primary border border-primary/60 rounded-3xl p-6 shadow-[8px_8px_16px_rgba(47,42,31,0.15),-8px_-8px_16px_rgba(255,255,255,0.1)] hover:shadow-[12px_12px_24px_rgba(47,42,31,0.2),-12px_-12px_24px_rgba(255,255,255,0.15)] transition-shadow duration-300'>
                <div className='flex flex-col md:flex-row md:items-start md:justify-between gap-4'>
                  <div className='flex-1'>
                    <div className='flex items-start gap-3 flex-wrap mb-2'>
                      <h3 className='text-xl font-semibold text-deep'>{item.name}</h3>
                      {item.badge && (
                        <span className='px-3 py-1 rounded-full text-xs font-medium bg-secondary text-deep'>
                          {item.badge}
                        </span>
                      )}
                      {availableUntil && (
                        <span className='px-3 py-1 rounded-full text-xs font-medium bg-secondary/80 text-deep/80'>
                          {t('menu.seasonal.availableUntil')} {availableUntil}
                        </span>
                      )}
                      {item.style && (
                        <span className='px-3 py-1 rounded-full text-xs font-medium bg-secondary/80 text-deep/80'>
                          {item.style}
                        </span>
                      )}
                      {item.dietary && item.dietary.length > 0 && (
                        <div className='flex items-center gap-1.5 flex-wrap'>
                          {item.dietary
                            .map(mapDietaryTypeToTag)
                            .filter((tag): tag is DietaryTag => tag !== null)
                            .map((tag) => (
                              <DietaryIcon
                                key={tag}
                                tag={tag}
                                size={18}
                                className={
                                  tag === 'vegan' || tag === 'vegetarian'
                                    ? 'text-green-600'
                                    : tag === 'spicy'
                                    ? 'text-red-500'
                                    : 'text-amber-600'
                                }
                              />
                            ))}
                        </div>
                      )}
                    </div>
                    <p className='text-deep/80 text-sm leading-6'>{item.description}</p>
                  </div>
                  <div className='flex-shrink-0'>
                    <span className='text-xl font-bold text-deep'>{item.price}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default SeasonalSection
