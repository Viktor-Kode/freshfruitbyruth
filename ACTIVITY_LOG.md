# Activity Log

This file tracks all changes and updates made to the menu-site-template project.

---

## 2024-12-19 - Navigation and Form Updates

### Summary
Updated navigation links, converted reservation form to contact form, and modified menu display to always show descriptions.

### Changes Made

#### 1. Navigation Updates
- **Navbar "Menu" button**: Now scrolls smoothly to the menu section (`#menu-section`)
- **Navbar "Reserve Table" → "Contact Us"**: 
  - Changed label from "Reserve Table" to "Contact Us"
  - Updated href from `/#reserve` to `/#contact`
  - Added smooth scrolling functionality

**Files Modified:**
- `src/data/siteContent.ts` - Updated HeaderData array
- `src/app/components/Layout/Header/Navigation/HeaderLink.tsx` - Added smooth scroll handler for hash links
- `src/app/components/Layout/Header/Navigation/MobileHeaderLink.tsx` - Added smooth scroll handler for mobile navigation

#### 2. Hero Section Updates
- **"View Menu" button**: Changed from Link to button with smooth scroll to `#menu-section`
- **"Reserve a Table" → "Contact Us" button**: 
  - Changed label to "Contact Us"
  - Updated to scroll smoothly to `#contact` section
  - Removed unused Link import

**Files Modified:**
- `src/app/components/Home/Hero/index.tsx` - Replaced Link components with buttons and scroll handlers

#### 3. Contact Form Conversion
Converted reservation form to a contact form with the following changes:
- **Removed fields**: Outlet, Time, Number of People
- **Kept fields**: Full Name, Email, Phone Number (now optional), Message
- **Updated section ID**: Changed from `id="reserve"` to `id="contact"`
- **Updated labels and text**:
  - Section title: "reservation" → "Contact Us"
  - Heading: "Dine With Us" → "Get In Touch"
  - Message placeholder: "Anything else you wanna communicate" → "How can we help you?"
  - Success message: "Thanks! Your table is booked. See you soon." → "Thanks! We received your message and will get back to you soon."
- **Schema updates**: 
  - Renamed `reservationSchema` to `contactSchema`
  - Removed validation for outlet, time, and people fields
  - Made phone number optional with proper validation
  - Updated error messages

**Files Modified:**
- `src/app/components/Contact/Form/index.tsx` - Complete form restructure

#### 4. Menu Component Updates
- **Removed expand/collapse functionality**: Menu items no longer use the `+`/`-` toggle
- **Always show descriptions**: Item descriptions are now always visible below the item name
- **Removed state management**: Removed `expandedItem` state and `handleRowClick` function
- **Layout update**: Changed from clickable rows to static display with descriptions always visible

**Files Modified:**
- `src/app/components/Home/Menu/index.tsx` - Simplified component structure

#### 5. PDF Export
- **Verified**: PDF export already includes descriptions in the table
- **Note**: Any changes to menu items in `FullMenuData` will automatically be reflected in the PDF download since it uses the same data source

**Files Reviewed:**
- `src/app/utils/exportMenuPdf.ts` - Confirmed descriptions are included

### Technical Details

#### Smooth Scrolling Implementation
- Added `handleClick` functions to intercept hash link navigation
- Uses `element.scrollIntoView({ behavior: 'smooth', block: 'start' })` for smooth scrolling
- Works for both desktop and mobile navigation

#### Form Schema Changes
- Phone number validation now allows empty strings (optional field)
- Uses Zod's `refine` method for conditional validation
- Maintains validation when phone number is provided

### Files Changed
1. `src/data/siteContent.ts`
2. `src/app/components/Layout/Header/Navigation/HeaderLink.tsx`
3. `src/app/components/Layout/Header/Navigation/MobileHeaderLink.tsx`
4. `src/app/components/Home/Hero/index.tsx`
5. `src/app/components/Contact/Form/index.tsx`
6. `src/app/components/Home/Menu/index.tsx`

### Testing Notes
- All changes pass linting checks
- Smooth scrolling works for all navigation links
- Contact form validation works correctly with optional phone number
- Menu descriptions are always visible
- PDF export functionality remains intact

---

## 2024-12-19 - Dietary Icons Component

### Summary
Created a comprehensive dietary icons component with 11 clean SVG icons for menu items, integrated into the menu display and PDF export.

