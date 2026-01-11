'use client'

import React from 'react'

export type DietaryType =
  | 'vegetarian'
  | 'vegan'
  | 'gluten-free'
  | 'spicy'
  | 'halal'
  | 'kosher'
  | 'nut-free'
  | 'dairy-free'
  | 'organic'
  | 'low-calorie'
  | 'chefs-pick'

interface DietaryIconsProps {
  dietary: DietaryType[]
  className?: string
  size?: number
}

const DietaryIcons: React.FC<DietaryIconsProps> = ({
  dietary,
  className = '',
  size = 20,
}) => {
  if (!dietary || dietary.length === 0) return null

  const iconComponents: Record<DietaryType, React.ReactNode> = {
    vegetarian: (
      <svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
        aria-label='Vegetarian'>
        <path
          d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z'
          fill='#4CAF50'
        />
        <path
          d='M12 4c-1.93 0-3.68.78-4.95 2.05L12 12l4.95-5.95C15.68 4.78 13.93 4 12 4z'
          fill='#2E7D32'
        />
      </svg>
    ),
    vegan: (
      <svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
        aria-label='Vegan'>
        <circle cx='12' cy='12' r='10' fill='#2E7D32' />
        <path
          d='M12 4c-1.93 0-3.68.78-4.95 2.05L12 12l4.95-5.95C15.68 4.78 13.93 4 12 4z'
          fill='#1B5E20'
        />
        <path
          d='M12 4c-1.93 0-3.68.78-4.95 2.05L12 12l4.95-5.95C15.68 4.78 13.93 4 12 4z'
          fill='#4CAF50'
          opacity='0.5'
        />
      </svg>
    ),
    'gluten-free': (
      <svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
        aria-label='Gluten-Free'>
        <circle cx='12' cy='12' r='10' fill='#FF9800' stroke='#F57C00' strokeWidth='1' />
        <text
          x='12'
          y='16.5'
          fontSize='10'
          fontWeight='bold'
          fill='white'
          textAnchor='middle'
          fontFamily='Arial, sans-serif'>
          GF
        </text>
      </svg>
    ),
    spicy: (
      <svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
        aria-label='Spicy'>
        <path
          d='M12 2C8 2 6 4 6 8c0 4 2 6 6 10 4-4 6-6 6-10 0-4-2-6-6-6z'
          fill='#F44336'
        />
        <path
          d='M10 8c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2z'
          fill='#FFEB3B'
        />
        <path
          d='M12 14c-1.1 0-2-.9-2-2h4c0 1.1-.9 2-2 2z'
          fill='#FFEB3B'
        />
      </svg>
    ),
    halal: (
      <svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
        aria-label='Halal'>
        <circle cx='12' cy='12' r='10' fill='#4CAF50' stroke='#2E7D32' strokeWidth='1' />
        <text
          x='12'
          y='17'
          fontSize='14'
          fontWeight='bold'
          fill='white'
          textAnchor='middle'
          fontFamily='Arial, sans-serif'>
          H
        </text>
      </svg>
    ),
    kosher: (
      <svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
        aria-label='Kosher'>
        <path
          d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'
          fill='#2196F3'
        />
        <circle cx='12' cy='12' r='6' fill='white' />
        <text
          x='12'
          y='16.5'
          fontSize='12'
          fontWeight='bold'
          fill='#2196F3'
          textAnchor='middle'
          fontFamily='Arial, sans-serif'>
          K
        </text>
      </svg>
    ),
    'nut-free': (
      <svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
        aria-label='Nut-Free'>
        <ellipse cx='12' cy='12' rx='8' ry='5' fill='#8B4513' />
        <path
          d='M8 10c0-1.1.9-2 2-2s2 .9 2 2c0 1.1-.9 2-2 2s-2-.9-2-2zm4 0c0-1.1.9-2 2-2s2 .9 2 2c0 1.1-.9 2-2 2s-2-.9-2-2z'
          fill='#D2691E'
        />
        <line
          x1='5'
          y1='5'
          x2='19'
          y2='19'
          stroke='#F44336'
          strokeWidth='2.5'
          strokeLinecap='round'
        />
      </svg>
    ),
    'dairy-free': (
      <svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
        aria-label='Dairy-Free'>
        <path
          d='M6 4h12c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z'
          fill='#2196F3'
        />
        <path
          d='M8 6h8v1.5H8zm0 3h8v1.5H8zm0 3h6v1.5H8z'
          fill='white'
        />
        <path
          d='M8 15h4v1.5H8z'
          fill='white'
        />
        <line
          x1='4'
          y1='4'
          x2='20'
          y2='20'
          stroke='#F44336'
          strokeWidth='2.5'
          strokeLinecap='round'
        />
      </svg>
    ),
    organic: (
      <svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
        aria-label='Organic'>
        <circle cx='12' cy='12' r='10' fill='#4CAF50' stroke='#2E7D32' strokeWidth='1' />
        <path
          d='M12 4c-1.93 0-3.68.78-4.95 2.05L12 12l4.95-5.95C15.68 4.78 13.93 4 12 4z'
          fill='#2E7D32'
        />
        <text
          x='12'
          y='18'
          fontSize='7'
          fontWeight='bold'
          fill='white'
          textAnchor='middle'
          fontFamily='Arial, sans-serif'>
          ORG
        </text>
      </svg>
    ),
    'low-calorie': (
      <svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
        aria-label='Low-Calorie'>
        <path
          d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
          fill='#E91E63'
        />
      </svg>
    ),
    'chefs-pick': (
      <svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
        aria-label="Chef's Pick">
        <path
          d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'
          fill='#FF9800'
        />
        <path
          d='M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-4 4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm8 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z'
          fill='white'
        />
      </svg>
    ),
  }

  return (
    <div className='flex items-center gap-1.5 flex-wrap'>
      {dietary.map((type) => (
        <span
          key={type}
          className='inline-flex items-center justify-center'
          title={type
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')}>
          {iconComponents[type]}
        </span>
      ))}
    </div>
  )
}

export default DietaryIcons

