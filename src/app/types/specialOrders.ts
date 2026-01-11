import { DietaryType } from '@/app/components/Common/DietaryIcons'

export type SpecialOrderType = {
  name: string
  description: string
  price: string | number
  cutoffDate: string
  customizationNotes?: string
  dietary?: DietaryType[]
}
