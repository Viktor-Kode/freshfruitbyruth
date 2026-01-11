'use client'

import { DietaryTag, DietaryLegend } from '@/components/dietary'
import { VendorMetadataData } from '@/data/siteContent'
import { useI18n } from '@/i18n/client'

interface MenuFooterProps {
  dietaryTags: DietaryTag[]
}

const MenuFooter = ({ dietaryTags }: MenuFooterProps) => {
  const { t } = useI18n()

  return (
    <section className='scroll-mt-20 py-16 md:py-20'>
      <div className='container'>
          <div className='bg-primary border border-primary/60 rounded-3xl p-8 shadow-[8px_8px_16px_rgba(47,42,31,0.15),-8px_-8px_16px_rgba(255,255,255,0.1)]'>
          <div className='text-center space-y-4'>
            <h3 className='text-xl font-semibold text-deep'>
              {t('menu.footer.orderingInfo')}
            </h3>
            {VendorMetadataData.orderingInfo && (
              <p className='text-deep/80 text-sm leading-6 max-w-2xl mx-auto'>
                {VendorMetadataData.orderingInfo}
              </p>
            )}
            {VendorMetadataData.contactInfo && (
              <div className='flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-deep/70'>
                {VendorMetadataData.contactInfo.phone && (
                  <a
                    href={`tel:${VendorMetadataData.contactInfo.phone}`}
                    className='hover:text-primary transition'>
                    {VendorMetadataData.contactInfo.phone}
                  </a>
                )}
                {VendorMetadataData.contactInfo.email && (
                  <a
                    href={`mailto:${VendorMetadataData.contactInfo.email}`}
                    className='hover:text-primary transition'>
                    {VendorMetadataData.contactInfo.email}
                  </a>
                )}
                {VendorMetadataData.contactInfo.website && (
                  <a
                    href={`https://${VendorMetadataData.contactInfo.website}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='hover:text-primary transition'>
                    {VendorMetadataData.contactInfo.website}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MenuFooter
