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
