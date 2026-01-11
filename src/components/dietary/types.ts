/**
 * Dietary tag types for menu items
 */
export type DietaryTag =
  | 'vegan'
  | 'vegetarian'
  | 'spicy'
  | 'glutenFree'
  | 'dairyFree'
  | 'nutFree'
  | 'eggFree'
  | 'fishFree'
  | 'shellfishFree'
  | 'soyFree'

/**
 * Props for the DietaryIcon component
 */
export interface DietaryIconProps {
  /** The dietary tag to display */
  tag: DietaryTag
  /** Optional size in pixels (default: 18) */
  size?: number
  /** Optional className for styling (e.g., Tailwind classes) */
  className?: string
}

