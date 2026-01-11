'use client'

import { useMemo, useState } from 'react'
import { FullMenuData } from '@/data/siteContent'
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

const InteractiveMenu = () => {
  const { t } = useI18n()
  const [activeStyle, setActiveStyle] = useState<string>('All')

  const styles = useMemo(() => {
    // Only include styles from standard items
    const standardItems = FullMenuData.filter(
      (item) => !item.availability || item.availability === 'standard'
    )
    const uniqueStyles = Array.from(
      new Set(standardItems.map((item) => item.style)),
    ).sort()
    return ['All', ...uniqueStyles]
  }, [])

  const filteredMenu = useMemo(() => {
    // Filter to only show standard items (exclude seasonal/limited)
    const standardItems = FullMenuData.filter(
      (item) => !item.availability || item.availability === 'standard'
    )
    if (activeStyle === 'All') return standardItems
    return standardItems.filter((item) => item.style === activeStyle)
  }, [activeStyle])


  return (
    <section id='menu-section' className='scroll-mt-20 py-16 md:py-20 relative'>
      <div className='container relative'>
        <div className='text-center mb-12'>
          <p className='text-deep text-lg font-bold tracking-widest uppercase'>
            {t('menu.title')}
          </p>
          <h2 className='mt-3'>{t('menu.subtitle')}</h2>
          <p className='text-deep/70 max-w-2xl mx-auto mt-4'>
            {t('menu.description')}
          </p>
        </div>

        <div className='flex flex-wrap justify-center gap-3 mb-8'>
          {styles.map((style) => {
            const isActive = style === activeStyle
            return (
              <button
                key={style}
                type='button'
                onClick={() => {
                  setActiveStyle(style)
                }}
                className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-primary text-white border-primary shadow-md'
                    : 'border-black/10 text-black/70 hover:border-primary hover:text-primary'
                }`}>
                {style}
              </button>
            )
          })}
        </div>

        <div className='space-y-4'>
          {filteredMenu.map((item) => (
            <div
              key={item.name}
              className='bg-primary border border-primary/60 rounded-3xl p-6 shadow-[8px_8px_16px_rgba(47,42,31,0.15),-8px_-8px_16px_rgba(255,255,255,0.1)] hover:shadow-[12px_12px_24px_rgba(47,42,31,0.2),-12px_-12px_24px_rgba(255,255,255,0.15)] transition-shadow duration-300'>
              <div className='flex flex-col md:flex-row md:items-start md:justify-between gap-4'>
                <div className='flex-1'>
                  <div className='flex items-start gap-3 flex-wrap mb-2'>
                    <h3 className='text-xl font-semibold text-deep'>{item.name}</h3>
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
          ))}
        </div>
      </div>
    </section>
  )
}

export default InteractiveMenu

