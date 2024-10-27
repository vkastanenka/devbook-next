export interface Address {
  id: string
  unitNumber: string | null
  streetNumber: string | null
  streetName: string | null
  suburbName: string | null
  stateName: string | null
  country: string | null
  createdAt: string
  updatedAt: string
  // user
  userId: string
  // user experience
  userExperienceId?: string
}
