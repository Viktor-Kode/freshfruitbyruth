'use client'

import React from 'react'
import { DietaryIcon, DietaryTag } from '@/components/dietary'

interface MenuItemExampleProps {
  name: string
  description?: string
  price: string
  dietaryTags?: DietaryTag[]
}

/**
 * Example menu item component demonstrating DietaryIcon usage
 * 
 * This is a minimal example - styling can be adjusted as needed
 */
export const MenuItemExample: React.FC<MenuItemExampleProps> = ({
  name,
  description,
  price,
  dietaryTags = [],
}) => {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-gray-200">
      {/* Left side: Item info */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-lg">{name}</h3>
          {/* Dietary icons row */}
          {dietaryTags.length > 0 && (
            <div className="flex items-center gap-1.5">
              {dietaryTags.map((tag) => (
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
        {description && (
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        )}
      </div>

      {/* Right side: Price */}
      <div className="text-right">
        <span className="font-semibold">{price}</span>
      </div>
    </div>
  )
}

/**
 * Usage Examples:
 * 
 * // Vegan + Gluten-Free item
 * <MenuItemExample
 *   name="Tamarind Glazed Brussels"
 *   description="Crispy Brussels sprouts finished with tamarind piloncillo glaze"
 *   price="$12.00"
 *   dietaryTags={['vegan', 'glutenFree']}
 * />
 * 
 * // Vegetarian + Spicy item
 * <MenuItemExample
 *   name="Spicy Black Bean Tacos"
 *   description="Black beans with jalapeño, cilantro, and lime"
 *   price="$8.50"
 *   dietaryTags={['vegetarian', 'spicy']}
 * />
 */

