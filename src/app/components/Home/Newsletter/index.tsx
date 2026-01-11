'use client'
import Image from 'next/image'
import { Icon } from '@iconify/react'

const Newsletter = () => {
  return (
    <section className='relative overflow-hidden md:py-20'>
      <div className='container'>
        <div className='bg-primary rounded-Newsletter grid grid-cols-1 gap-y-10 gap-x-6 md:grid-cols-12 xl:gap-x-8'>
          <div className='md:col-span-7'>
            <div className='m-5 sm:m-10 lg:ml-32 lg:mt-20 lg:mb-20'>
              <p className='text-lg font-normal text-white mb-3 tracking-widest'>
                NEWSLETTER{' '}
              </p>
              <h2 className='text-white mb-8'>
                Subscribe our <br /> newsletter.
              </h2>

              <div>
                <div className='relative text-white focus-within:text-white flex flex-row-reverse shadow-fi rounded-full'>
                  <input
                    type='Email address'
                    name='q'
                    className='pl-4 pr-16 py-4 text-sm w-full bg-white text-black rounded-full focus:outline-hidden focus:text-black'
                    placeholder='john.doe@gmail.com'
                    autoComplete='off'
                  />
                  <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
                    <button
                      type='submit'
                      className='p-1 bg-gray-900 hover:scale-110 duration-300 rounded-full hover:cursor-pointer'>
                      <Icon
                        icon='tabler:arrow-narrow-right'
                        width='28'
                        height='28'
                        className='text-white '
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='md:col-span-5 relative hidden md:block'>
            <div>
              <Image
                src={'/images/Newsletter/lifestyle-1.jpeg'}
                alt='guests enjoying signature dishes'
                width={626}
                height={602}
                className='-mt-24 rounded-[32px]'
              />
            </div>
            <div className='absolute top-[75%] right-[5%]'>
              <Image
                src={'/images/Newsletter/lifestyle-2.jpeg'}
                alt='chef plating dessert'
                width={220}
                height={160}
                className='rounded-2xl shadow-lg'
              />
            </div>
            <div className='absolute top-[25%] right-[-18%]'>
              <Image
                src={'/images/Newsletter/special.png'}
                alt='seasonal special badge'
                width={280}
                height={200}
              />
            </div>
            <div className='absolute bottom-[12%] left-[0%]'>
              <Image
                src={'/images/Newsletter/combo.png'}
                alt='signature tasting menu'
                width={220}
                height={160}
                className='rounded-2xl shadow-md'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
