// types
import { User } from '@/types/user-types'

// validation
import { z } from 'zod'
import { addressValidation } from '@/validation/address'

// Address

export type AddressCreateAddressReqBody = z.infer<
  typeof addressValidation.addressCreateAddressReqBodySchema
>

export type AddressUpdateAddressReqBody = z.infer<
  typeof addressValidation.addressUpdateAddressReqBodySchema
>

// Address

export interface Address {
  id: string
  unitNumber?: string | null
  streetNumber: string
  streetName: string
  suburb: string
  state: string
  country: string
  createdAt: Date
  updatedAt: Date
  user?: User
  userId?: string
}
