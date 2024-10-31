export interface Address {
  id: string
  unitNumber: string | null
  streetNumber: string
  streetName: string
  suburb: string
  state: string
  country: string
  createdAt: string
  updatedAt: string
  userId?: string
}
