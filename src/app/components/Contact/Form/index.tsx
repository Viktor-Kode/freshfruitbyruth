'use client'
import { useState, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { useI18n } from '@/i18n/client'

type ContactFormData = {
  fullname: string
  email: string
  phnumber?: string
  Message: string
}

const defaultValues: ContactFormData = {
  fullname: '',
  email: '',
  phnumber: '',
  Message: '',
}

const ContactForm = () => {
  const { t, locale } = useI18n()

  // Memoize schema creation to avoid recreating on every render
  const contactSchema = useMemo(() => z.object({
    fullname: z
      .string()
      .min(2, t('contact.validation.fullNameMin'))
      .max(60, t('contact.validation.fullNameMax')),
    email: z.string().email(t('contact.validation.emailInvalid')),
    phnumber: z
      .string()
      .optional()
      .refine(
        (val) => !val || val.length === 0 || (val.length >= 7 && val.length <= 20 && /^[\d()+\-\s]+$/.test(val)),
        { message: t('contact.validation.phoneInvalid') }
      ),
    Message: z
      .string()
      .min(5, t('contact.validation.messageMin'))
      .max(500, t('contact.validation.messageMax')),
  }), [t, locale]) // Recreate only when locale changes

  const [showThanks, setShowThanks] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues,
    mode: 'onBlur',
  })

  const fieldClass =
    'w-full text-base px-5 rounded-2xl py-3 border border-primary/60 bg-white shadow-[0_18px_35px_-20px_rgba(224,193,118,0.35)] transition-colors duration-300 focus:border-primary focus:ring-2 focus:ring-primary/25 focus:outline-none'

  const onSubmit = async (data: ContactFormData) => {
    try {
      console.warn(
        'Contact form submission not yet configured. Replace with API integration.',
      )
      // Simulate async workflow for UX parity with future API integration
      await new Promise((resolve) => setTimeout(resolve, 400))
      toast.success(t('contact.messages.success'))
      setShowThanks(true)
      setTimeout(() => {
        setShowThanks(false)
      }, 5000)
      reset(defaultValues)
    } catch (error) {
      console.error('Contact form submission failed:', error)
      toast.error(t('contact.messages.error'))
    }
  }
  return (
    <section id='contact' className='scroll-mt-20 relative'>
      <div className='container relative'>
        <p className='text-deep text-lg font-bold mb-3 tracking-widest uppercase text-center'>
          {t('contact.title')}
        </p>
        <h2 className='mb-9 font-bold tracking-tight text-center'>
          {t('contact.heading')}
        </h2>
        <div className='relative border border-primary/60 bg-primary px-6 py-6 rounded-3xl shadow-[8px_8px_16px_rgba(47,42,31,0.15),-8px_-8px_16px_rgba(255,255,255,0.1)]'>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-wrap w-full m-auto justify-between'
            noValidate>
            <div className='sm:flex gap-6 w-full'>
              <div className='mx-0 my-2.5 flex-1'>
                <label htmlFor='fname' className='pb-3 inline-block text-base'>
                  {t('contact.form.fullName')}
                </label>
                <input
                  id='fname'
                  type='text'
                  {...register('fullname')}
                  placeholder={t('contact.form.placeholders.fullName')}
                  className={fieldClass}
                />
                {errors.fullname && (
                  <p className='mt-2 text-sm text-red-600'>
                    {errors.fullname.message}
                  </p>
                )}
              </div>
              <div className='mx-0 my-2.5 flex-1'>
                <label htmlFor='email' className='pb-3 inline-block text-base'>
                  {t('contact.form.email')}
                </label>
                <input
                  id='email'
                  type='email'
                  {...register('email')}
                  placeholder={t('contact.form.placeholders.email')}
                  className={fieldClass}
                />
                {errors.email && (
                  <p className='mt-2 text-sm text-red-600'>
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className='mx-0 my-2.5 flex-1'>
                <label
                  htmlFor='Phnumber'
                  className='pb-3 inline-block text-base'>
                  {t('contact.form.phone')}
                </label>
                <input
                  id='Phnumber'
                  type='tel'
                  inputMode='tel'
                  placeholder={t('contact.form.placeholders.phone')}
                  {...register('phnumber')}
                  className={fieldClass}
                />
                {errors.phnumber && (
                  <p className='mt-2 text-sm text-red-600'>
                    {errors.phnumber.message}
                  </p>
                )}
              </div>
            </div>
            <div className='w-full mx-0 my-2.5 flex-1'>
              <label htmlFor='message' className='text-base inline-block'>
                {t('contact.form.message')}
              </label>
              <textarea
                id='message'
                rows={4}
                {...register('Message')}
                className={`${fieldClass} mt-2 min-h-[140px] resize-vertical`}
                placeholder={t('contact.form.placeholders.message')}></textarea>
              {errors.Message && (
                <p className='mt-2 text-sm text-red-600'>
                  {errors.Message.message}
                </p>
              )}
            </div>
            <div className='mx-0 my-2.5 w-full'>
              <button
                type='submit'
                disabled={isSubmitting}
                className={`border leading-none px-6 text-lg font-medium py-4 rounded-full 
                    ${
                      isSubmitting
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-primary border-primary text-white hover:bg-transparent hover:text-primary cursor-pointer'
                    }`}>
                {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
              </button>
            </div>
          </form>
          {showThanks && (
            <div
              className='text-white bg-primary rounded-full px-4 text-lg mb-4.5 mt-3 absolute flex items-center gap-2'
              role='status'
              aria-live='polite'>
              {t('contact.messages.thanks')}
              <div className='w-3 h-3 rounded-full animate-spin border-2 border-solid border-white border-t-transparent'></div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ContactForm
