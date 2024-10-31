export interface Address {
  id: string
  streetNumber: string
  streetName: string
  suburb: string
  state: string
  country: string
  createdAt: string
  updatedAt: string
  userId?: string
}

export interface UserDetailsFormDataAddress {
  streetNumber?: string
  streetName?: string
  suburb?: string
  state?: string
  country?: string
}
