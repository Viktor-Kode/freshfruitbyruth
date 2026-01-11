import React from 'react'
import Hero from '@/app/components/Home/Hero'
import Cook from '@/app/components/Home/Cook'
import MenuContainer from '@/app/components/Home/Menu/MenuContainer'
import ScrollableGallery from '@/app/components/Home/Gallery/ScrollableGallery'
import { Metadata } from 'next'
import ContactForm from './components/Contact/Form'
export const metadata: Metadata = {
  title: 'Fresh Fruit By Ruth',
}

export default function Home() {
  return (
    <main>
      <Hero />
      <Cook />
      <MenuContainer />
      <ScrollableGallery />
      <ContactForm />
    </main>
  )
}