### Changes Made

#### 1. Dietary Icons Component
Created a new reusable component with 11 dietary restriction/preference icons:
- **Vegetarian** - Green leaf icon
- **Vegan** - Double-leaf/plant sprout icon
- **Gluten-Free** - Orange circle with "GF" text
- **Spicy** - Red chili pepper icon
- **Halal** - Green circle with "H" text
- **Kosher** - Blue star with "K" text
- **Nut-Free** - Brown peanut with red slash
- **Dairy-Free** - Blue milk carton with red slash
- **Organic** - Green circle with leaf and "ORG" text
- **Low-Calorie** - Pink heart icon
- **Chef's Pick** - Orange chef hat icon

**Features:**
- Clean, minimal SVG icons (default size: 20px, customizable)
- Accessible with aria-labels
- Responsive flex layout with proper spacing
- Tooltips showing formatted dietary type names

**Files Created:**
- `src/app/components/Common/DietaryIcons/index.tsx` - Main component with all icon definitions

#### 2. Menu Type Updates
- Added optional `dietary` array to `FullMenuType`
- Dietary array accepts `DietaryType` values (e.g., 'vegetarian', 'vegan', 'gluten-free', etc.)
- Maintains backward compatibility (dietary field is optional)

**Files Modified:**
- `src/app/types/fullmenu.ts` - Added dietary field with type import

#### 3. Menu Display Integration
- Icons appear next to menu item names
- Icons wrap gracefully on smaller screens
- Only displays when dietary array is present and not empty
- Icons are sized appropriately (18px) for menu display

**Files Modified:**
- `src/app/components/Home/Menu/index.tsx` - Added DietaryIcons component integration

#### 4. PDF Export Updates
- Dietary information is included in PDF exports
- Dietary labels are formatted and appended to item descriptions
- Format: "Description (Dietary Label 1, Dietary Label 2)"
- Example: "Crispy Brussels sprouts... (Vegan, Gluten Free, Nut Free)"

**Files Modified:**
- `src/app/utils/exportMenuPdf.ts` - Added dietary formatting function and integration

#### 5. Example Data
Added example dietary icons to menu items to demonstrate usage:
- **Tamarind Glazed Brussels**: vegan, gluten-free, nut-free
- **Cacao Tres Leches**: vegetarian
- **Citrus Cured Hamachi**: chef's pick, gluten-free, low-calorie

**Files Modified:**
- `src/data/siteContent.ts` - Added dietary arrays to example menu items

### Technical Details

#### Component API
```typescript
<DietaryIcons
  dietary={['vegetarian', 'gluten-free', 'spicy']}
  size={20}  // optional, default: 20
  className=""  // optional
/>
```

#### Dietary Type Values
- `'vegetarian'`
- `'vegan'`
- `'gluten-free'`
- `'spicy'`
- `'halal'`
- `'kosher'`
- `'nut-free'`
- `'dairy-free'`
- `'organic'`
- `'low-calorie'`
- `'chefs-pick'`

#### Icon Design
- All icons use consistent 24x24 viewBox
- Color-coded for quick recognition:
  - Green: Vegetarian, Vegan, Halal, Organic
  - Orange: Gluten-Free, Chef's Pick
  - Red: Spicy, Nut-Free (slash), Dairy-Free (slash)
  - Blue: Kosher, Dairy-Free (carton)
  - Pink: Low-Calorie
- Icons are optimized for small sizes while maintaining clarity

### Files Changed
1. `src/app/components/Common/DietaryIcons/index.tsx` (new)
2. `src/app/types/fullmenu.ts`
3. `src/app/components/Home/Menu/index.tsx`
4. `src/app/utils/exportMenuPdf.ts`
5. `src/data/siteContent.ts`

### Usage Example
```typescript
{
  name: 'Tamarind Glazed Brussels',
  style: 'Plant-Based',
  price: '$12.00',
  description: 'Crispy Brussels sprouts...',
  dietary: ['vegan', 'gluten-free', 'nut-free'],
}
```

### Testing Notes
- All changes pass linting checks
- Icons render correctly in menu display
- Icons are responsive and wrap properly
- PDF export includes dietary information correctly formatted
- Component handles empty/missing dietary arrays gracefully
- All 11 icon types render correctly with proper colors and shapes

---

