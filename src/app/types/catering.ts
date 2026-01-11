import { DietaryType } from '@/app/components/Common/DietaryIcons'

export type CateringPackageType = {
  name: string
  description: string
  servesCount: number
  price: string | number
  leadTimeDays: number
  notes?: string
  dietary?: DietaryType[]
}
