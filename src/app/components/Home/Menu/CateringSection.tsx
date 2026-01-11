'use client'

import { CateringPackageType } from '@/app/types/catering'
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

interface CateringSectionProps {
  packages: CateringPackageType[]
}

const CateringSection = ({ packages }: CateringSectionProps) => {
  const { t } = useI18n()

  if (packages.length === 0) return null

  const formatPrice = (price: string | number): string => {
    if (typeof price === 'string') return price
    return `$${price.toLocaleString()}`
  }

  return (
    <section className='scroll-mt-20 py-16 md:py-20 relative'>
      <div className='container relative'>
        <div className='text-center mb-12'>
          <p className='text-deep text-lg font-bold tracking-widest uppercase'>
            {t('menu.catering.title')}
          </p>
          <h2 className='mt-3'>{t('menu.catering.subtitle')}</h2>
          <p className='text-deep/70 max-w-2xl mx-auto mt-4'>
            {t('menu.catering.description')}
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className='bg-primary border border-primary/60 rounded-3xl p-6 shadow-[8px_8px_16px_rgba(47,42,31,0.15),-8px_-8px_16px_rgba(255,255,255,0.1)] hover:shadow-[12px_12px_24px_rgba(47,42,31,0.2),-12px_-12px_24px_rgba(255,255,255,0.15)] transition-all duration-300 hover:bg-primary/90 hover:border-primary'>
              <div className='flex flex-col h-full'>
                <div className='mb-4'>
                  <h3 className='text-xl font-semibold text-deep mb-2'>{pkg.name}</h3>
                  <div className='flex items-center gap-2 flex-wrap'>
                    <span className='px-3 py-1.5 rounded-full text-sm font-semibold bg-secondary text-deep'>
                      {t('menu.catering.serves')} {pkg.servesCount}
                    </span>
                    {pkg.dietary && pkg.dietary.length > 0 && (
                      <div className='flex items-center gap-1'>
                        {pkg.dietary
                          .map(mapDietaryTypeToTag)
                          .filter((tag): tag is DietaryTag => tag !== null)
                          .map((tag) => (
                            <DietaryIcon
                              key={tag}
                              tag={tag}
                              size={16}
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
                </div>

                <div className='mb-4 flex-grow'>
                  <p className='text-deep/80 text-sm leading-6'>{pkg.description}</p>
                </div>

                <div className='mt-auto space-y-3'>
                  <div className='flex items-baseline justify-between'>
                    <span className='text-3xl font-bold text-deep'>
                      {formatPrice(pkg.price)}
                    </span>
                  </div>

                  <div className='text-sm text-deep/70 space-y-1'>
                    <p>
                      <span className='font-medium'>{t('menu.catering.leadTime')}:</span>{' '}
                      {pkg.leadTimeDays} {t('menu.catering.days')}
                    </p>
                    {pkg.notes && (
                      <p className='text-xs text-deep/60 italic'>{pkg.notes}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CateringSection
