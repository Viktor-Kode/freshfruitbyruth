# Menu Site Template - Implementation Report

## Overview
This document contains all changes made to transform a basic menu landing page into a comprehensive, multi-section menu system with enhanced features, performance optimizations, and improved UX.

---

## Table of Contents
1. [Type Definitions](#1-type-definitions)
2. [Menu Components](#2-menu-components)
3. [Gallery Component](#3-gallery-component)
4. [PDF Export Enhancement](#4-pdf-export-enhancement)
5. [Internationalization (i18n) Optimization](#5-internationalization-i18n-optimization)
6. [Visual Enhancements](#6-visual-enhancements)
7. [Dependencies Update](#7-dependencies-update)
8. [Translation Keys](#8-translation-keys)
9. [Navigation & UI Improvements](#9-navigation--ui-improvements)

---

## 1. Type Definitions

### 1.1 Extended FullMenuType

**File:** `src/app/types/fullmenu.ts`

**Code:**
```typescript
import { DietaryType } from '@/app/components/Common/DietaryIcons'

export type FullMenuType = {
  name: string
  style: string
  price: string
  description: string
  dietary?: DietaryType[]
  availability?: 'standard' | 'seasonal' | 'limited'
  availableUntil?: string
  badge?: string
}
```

**Cursor Prompt:**
```
Extend the FullMenuType to support seasonal and limited items. Add optional fields: availability ('standard' | 'seasonal' | 'limited'), availableUntil (string date), and badge (string for special badges like "New" or "Popular").
```

---

### 1.2 CateringPackageType

**File:** `src/app/types/catering.ts`

**Code:**
```typescript
import { DietaryType } from '@/app/components/Common/DietaryIcons'

export type CateringPackageType = {
  name: string
  description: string
  servesCount: number
  price: string | number
  leadTimeDays: number
  notes?: string
  dietary?: DietaryType[]
}
```

**Cursor Prompt:**
```
Create a new type file for catering packages. Include fields for name, description, servesCount (number), price (string or number), leadTimeDays (number), optional notes, and optional dietary array.
```

---

### 1.3 SpecialOrderType

**File:** `src/app/types/specialOrders.ts`

**Code:**
```typescript
import { DietaryType } from '@/app/components/Common/DietaryIcons'

export type SpecialOrderType = {
  name: string
  description: string
  price: string | number
  cutoffDate: string
  customizationNotes?: string
  dietary?: DietaryType[]
}
```

**Cursor Prompt:**
```
Create a type for special orders/preorders. Include name, description, price (string or number), cutoffDate (ISO date string), optional customizationNotes, and optional dietary array.
```

---

### 1.4 EventType

**File:** `src/app/types/events.ts`

**Code:**
```typescript
export type EventType = {
  name: string
  date: string
  location: string
  description?: string
  menuItems?: string[]
}
```

**Cursor Prompt:**
```
Create a type for events and popups. Include name, date (ISO string), location, optional description, and optional menuItems array.
```

---

### 1.5 VendorMetadata

**File:** `src/app/types/vendor.ts`

**Code:**
```typescript
export type VendorMetadata = {
  vendorName: string
  contactInfo?: {
    phone?: string
    email?: string
    website?: string
  }
  orderingInfo?: string
}
```

**Cursor Prompt:**
```
Create a vendor metadata type with vendorName (required), optional contactInfo object (phone, email, website), and optional orderingInfo string.
```

---

## 2. Menu Components

### 2.1 Main Menu (Refactored to Card Layout)

**File:** `src/app/components/Home/Menu/index.tsx`

**Code:**
```typescript
'use client'

import { useMemo, useState } from 'react'
import { FullMenuData } from '@/data/siteContent'
import { DietaryIcon, DietaryTag } from '@/components/dietary'
import { DietaryType } from '@/app/components/Common/DietaryIcons'
import { useI18n } from '@/i18n/client'
import { CubeIcon, StarIcon } from '@heroicons/react/24/outline'

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
      {/* Decorative icons */}
      <CubeIcon className='absolute top-8 left-4 md:left-8 w-12 h-12 text-primary/20' />
      <StarIcon className='absolute top-8 right-4 md:right-8 w-12 h-12 text-primary/20' />
      
      <div className='container relative'>
        <div className='text-center mb-12'>
          <p className='text-primary text-lg font-normal tracking-widest uppercase'>
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
```

**Cursor Prompt:**
```
Refactor the main menu component to use a card-based layout instead of a table. Filter out seasonal/limited items (only show items with availability 'standard' or no availability field). Display descriptions inline (always visible). Add Heroicons decorative elements (CubeIcon and StarIcon) positioned absolutely in corners. Use neumorphic shadow styling: shadow-[8px_8px_16px_rgba(47,42,31,0.15),-8px_-8px_16px_rgba(255,255,255,0.1)] for cards.
```

---

### 2.2 SeasonalSection Component

**File:** `src/app/components/Home/Menu/SeasonalSection.tsx`

**Code:**
```typescript
'use client'

import { useMemo } from 'react'
import { FullMenuType } from '@/app/types/fullmenu'
import { DietaryIcon, DietaryTag } from '@/components/dietary'
import { DietaryType } from '@/app/components/Common/DietaryIcons'
import { useI18n } from '@/i18n/client'
import { BoltIcon, StarIcon } from '@heroicons/react/24/outline'

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
    <section className='scroll-mt-20 py-16 md:py-20 relative'>
      {/* Decorative icons */}
      <BoltIcon className='absolute top-8 left-4 md:left-8 w-12 h-12 text-primary/20' />
      <StarIcon className='absolute top-8 right-4 md:right-8 w-12 h-12 text-primary/20' />
      
      <div className='container relative'>
        <div className='text-center mb-12'>
          <p className='text-primary text-lg font-normal tracking-widest uppercase'>
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
```

**Cursor Prompt:**
```
Create a SeasonalSection component that displays items with availability 'seasonal' or 'limited'. Use card-based layout matching the main menu style. Show badges, availableUntil dates formatted nicely, and dietary icons. Add BoltIcon and StarIcon as decorative elements. Return null if no seasonal items exist.
```

---

### 2.3 CateringSection Component

**File:** `src/app/components/Home/Menu/CateringSection.tsx`

**Code:**
```typescript
'use client'

import { CateringPackageType } from '@/app/types/catering'
import { DietaryIcon, DietaryTag } from '@/components/dietary'
import { DietaryType } from '@/app/components/Common/DietaryIcons'
import { useI18n } from '@/i18n/client'
import { GiftIcon, FireIcon } from '@heroicons/react/24/outline'

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
      {/* Decorative icons */}
      <FireIcon className='absolute top-8 left-4 md:left-8 w-12 h-12 text-primary/20' />
      <GiftIcon className='absolute top-8 right-4 md:right-8 w-12 h-12 text-primary/20' />
      
      <div className='container relative'>
        <div className='text-center mb-12'>
          <p className='text-primary text-lg font-normal tracking-widest uppercase'>
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
```

**Cursor Prompt:**
```
Create a CateringSection component displaying catering packages in a grid (1 column mobile, 2 tablet, 3 desktop). Each card shows name, serves count badge, dietary icons, description, price (formatted), lead time, and optional notes. Use FireIcon and GiftIcon as decorative elements. Return null if no packages exist.
```

---

### 2.4 SpecialOrdersSection Component

**File:** `src/app/components/Home/Menu/SpecialOrdersSection.tsx`

**Code:**
```typescript
'use client'

import { SpecialOrderType } from '@/app/types/specialOrders'
import { DietaryIcon, DietaryTag } from '@/components/dietary'
import { DietaryType } from '@/app/components/Common/DietaryIcons'
import { useI18n } from '@/i18n/client'
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline'

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

interface SpecialOrdersSectionProps {
  orders: SpecialOrderType[]
}

const SpecialOrdersSection = ({ orders }: SpecialOrdersSectionProps) => {
  const { t } = useI18n()

  if (orders.length === 0) return null

  const formatPrice = (price: string | number): string => {
    if (typeof price === 'string') return price
    return `$${price.toLocaleString()}`
  }

  const formatDate = (dateString: string) => {
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
    <section className='scroll-mt-20 py-16 md:py-20 relative'>
      {/* Decorative icons */}
      <CalendarIcon className='absolute top-8 left-4 md:left-8 w-12 h-12 text-primary/20' />
      <ClockIcon className='absolute top-8 right-4 md:right-8 w-12 h-12 text-primary/20' />
      
      <div className='container relative'>
        <div className='text-center mb-12'>
          <p className='text-primary text-lg font-normal tracking-widest uppercase'>
            {t('menu.specialOrders.title')}
          </p>
          <h2 className='mt-3'>{t('menu.specialOrders.subtitle')}</h2>
          <p className='text-deep/70 max-w-2xl mx-auto mt-4'>
            {t('menu.specialOrders.description')}
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {orders.map((order) => (
            <div
              key={order.name}
              className='bg-primary border border-primary/60 rounded-3xl p-6 shadow-[8px_8px_16px_rgba(47,42,31,0.15),-8px_-8px_16px_rgba(255,255,255,0.1)] hover:shadow-[12px_12px_24px_rgba(47,42,31,0.2),-12px_-12px_24px_rgba(255,255,255,0.15)] transition-all duration-300 hover:bg-primary/90 hover:border-primary'>
              <div className='flex flex-col h-full'>
                <div className='mb-4'>
                  <h3 className='text-xl font-semibold text-deep mb-2'>{order.name}</h3>
                  <div className='flex items-center gap-2 flex-wrap'>
                    <span className='px-3 py-1.5 rounded-full text-sm font-semibold bg-secondary text-deep'>
                      {t('menu.specialOrders.orderBy')} {formatDate(order.cutoffDate)}
                    </span>
                    {order.dietary && order.dietary.length > 0 && (
                      <div className='flex items-center gap-1'>
                        {order.dietary
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
                  <p className='text-deep/80 text-sm leading-6 mb-3'>{order.description}</p>
                  {order.customizationNotes && (
                    <p className='text-xs text-deep/60 italic'>{order.customizationNotes}</p>
                  )}
                </div>

                <div className='mt-auto'>
                  <div className='flex items-baseline justify-between'>
                    <span className='text-2xl font-bold text-deep'>
                      {formatPrice(order.price)}
                    </span>
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

export default SpecialOrdersSection
```

**Cursor Prompt:**
```
Create a SpecialOrdersSection component displaying special orders in a 2-column grid (1 column mobile). Show cutoff date badge, dietary icons, description, optional customization notes, and price. Use CalendarIcon and ClockIcon as decorative elements. Return null if no orders exist.
```

---

### 2.5 EventsSection Component (Updated with Map Cards)

**File:** `src/app/components/Home/Menu/EventsSection.tsx`

**Key Features:**
- Card-based grid layout (1 column mobile, 2 columns desktop)
- Each card includes an embedded Google Maps iframe
- Map section at top, content section below
- Maps are easily changeable via `mapEmbedUrl` or `coordinates` fields
- Responsive design with proper spacing

**Code:**
```typescript
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
```

**Updated EventType:**
```typescript
export type EventType = {
  name: string
  date: string
  location: string
  mapEmbedUrl?: string // Google Maps embed URL - easily changeable
  coordinates?: {
    lat: number
    lng: number
  }
  description?: string
  menuItems?: string[]
}
```

**How to Change Map Locations:**
1. **Using Google Maps Embed URL (Recommended):**
   - Go to Google Maps and search for the location
   - Click "Share" button
   - Select "Embed a map"
   - Copy the iframe `src` URL
   - Paste it into the `mapEmbedUrl` field in `EventsData`

2. **Using Coordinates:**
   - Get latitude and longitude from Google Maps (right-click location > coordinates)
   - Add `coordinates: { lat: X, lng: Y }` to the event object
   - The component will automatically generate the embed URL

**Cursor Prompt:**
```
Update EventsSection to display events in a card-based grid layout (1 column mobile, 2 columns desktop) with embedded Google Maps. Each card should have a map section at the top and content section below. Maps should be easily changeable via mapEmbedUrl or coordinates fields. Remove decorative heroicons. Use neumorphic shadow styling matching other sections.
```

**Data Structure Update:**

**File:** `src/data/siteContent.ts`

**Updated EventsData:**
```typescript
export const EventsData: EventType[] = [
  {
    name: 'Downtown Farmers Market',
    date: '2024-12-07',
    location: 'Main Street Plaza, Downtown',
    // Google Maps embed URL - easily changeable
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=...',
    description: '...',
    menuItems: [...],
  },
  {
    name: 'Holiday Popup at The Brewery',
    date: '2024-12-14',
    location: 'Local Craft Brewery, 123 Beer St',
    // Alternative: Use coordinates
    coordinates: {
      lat: 40.7128,
      lng: -74.0060,
    },
    description: '...',
    menuItems: [...],
  },
  // ... more events
]
```

**Note:** All events now include either `mapEmbedUrl` (recommended) or `coordinates` for map display. The component automatically handles both formats.

---

### 2.6 MenuContainer Component

**File:** `src/app/components/Home/Menu/MenuContainer.tsx`

**Code:**
```typescript
'use client'

import { useMemo } from 'react'
import {
  FullMenuData,
  CateringPackagesData,
  SpecialOrdersData,
  EventsData,
} from '@/data/siteContent'
import { DietaryTag } from '@/components/dietary'
import { DietaryType } from '@/app/components/Common/DietaryIcons'
import InteractiveMenu from './index'
import SeasonalSection from './SeasonalSection'
import CateringSection from './CateringSection'
import SpecialOrdersSection from './SpecialOrdersSection'
import EventsSection from './EventsSection'
import MenuFooter from './MenuFooter'
import { DietaryLegend } from '@/components/dietary'

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

const MenuContainer = () => {
  // Collect all dietary tags from all sections for the legend
  const allDietaryTags = useMemo(() => {
    const allTags = new Set<DietaryTag>()

    // From main menu
    FullMenuData.forEach((item) => {
      if (item.dietary) {
        item.dietary.forEach((oldType) => {
          const tag = mapDietaryTypeToTag(oldType)
          if (tag) allTags.add(tag)
        })
      }
    })

    // From catering packages
    CateringPackagesData.forEach((pkg) => {
      if (pkg.dietary) {
        pkg.dietary.forEach((oldType) => {
          const tag = mapDietaryTypeToTag(oldType)
          if (tag) allTags.add(tag)
        })
      }
    })

    // From special orders
    SpecialOrdersData.forEach((order) => {
      if (order.dietary) {
        order.dietary.forEach((oldType) => {
          const tag = mapDietaryTypeToTag(oldType)
          if (tag) allTags.add(tag)
        })
      }
    })

    return Array.from(allTags)
  }, [])

  return (
    <>
      <InteractiveMenu />
      {/* Dietary Legend - Right after menu sections */}
      {allDietaryTags.length > 0 && (
        <div className='container py-8'>
          <div className='flex justify-center'>
            <DietaryLegend iconSize={16} tags={allDietaryTags} />
          </div>
        </div>
      )}
      <SeasonalSection items={FullMenuData} />
      <CateringSection packages={CateringPackagesData} />
      <SpecialOrdersSection orders={SpecialOrdersData} />
      <EventsSection events={EventsData} />
      <MenuFooter dietaryTags={allDietaryTags} />
    </>
  )
}

export default MenuContainer
```

**Cursor Prompt:**
```
Create a MenuContainer component that orchestrates all menu sections. Collect all dietary tags from all menu sections (main menu, seasonal, catering, special orders) and display the DietaryLegend right after the main menu. Render sections in order: InteractiveMenu, DietaryLegend, SeasonalSection, CateringSection, SpecialOrdersSection, EventsSection, MenuFooter. Use space-y-16 md:space-y-20 for consistent vertical spacing.
```

---

### 2.7 MenuFooter Component

**File:** `src/app/components/Home/Menu/MenuFooter.tsx`

**Code:**
```typescript
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
```

**Cursor Prompt:**
```
Create a MenuFooter component displaying vendor ordering information and contact details. Show orderingInfo text, and contact links (phone, email, website) with hover effects. Use bg-primary with neumorphic shadow styling matching other sections.
```

---

## 3. Gallery Component

### 3.1 ScrollableGallery Component

**File:** `src/app/components/Home/Gallery/ScrollableGallery.tsx`

**Code:**
```typescript
'use client'

import Image from 'next/image'
import { GalleryImagesData } from '@/data/siteContent'
import { useI18n } from '@/i18n/client'
import { useRef, useState, useEffect } from 'react'
import { PhotoIcon, StarIcon } from '@heroicons/react/24/outline'

const ScrollableGallery = () => {
  const { t } = useI18n()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScrollability()
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', checkScrollability)
      return () => container.removeEventListener('scroll', checkScrollability)
    }
  }, [])

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = window.innerWidth < 768 ? 280 : 400
      scrollContainerRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = window.innerWidth < 768 ? 280 : 400
      scrollContainerRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' })
    }
  }

  return (
    <section className='scroll-mt-20 py-16 md:py-20 relative'>
      {/* Decorative icons */}
      <PhotoIcon className='absolute top-8 left-4 md:left-8 w-12 h-12 text-primary/20' />
      <StarIcon className='absolute top-8 right-4 md:right-8 w-12 h-12 text-primary/20' />
      
      <div className='container relative'>
        <div className='text-center mb-12'>
          <p className='text-primary text-lg font-normal tracking-widest uppercase'>
            {t('gallery.title')}
          </p>
          <h2 className='mt-3'>{t('gallery.subtitle')}</h2>
          <p className='text-deep/70 max-w-2xl mx-auto mt-4'>
            {t('gallery.description')}
          </p>
        </div>

        <div className='relative'>
          {/* Scroll buttons - hidden on mobile */}
          <button
            onClick={scrollLeft}
            className={`hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-primary/90 hover:bg-primary text-deep rounded-full p-3 shadow-[8px_8px_16px_rgba(47,42,31,0.15),-8px_-8px_16px_rgba(255,255,255,0.1)] transition-all duration-300 hover:scale-110 ${
              !canScrollLeft ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            aria-label='Scroll left'
            disabled={!canScrollLeft}>
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'>
              <path d='M15 18l-6-6 6-6' />
            </svg>
          </button>
          <button
            onClick={scrollRight}
            className={`hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-primary/90 hover:bg-primary text-deep rounded-full p-3 shadow-[8px_8px_16px_rgba(47,42,31,0.15),-8px_-8px_16px_rgba(255,255,255,0.1)] transition-all duration-300 hover:scale-110 ${
              !canScrollRight ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            aria-label='Scroll right'
            disabled={!canScrollRight}>
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'>
              <path d='M9 18l6-6-6-6' />
            </svg>
          </button>

          {/* Scrollable container */}
          <div
            ref={scrollContainerRef}
            className='flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-4 md:pb-4 px-4 md:px-2 snap-x snap-mandatory'
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}>
            {GalleryImagesData.map((item, index) => (
              <div
                key={index}
                className='flex-shrink-0 w-[calc(100vw-3rem)] md:w-[400px] snap-start bg-primary border border-primary/60 rounded-3xl overflow-hidden shadow-[8px_8px_16px_rgba(47,42,31,0.15),-8px_-8px_16px_rgba(255,255,255,0.1)] hover:shadow-[12px_12px_24px_rgba(47,42,31,0.2),-12px_-12px_24px_rgba(255,255,255,0.15)] transition-shadow duration-300 group'>
                <div className='relative h-[250px] md:h-[300px] overflow-hidden'>
                  <Image
                    src={item.src}
                    alt={item.name}
                    fill
                    className='object-cover group-hover:scale-105 transition-transform duration-300'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-deep/80 via-deep/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                </div>
                <div className='p-6'>
                  <h3 className='text-xl font-semibold text-deep mb-2'>{item.name}</h3>
                  <p className='text-2xl font-bold text-primary'>{item.price}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll gesture indicator - mobile only */}
          <div className='md:hidden flex justify-center items-center gap-2 mt-4'>
            <div className='flex gap-1.5'>
              <div className='w-1.5 h-1.5 rounded-full bg-primary/40'></div>
              <div className='w-1.5 h-1.5 rounded-full bg-primary/40'></div>
              <div className='w-1.5 h-1.5 rounded-full bg-primary/40'></div>
            </div>
            <svg
              className='w-5 h-5 text-primary/60 animate-pulse'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M7 16l-4-4m0 0l4-4m-4 4h18'
              />
            </svg>
            <span className='text-xs text-primary/60 font-medium'>Swipe to explore</span>
            <svg
              className='w-5 h-5 text-primary/60 animate-pulse'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M17 8l4 4m0 0l-4 4m4-4H3'
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ScrollableGallery
```

**Cursor Prompt:**
```
Create a ScrollableGallery component with horizontal scrolling. On mobile: full-width cards (w-[calc(100vw-3rem)]), snap scrolling, no arrows, swipe gesture indicator. On desktop: fixed-width cards (400px), navigation arrows, disabled states when can't scroll. Use PhotoIcon and StarIcon as decorative elements. Cards should have hover effects and neumorphic shadows.
```

---

## 4. PDF Export Enhancement

### 4.1 Enhanced PDF Export Function

**File:** `src/app/utils/exportMenuPdf.ts`

**Full Code:** (See file content above - 372 lines)

**Key Features:**
- Handles all menu sections (main, seasonal, catering, special orders, events)
- Sanitizes text for PDF compatibility
- Formats dietary icons as text labels
- Handles page breaks
- Creates dietary legend

**Cursor Prompt:**
```
Enhance the PDF export function to handle all menu sections: main menu, seasonal items, catering packages, special orders, and events. Accept a MenuPdfData object with all sections and vendorName. Render each section conditionally if data exists. Format dietary icons as text labels like [Veg], [Vgn], [GF]. Handle page breaks when content exceeds page height. Create a dietary legend at the end showing all used dietary types.
```

---

## 5. Internationalization (i18n) Optimization

### 5.1 Optimized I18n Client

**File:** `src/i18n/client.tsx`

**Key Changes:**
- Added `isLoading` to context
- Parallel language preloading on mount
- Smart caching for instant language switching
- Loading state management

**Cursor Prompt:**
```
Optimize the i18n client to preload both languages in parallel on mount using Promise.all. Add isLoading state to the context. When switching languages, if messages are cached, use them immediately without showing loader. Only show loader if messages need to be loaded. Expose isLoading in the context for components to use.
```

---

### 5.2 I18nWrapper with Loader

**File:** `src/app/components/I18nWrapper.tsx`

**Code:**
```typescript
'use client'

import { useEffect, useState } from 'react'
import { I18nProvider, useI18n } from '@/i18n/client'
import { Locale, defaultLocale } from '@/i18n/config'
import PreLoader from '@/app/components/Common/PreLoader'

function LocaleUpdater() {
  const { locale } = useI18n()

  useEffect(() => {
    // Update HTML lang attribute when locale changes
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale
    }
  }, [locale])

  return null
}

function LanguageLoader() {
  const { isLoading } = useI18n()
  
  if (!isLoading) return null
  
  return <PreLoader />
}

export default function I18nWrapper({ children }: { children: React.ReactNode }) {
  const [initialLocale, setInitialLocale] = useState<Locale>(defaultLocale)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLocale = localStorage.getItem('locale') as Locale
      if (savedLocale && (savedLocale === 'en' || savedLocale === 'es')) {
        setInitialLocale(savedLocale)
      }
      setMounted(true)
    } else {
      setMounted(true)
    }
  }, [])

  // Always render the provider with initial locale
  // The provider will handle all locale updates internally
  return (
    <I18nProvider initialLocale={initialLocale}>
      <LocaleUpdater />
      <LanguageLoader />
      {children}
    </I18nProvider>
  )
}
```

**Cursor Prompt:**
```
Add a LanguageLoader component to I18nWrapper that shows PreLoader when isLoading is true. This will display a loader while languages are loading initially or when switching if not cached.
```

---

### 5.3 Enhanced PreLoader

**File:** `src/app/components/Common/PreLoader.tsx`

**Code:**
```typescript
import React from "react";

const PreLoader = () => {
  return (
    <div className="fixed left-0 top-0 z-[9999] flex h-screen w-screen items-center justify-center bg-secondary/95 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary/30 border-t-transparent"></div>
          <div className="absolute inset-0 h-16 w-16 animate-spin rounded-full border-4 border-solid border-transparent border-t-primary" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
        </div>
        <p className="text-sm font-medium text-deep/70">Loading...</p>
      </div>
    </div>
  );
};

export default PreLoader;
```

**Cursor Prompt:**
```
Update PreLoader to use theme colors (bg-secondary/95, border-primary). Add dual spinning rings (one reverse) for visual appeal. Include backdrop-blur-sm for modern glass effect. Use z-[9999] to ensure it's above all content.
```

---

### 5.4 Language Switcher Enhancement

**File:** `src/app/components/Layout/Header/LanguageSwitcher.tsx`

**Key Change:**
- Disable button during loading

**Cursor Prompt:**
```
Update LanguageSwitcher to disable the button when isLoading is true. This prevents clicks during language loading.
```

---

## 6. Visual Enhancements

### 6.1 Neumorphic Shadows

**File:** `src/app/globals.css`

**Add to utilities:**
```css
.shadow-neumorphic {
  box-shadow: 8px 8px 16px rgba(47, 42, 31, 0.15),
    -8px -8px 16px rgba(255, 255, 255, 0.1);
}

.shadow-neumorphic-hover {
  box-shadow: 12px 12px 24px rgba(47, 42, 31, 0.2),
    -12px -12px 24px rgba(255, 255, 255, 0.15);
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
```

**Cursor Prompt:**
```
Add neumorphic shadow utilities and scrollbar-hide utility to globals.css. Use theme colors (rgba values based on --color-deep and white) for shadows.
```

---

### 6.2 Consistent Theme Colors

All sections use:
- `bg-primary` for card backgrounds
- `border-primary/60` for borders
- Neumorphic shadows
- Heroicons decorative elements with `text-primary/20`

**Cursor Prompt:**
```
Ensure all menu sections (main menu, seasonal, catering, special orders, events, footer) use bg-primary, border-primary/60, and consistent neumorphic shadow styling. Add Heroicons decorative elements positioned absolutely in corners with text-primary/20 opacity.
```

---

## 7. Dependencies Update

### 7.1 Updated package.json

**Key Updates:**
- Next.js: `^15.2.4` → `^16.1.1`
- React: `^19.1.0` (latest)
- jspdf: `^3.0.3` → `^4.0.0` (security fix)
- Various minor updates

**Cursor Prompt:**
```
Update dependencies to latest compatible versions. Update Next.js to latest 16.x, ensure React 19 compatibility, update jspdf to v4 for security, and update other packages to latest minor/patch versions. Run npm install and verify build works.
```

---

## 8. Translation Keys

### 8.1 English Translations

**File:** `src/messages/en.json`

**Add to menu object:**
```json
{
  "menu": {
    "seasonal": {
      "title": "Seasonal Specials",
      "subtitle": "Limited Time Offerings",
      "description": "These items are available for a limited time. Don't miss out!",
      "availableUntil": "Available until"
    },
    "catering": {
      "title": "Catering & Large Orders",
      "subtitle": "Perfect for Events",
      "description": "Make your next event memorable with our catering packages. All packages include setup and can be customized to your needs.",
      "serves": "Serves",
      "leadTime": "Lead time",
      "days": "days"
    },
    "specialOrders": {
      "title": "Special Orders & Preorders",
      "subtitle": "Custom Creations",
      "description": "Place advance orders for custom items and special occasions. Orders must be placed by the cutoff date.",
      "orderBy": "Order by"
    },
    "events": {
      "title": "Events & Popups",
      "subtitle": "Find Us Around Town",
      "description": "Join us at these upcoming events and popup locations.",
      "location": "Location",
      "featuredItems": "Featured Items"
    },
    "footer": {
      "orderingInfo": "Ordering Information"
    }
  },
  "gallery": {
    "title": "Gallery",
    "subtitle": "Our Signature Dishes",
    "description": "Take a visual journey through our most popular dishes and culinary creations."
  }
}
```

**Cursor Prompt:**
```
Add translation keys for all new menu sections (seasonal, catering, specialOrders, events, footer) and gallery section to both en.json and es.json files.
```

---

## Implementation Order

1. **Type Definitions** - Create all type files first
2. **Data Structure** - Update siteContent.ts with example data
3. **Menu Components** - Create all menu section components
4. **MenuContainer** - Create orchestrator component
5. **PDF Export** - Enhance export function
6. **Gallery** - Create scrollable gallery
7. **i18n Optimization** - Optimize language loading
8. **Visual Polish** - Add icons, shadows, consistent styling
9. **Translations** - Add all translation keys
10. **Dependencies** - Update packages

---

## Notes

- All sections conditionally render (return null if no data)
- Consistent spacing: `py-16 md:py-20` for sections
- All cards use neumorphic shadows
- Section titles use `text-deep text-lg font-bold` for better visibility
- Mobile-first responsive design
- PDF export mirrors visible page content
- Language switching is instant after initial load (cached)
- Mobile menu uses inline transform styles for cross-browser compatibility
- Logo uses CSS-only sizing approach for Safari mobile compatibility
- Navigation includes all major sections: About, Menu, Gallery, Specials & Events, Contact

---

## 9. Navigation & UI Improvements

### 9.1 Removed Decorative Heroicons

**Files Modified:**
- `src/app/components/Home/Cook/index.tsx`
- `src/app/components/Home/Menu/index.tsx`
- `src/app/components/Home/Gallery/ScrollableGallery.tsx`
- `src/app/components/Home/Menu/CateringSection.tsx`
- `src/app/components/Home/Menu/SeasonalSection.tsx`
- `src/app/components/Home/Menu/EventsSection.tsx`
- `src/app/components/Home/Menu/SpecialOrdersSection.tsx`
- `src/app/components/Contact/Form/index.tsx`

**Changes:**
- Removed all decorative heroicons that were positioned absolutely in corners
- Removed heroicon imports from all affected components
- Cleaned up component structure

**Cursor Prompt:**
```
Remove all decorative heroicons from section components. These icons were randomly placed in corners and don't add value to the UI.
```

---

### 9.2 Improved Section Title Visibility

**Files Modified:**
- `src/app/components/Home/Cook/index.tsx`
- `src/app/components/Home/Menu/index.tsx`
- `src/app/components/Home/Gallery/ScrollableGallery.tsx`
- `src/app/components/Home/Menu/CateringSection.tsx`
- `src/app/components/Home/Menu/SeasonalSection.tsx`
- `src/app/components/Home/Menu/EventsSection.tsx`
- `src/app/components/Home/Menu/SpecialOrdersSection.tsx`
- `src/app/components/Home/Features/index.tsx`
- `src/app/components/Contact/Form/index.tsx`

**Changes:**
- Changed section title color from `text-primary` to `text-deep` for better contrast
- Changed font weight from `font-normal` to `font-bold` for better visibility
- All section titles now use: `text-deep text-lg font-bold tracking-widest uppercase`

**Cursor Prompt:**
```
Make section titles bolder and use a different color (text-deep instead of text-primary) for better visibility against light backgrounds.
```

---

### 9.3 Enhanced Mobile Gallery Swipe Gesture Indicator

**File:** `src/app/components/Home/Gallery/ScrollableGallery.tsx`

**Changes:**
- Replaced small, faint gesture indicator with a more visible design
- Added animated bouncing arrows (left/right) with custom CSS animations
- Added progress dots that highlight the active image
- Used IntersectionObserver to track which card is currently in view
- Improved contrast with dark text and background container
- Larger icons and bolder text for better visibility

**CSS Animations Added:**
```css
@keyframes bounce-x {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(-4px); }
}

@keyframes bounce-x-reverse {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(4px); }
}
```

**Cursor Prompt:**
```
Improve the mobile view slide gesture indicator to be more visible and better hint the user. Make it larger, bolder, and add animations to draw attention.
```

---

### 9.4 Fixed Logo Sizing for Safari Mobile

**File:** `src/app/components/Layout/Header/Logo/index.tsx`

**Problem:**
- Logo appeared extra long and huge in Safari mobile
- Conflicting width/height classes causing Safari rendering issues

**Solution:**
- Removed conflicting inline styles and className constraints
- Implemented CSS-only sizing approach using `.logo-container` and `.logo-image` classes
- Added explicit height constraints (20px mobile, 24px desktop)
- Added Safari-specific CSS fixes with hardware acceleration
- Added proper `sizes` attribute for responsive image loading

**CSS Added:**
```css
.logo-container {
  height: 20px;
  max-width: 100px;
  width: auto;
  position: relative;
  display: flex;
  align-items: center;
}

@media (min-width: 768px) {
  .logo-container {
    height: 24px;
    max-width: 117px;
  }
}

.logo-image {
  height: 100%;
  width: auto;
  max-width: 100%;
  object-fit: contain;
  display: block;
}
```

**Cursor Prompt:**
```
Fix the logo sizing issue in Safari mobile. The logo shows extra long and huge. Use CSS-only approach for better Safari compatibility.
```

---

### 9.5 Navbar Structure & Mobile Menu Improvements

**File:** `src/app/components/Layout/Header/index.tsx`

**Key Improvements:**

1. **Fixed Mobile Menu Slide Animation:**
   - Moved mobile menu outside header element to prevent backdrop-blur inheritance
   - Used inline styles for transform to ensure cross-browser compatibility
   - Fixed z-index layering for proper stacking

2. **Fixed Mobile Menu Transparency:**
   - Moved mobile menu outside header to avoid backdrop-blur effects
   - Added explicit white background with `!important` CSS rules
   - Added `isolation: isolate` to create new stacking context
   - Disabled backdrop-filter on mobile menu

3. **Fixed Layout Shift:**
   - Compensated for scrollbar width when hiding body overflow
   - Added `paddingRight` equal to scrollbar width to prevent layout shift
   - Prevents content jumping when mobile menu opens

4. **Improved Header Structure:**
   - Added explicit background handling (transparent when not sticky, white when sticky)
   - Added `min-h-[60px]` to prevent layout shifts
   - Increased desktop padding from `md:py-4` to `md:py-5`
   - Better touch targets for mobile Safari

**CSS Added:**
```css
.mobile-menu {
  background-color: #ffffff !important;
  background: #ffffff !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  isolation: isolate;
}

.touch-manipulation {
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}
```

**Cursor Prompt:**
```
Fix navbar issues: mobile menu slide animation not working, mobile menu showing transparent when navbar is sticky, layout shift when opening menu. Improve navbar structure and Safari compatibility.
```

---

### 9.6 Enhanced Navigation Menu

**Files Modified:**
- `src/data/siteContent.ts`
- `src/app/components/Home/Gallery/ScrollableGallery.tsx`
- `src/app/components/Home/Menu/SeasonalSection.tsx`
- `src/messages/en.json`
- `src/messages/es.json`

**Changes:**

1. **Added Gallery to Navigation:**
   - Added `id='gallery'` to ScrollableGallery component
   - Added Gallery link to HeaderData

2. **Added Specials & Events to Navigation:**
   - Added `id='specials-events'` to SeasonalSection component
   - Changed Features navigation to point to Specials & Events section
   - Updated translations: "Specials & Events" (EN) / "Especiales y Eventos" (ES)

3. **Updated Navigation Structure:**
   ```typescript
   export const HeaderData: HeaderItem[] = [
     { label: 'nav.aboutUs', href: '/#aboutus' },
     { label: 'nav.menu', href: '/#menu-section' },
     { label: 'nav.gallery', href: '/#gallery' },
     { label: 'nav.features', href: '/#specials-events' },
     { label: 'nav.contactUs', href: '/#contact' },
   ]
   ```

4. **Translation Keys Added:**
   - English: `nav.gallery: "Gallery"`, `nav.features: "Specials & Events"`
   - Spanish: `nav.gallery: "Galería"`, `nav.features: "Especiales y Eventos"`

**Cursor Prompt:**
```
Add Gallery and Features (Specials & Events) sections to the navigation menu. Make sure all sections are easily accessible from the mobile menu. Update translation files accordingly.
```

---

## Testing Checklist

- [ ] All menu sections render correctly
- [ ] PDF export includes all sections
- [ ] Language switching works smoothly
- [ ] Loader appears during initial language load
- [ ] Gallery scrolls correctly on mobile and desktop
- [ ] All sections use consistent styling
- [ ] Dietary icons display correctly
- [ ] Responsive design works on all screen sizes
- [ ] Build completes successfully
- [ ] No console errors

---

**End of Report**
