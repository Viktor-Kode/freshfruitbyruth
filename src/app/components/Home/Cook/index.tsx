'use client'

import Image from 'next/image'
import { useI18n } from '@/i18n/client'

const Cook = () => {
  const { t } = useI18n()

  return (
    <section className='relative bg-secondary' id='aboutus'>
      <div className='container px-4 relative'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center my-16'>
          <div className='order-2 lg:order-1'>
            <p className='text-deep text-lg font-bold tracking-widest uppercase text-center lg:text-start mb-3'>
              {t('about.title')}
            </p>
            <h2 className='text-center lg:text-start mb-6'>
              {t('about.heading')}
            </h2>
            <p className='text-deep/70 text-lg font-normal mb-5 text-center lg:text-start'>
              {t('about.paragraph1')}
            </p>
            <p className='text-deep/70 text-lg font-normal text-center lg:text-start'>
              {t('about.paragraph2')}
            </p>
          </div>
          <div className='order-1 lg:order-2 flex justify-center lg:justify-end'>
            <div className='relative overflow-hidden rounded-3xl shadow-[8px_8px_16px_rgba(47,42,31,0.15),-8px_-8px_16px_rgba(255,255,255,0.1)]'>
              <Image
                src='/images/Cook/kitchen-primary.jpeg'
                alt='Chef preparing a dish in the kitchen'
                width={636}
                height={808}
                className='object-cover'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cook
