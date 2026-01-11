'use client'

import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { FullMenuType } from '@/app/types/fullmenu'
import { CateringPackageType } from '@/app/types/catering'
import { SpecialOrderType } from '@/app/types/specialOrders'
import { EventType } from '@/app/types/events'
import { DietaryType } from '@/app/components/Common/DietaryIcons'

export interface MenuPdfData {
  menu: FullMenuType[]
  seasonal: FullMenuType[]
  catering: CateringPackageType[]
  specialOrders: SpecialOrderType[]
  events: EventType[]
  vendorName: string
}

export const exportMenuPdf = (data: MenuPdfData) => {
  const { menu, seasonal, catering, specialOrders, events, vendorName } = data
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'letter',
  })

  const marginX = 48
  let cursorY = 64

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(24)
  doc.text(`${vendorName} Menu`, marginX, cursorY)

  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  cursorY += 24
  doc.text(`Generated on ${new Date().toLocaleDateString()}`, marginX, cursorY)

  cursorY += 32

  // Helper function to sanitize text for PDF (removes problematic characters)
  const sanitizeText = (text: string): string => {
    if (!text) return ''
    // Replace problematic Unicode characters with ASCII equivalents
    return String(text)
      .replace(/['']/g, "'") // Replace curly quotes with straight quotes
      .replace(/[""]/g, '"') // Replace curly double quotes
      .replace(/[–—]/g, '-') // Replace em/en dashes
      .replace(/…/g, '...') // Replace ellipsis
      .replace(/[^\x20-\x7E\n\r\t]/g, '') // Keep only printable ASCII + newlines/tabs
  }

  // Helper function to format dietary icons as text
  const formatDietaryIcons = (dietary?: DietaryType[]): string => {
    if (!dietary || dietary.length === 0) return ''

    const labelMap: Record<DietaryType, string> = {
      vegetarian: '[Veg]',
      vegan: '[Vgn]',
      'gluten-free': '[GF]',
      spicy: '[Spicy]',
      halal: '[H]',
      kosher: '[K]',
      'nut-free': '[NF]',
      'dairy-free': '[DF]',
      organic: '[Org]',
      'low-calorie': '[LC]',
      'chefs-pick': '[CP]',
    }

    return dietary.map((d) => labelMap[d] || `[${d}]`).join(' ')
  }

  // Helper function to render menu table
  const renderMenuTable = (
    items: FullMenuType[],
    sectionTitle: string,
    startY: number
  ): number => {
    if (items.length === 0) return startY

    // Check if we need a new page
    if (startY > doc.internal.pageSize.getHeight() - 100) {
      doc.addPage()
      startY = 64
    }

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(16)
    doc.text(sectionTitle, marginX, startY)
    startY += 20

    const tableData = items.map((item) => {
      const dietaryIcons = formatDietaryIcons(item.dietary)
      const nameWithIcons = dietaryIcons
        ? `${sanitizeText(item.name)} ${dietaryIcons}`
        : sanitizeText(item.name)

      return [
        nameWithIcons,
        sanitizeText(item.style),
        sanitizeText(item.price),
        sanitizeText(item.description),
      ]
    })

    autoTable(doc, {
      head: [['Name', 'Style', 'Price', 'Description']],
      body: tableData,
      startY: startY,
      styles: {
        font: 'helvetica',
        fontSize: 11,
        textColor: '#2f2a1f',
        cellPadding: 8,
        valign: 'middle',
        lineColor: '#f1e3b2',
        lineWidth: 0.4,
      },
      headStyles: {
        fillColor: [224, 193, 118],
        textColor: '#2f2a1f',
        fontStyle: 'bold',
      },
      columnStyles: {
        0: { cellWidth: 140 },
        1: { cellWidth: 110 },
        2: { cellWidth: 60, halign: 'right' },
        3: { cellWidth: 'auto' },
      },
    })

    const lastAutoTableY = (doc as any).lastAutoTable?.finalY
    return lastAutoTableY ? lastAutoTableY + 20 : startY + 100
  }

  // Render Main Menu
  cursorY = renderMenuTable(menu, 'Main Menu', cursorY)

  // Render Seasonal & Limited Items
  if (seasonal.length > 0) {
    cursorY = renderMenuTable(seasonal, 'Seasonal & Limited Items', cursorY)
  }

  // Render Catering Packages
  if (catering.length > 0) {
    // Check if we need a new page
    if (cursorY > doc.internal.pageSize.getHeight() - 150) {
      doc.addPage()
      cursorY = 64
    }

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(16)
    doc.text('Catering Packages', marginX, cursorY)
    cursorY += 20

    catering.forEach((pkg) => {
      const price = typeof pkg.price === 'string' ? pkg.price : `$${pkg.price}`
      const dietaryIcons = formatDietaryIcons(pkg.dietary)
      const nameWithIcons = dietaryIcons
        ? `${sanitizeText(pkg.name)} ${dietaryIcons}`
        : sanitizeText(pkg.name)

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(12)
      doc.text(nameWithIcons, marginX, cursorY)
      cursorY += 14

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(10)
      doc.text(`Serves: ${pkg.servesCount} | Price: ${sanitizeText(price)}`, marginX, cursorY)
      cursorY += 12
      doc.text(`Lead time: ${pkg.leadTimeDays} days`, marginX, cursorY)
      cursorY += 12
      doc.text(sanitizeText(pkg.description), marginX, cursorY)
      cursorY += 14
      if (pkg.notes) {
        doc.setFont('helvetica', 'italic')
        doc.setFontSize(9)
        doc.text(`Note: ${sanitizeText(pkg.notes)}`, marginX, cursorY)
        cursorY += 12
      }
      cursorY += 8
    })
  }

  // Render Special Orders
  if (specialOrders.length > 0) {
    // Check if we need a new page
    if (cursorY > doc.internal.pageSize.getHeight() - 150) {
      doc.addPage()
      cursorY = 64
    }

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(16)
    doc.text('Special Orders & Preorders', marginX, cursorY)
    cursorY += 20

    specialOrders.forEach((order) => {
      const price = typeof order.price === 'string' ? order.price : `$${order.price}`
      const dietaryIcons = formatDietaryIcons(order.dietary)
      const nameWithIcons = dietaryIcons
        ? `${sanitizeText(order.name)} ${dietaryIcons}`
        : sanitizeText(order.name)

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(12)
      doc.text(nameWithIcons, marginX, cursorY)
      cursorY += 14

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(10)
      const cutoffDate = new Date(order.cutoffDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
      doc.text(`Order by: ${cutoffDate} | Price: ${sanitizeText(price)}`, marginX, cursorY)
      cursorY += 12
      doc.text(sanitizeText(order.description), marginX, cursorY)
      cursorY += 14
      if (order.customizationNotes) {
        doc.setFont('helvetica', 'italic')
        doc.setFontSize(9)
        doc.text(`Note: ${sanitizeText(order.customizationNotes)}`, marginX, cursorY)
        cursorY += 12
      }
      cursorY += 8
    })
  }

  // Render Events
  if (events.length > 0) {
    // Check if we need a new page
    if (cursorY > doc.internal.pageSize.getHeight() - 150) {
      doc.addPage()
      cursorY = 64
    }

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(16)
    doc.text('Upcoming Events', marginX, cursorY)
    cursorY += 20

    events.forEach((event) => {
      const eventDate = new Date(event.date).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(12)
      doc.text(sanitizeText(event.name), marginX, cursorY)
      cursorY += 14

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(10)
      doc.text(`Date: ${eventDate}`, marginX, cursorY)
      cursorY += 12
      doc.text(`Location: ${sanitizeText(event.location)}`, marginX, cursorY)
      cursorY += 12
      if (event.description) {
        doc.text(sanitizeText(event.description), marginX, cursorY)
        cursorY += 12
      }
      if (event.menuItems && event.menuItems.length > 0) {
        doc.text(`Featured: ${event.menuItems.map(sanitizeText).join(', ')}`, marginX, cursorY)
        cursorY += 12
      }
      cursorY += 8
    })
  }

  // Get all unique dietary types used across all sections
  const usedDietaryTypes = new Set<DietaryType>()
  ;[...menu, ...seasonal].forEach((item) => {
    if (item.dietary) {
      item.dietary.forEach((d) => usedDietaryTypes.add(d))
    }
  })
  catering.forEach((pkg) => {
    if (pkg.dietary) {
      pkg.dietary.forEach((d) => usedDietaryTypes.add(d))
    }
  })
  specialOrders.forEach((order) => {
    if (order.dietary) {
      order.dietary.forEach((d) => usedDietaryTypes.add(d))
    }
  })

  // Add legend if there are any dietary labels used
  if (usedDietaryTypes.size > 0) {
    const legendY = cursorY + 20

    const labelMap: Record<DietaryType, string> = {
      vegetarian: '[Veg]',
      vegan: '[Vgn]',
      'gluten-free': '[GF]',
      spicy: '[Spicy]',
      halal: '[H]',
      kosher: '[K]',
      'nut-free': '[NF]',
      'dairy-free': '[DF]',
      organic: '[Org]',
      'low-calorie': '[LC]',
      'chefs-pick': '[CP]',
    }

    const fullNameMap: Record<DietaryType, string> = {
      vegetarian: 'Vegetarian',
      vegan: 'Vegan',
      'gluten-free': 'Gluten-Free',
      spicy: 'Spicy',
      halal: 'Halal',
      kosher: 'Kosher',
      'nut-free': 'Nut-Free',
      'dairy-free': 'Dairy-Free',
      organic: 'Organic',
      'low-calorie': 'Low-Calorie',
      'chefs-pick': "Chef's Pick",
    }

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
    doc.text('Dietary Information', marginX, legendY)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)

    let legendX = marginX
    let currentY = legendY + 16
    const lineHeight = 14
    const maxWidth = doc.internal.pageSize.getWidth() - marginX * 2
    let currentLineWidth = 0

    const sortedTypes = Array.from(usedDietaryTypes).sort()

    sortedTypes.forEach((type) => {
      const label = labelMap[type] || `[${type}]`
      const fullName = sanitizeText(fullNameMap[type] || type)
      const text = `${label} = ${fullName}`
      const textWidth = doc.getTextWidth(text)

      if (currentLineWidth > 0 && currentLineWidth + textWidth + 20 > maxWidth) {
        currentY += lineHeight
        legendX = marginX
        currentLineWidth = 0
      }

      if (currentLineWidth > 0) {
        const separator = ' | '
        doc.text(separator, legendX, currentY)
        legendX += doc.getTextWidth(separator)
        currentLineWidth = legendX - marginX
      }

      doc.text(text, legendX, currentY)
      legendX += textWidth
      currentLineWidth = legendX - marginX
    })
  }

  const sanitizedVendorName = vendorName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  doc.save(`${sanitizedVendorName}-menu.pdf`)
}
