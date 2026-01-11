'use client'

import React from 'react'
import { 
  FaLeaf, 
  FaPepperHot,
  FaEgg,
  FaFish,
  FaSeedling,
} from 'react-icons/fa'
import { 
  GiWheat,
  GiMilkCarton,
  GiPeanut,
  GiShrimp,
  GiPlantRoots,
} from 'react-icons/gi'
import { DietaryTag, DietaryIconProps } from './types'

/**
 * Icon configuration type for different icon libraries
 */
type IconConfig = {
  component: React.ComponentType<{ 
    width?: string | number
    height?: string | number
    className?: string
    innerColor?: string
    outerColor?: string
    [key: string]: unknown 
  }>
  props?: Record<string, unknown>
  isAllergen?: boolean // true for react-allergens, false for react-icons
}

/**
 * Maps dietary tags to their corresponding icon components and props
 * Using a mix of react-icons and react-allergens for better visual distinction
 */
const getIconForTag = (tag: DietaryTag): IconConfig | null => {
  switch (tag) {
    case 'vegan':
      // Using plant roots icon to differentiate from vegetarian
      return { component: GiPlantRoots, isAllergen: false }
    case 'vegetarian':
      // Using leaf icon for vegetarian
      return { component: FaLeaf, isAllergen: false }
    case 'spicy':
      return { component: FaPepperHot, isAllergen: false }
    case 'glutenFree':
      // Using wheat icon from react-icons for better visibility
      return { component: GiWheat, isAllergen: false }
    case 'dairyFree':
      // Using milk carton icon from react-icons
      return { component: GiMilkCarton, isAllergen: false }
    case 'nutFree':
      // Using peanut icon from react-icons
      return { component: GiPeanut, isAllergen: false }
    case 'eggFree':
      // Using egg icon from react-icons
      return { component: FaEgg, isAllergen: false }
    case 'fishFree':
      // Using fish icon from react-icons
      return { component: FaFish, isAllergen: false }
    case 'shellfishFree':
      // Using shrimp icon from react-icons
      return { component: GiShrimp, isAllergen: false }
    case 'soyFree':
      // Using seedling icon from react-icons for soy/bean
      return { component: FaSeedling, isAllergen: false }
    default:
      return null
  }
}

/**
 * Simple, reusable dietary icon component
 * 
 * Uses react-icons for generic icons (leaf, pepper) and react-allergens
 * for allergen-specific icons (gluten, dairy, nuts, etc.)
 * 
 * @example
 * <DietaryIcon tag="vegan" size={20} className="text-green-600" />
 * <DietaryIcon tag="spicy" className="text-red-500" />
 * <DietaryIcon tag="glutenFree" size={18} />
 */
export const DietaryIcon: React.FC<DietaryIconProps> = ({
  tag,
  size = 18,
  className = '',
}) => {
  const iconConfig = getIconForTag(tag)

  if (!iconConfig) {
    // Fail safely for unknown tags
    return null
  }

  const { component: IconComponent, props: additionalProps = {}, isAllergen = false } = iconConfig

  // Handle different icon library prop conventions
  // react-icons uses 'size', react-allergens uses 'width'/'height'
  const iconProps = isAllergen
    ? {
        width: size,
        height: size,
        className,
        innerColor: 'currentColor',
        outerColor: 'currentColor',
        ...additionalProps,
      }
    : {
        size,
        className,
        ...additionalProps,
      }

  return <IconComponent {...iconProps} />
}

