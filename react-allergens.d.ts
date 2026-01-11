/**
 * TypeScript declarations for react-allergens
 */
declare module 'react-allergens' {
  import { ComponentType } from 'react'

  interface AllergenIconProps {
    width?: string | number
    height?: string | number
    innerColor?: string
    outerColor?: string
    className?: string
    wrapperStyle?: React.CSSProperties
  }

  export const GlutenIcon: ComponentType<AllergenIconProps>
  export const MilkIcon: ComponentType<AllergenIconProps>
  export const PeanutIcon: ComponentType<AllergenIconProps>
  export const EggIcon: ComponentType<AllergenIconProps>
  export const FishIcon: ComponentType<AllergenIconProps>
  export const CrustaceanIcon: ComponentType<AllergenIconProps>
  export const SoyaIcon: ComponentType<AllergenIconProps>
  export const NutsIcon: ComponentType<AllergenIconProps>
  export const CeleryIcon: ComponentType<AllergenIconProps>
  export const MustardIcon: ComponentType<AllergenIconProps>
  export const SesameIcon: ComponentType<AllergenIconProps>
  export const SulphiteIcon: ComponentType<AllergenIconProps>
  export const LupinIcon: ComponentType<AllergenIconProps>
  export const MolluscIcon: ComponentType<AllergenIconProps>
}

