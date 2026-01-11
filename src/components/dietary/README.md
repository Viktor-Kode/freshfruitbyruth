# Dietary Icon Component

A simple, reusable dietary icon component system using `react-icons` and `react-allergens`.

## Installation

```bash
npm install react-allergens react-icons
# or
yarn add react-allergens react-icons
```

## Usage

```tsx
import { DietaryIcon, DietaryTag } from "@/components/dietary"

// Single icon
<DietaryIcon tag="vegan" size={20} className="text-green-600" />

// Multiple icons
{dietaryTags.map((tag) => (
  <DietaryIcon key={tag} tag={tag} size={18} />
))}
```

## Supported Tags

- `vegan` - Leaf icon (green)
- `vegetarian` - Leaf icon (green)
- `spicy` - Pepper icon (red)
- `glutenFree` - Gluten-free icon
- `dairyFree` - Dairy-free icon
- `nutFree` - Nut-free icon
- `eggFree` - Egg-free icon
- `fishFree` - Fish-free icon
- `shellfishFree` - Shellfish-free icon
- `soyFree` - Soy-free icon

## Props

- `tag: DietaryTag` - Required. The dietary tag to display
- `size?: number` - Optional. Icon size in pixels (default: 18)
- `className?: string` - Optional. Tailwind classes for styling

## Example

See `src/components/menu/MenuItemExample.tsx` for a complete usage example.

