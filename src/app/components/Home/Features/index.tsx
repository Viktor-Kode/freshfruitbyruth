'use client'
import Image from 'next/image'
import { FeaturesData } from '@/data/siteContent'
import { useI18n } from '@/i18n/client'

const Features = () => {
  const { t } = useI18n()
  const features = FeaturesData

  return (
    <section id='features'>
      <div className='container'>
        <div className='text-center mb-14'>
          <p className='text-deep text-lg font-bold tracking-widest uppercase'>
            {t('features.title')}
          </p>
          <h2 className='font-semibold lg:max-w-60% mx-auto mt-3'>
            {t('features.subtitle')}
          </h2>
        </div>
        <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-y-28 gap-x-6 mt-24'>
          {features.map((items, i) => (
            <div
              key={i}
              className='p-8 relative rounded-3xl bg-secondary shadow-lg border border-primary/40 hover:-translate-y-2 transition duration-300 ease-in-out hover:cursor-pointer'>
              <div className='rounded-full flex justify-center absolute -top-[50%] sm:top-[-40%] md:top-[-55%] lg:top-[-35%] left-[0%]'>
                <Image
                  src={items.imgSrc}
                  alt={items.imgSrc}
                  width={510}
                  height={10}
                />
              </div>
              <p className='text-2xl text-black font-semibold text-center mt-16'>
                {t(items.heading)}
              </p>
              <p className='text-base font-normal text-black/50 text-center mt-2 leading-6'>
                {t(items.subheading)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
