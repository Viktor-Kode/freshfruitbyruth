'use client'

import React from 'react'
import { DietaryIcon, DietaryTag } from './index'

interface LegendItem {
  tag: DietaryTag
  label: string
}

const allLegendItems: LegendItem[] = [
  { tag: 'vegan', label: 'Vegan' },
  { tag: 'vegetarian', label: 'Vegetarian' },
  { tag: 'spicy', label: 'Spicy' },
  { tag: 'glutenFree', label: 'Gluten-Free' },
  { tag: 'dairyFree', label: 'Dairy-Free' },
  { tag: 'nutFree', label: 'Nut-Free' },
  { tag: 'eggFree', label: 'Egg-Free' },
  { tag: 'fishFree', label: 'Fish-Free' },
  { tag: 'shellfishFree', label: 'Shellfish-Free' },
  { tag: 'soyFree', label: 'Soy-Free' },
]

/**
 * Dietary icons legend component
 * Displays dietary icons with their labels
 * @param tags - Optional array of tags to display. If not provided, shows all tags.
 */
export const DietaryLegend: React.FC<{
  className?: string
  iconSize?: number
  tags?: DietaryTag[]
}> = ({ className = '', iconSize = 18, tags }) => {
  // Filter to only show tags that are provided, or show all if no tags provided
  const itemsToShow = tags
    ? allLegendItems.filter((item) => tags.includes(item.tag))
    : allLegendItems

  if (itemsToShow.length === 0) return null

  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`}>
      <span className="text-sm font-semibold text-[#2f2a1f]/70 mr-2">
        Dietary Info:
      </span>
      {itemsToShow.map((item) => (
        <div
          key={item.tag}
          className="flex items-center gap-1.5"
          title={item.label}>
          <DietaryIcon
            tag={item.tag}
            size={iconSize}
            className={
              item.tag === 'vegan' || item.tag === 'vegetarian'
                ? 'text-green-600'
                : item.tag === 'spicy'
                ? 'text-red-500'
                : 'text-amber-600'
            }
          />
          <span className="text-xs text-[#2f2a1f]/80">{item.label}</span>
        </div>
      ))}
    </div>
  )
}

