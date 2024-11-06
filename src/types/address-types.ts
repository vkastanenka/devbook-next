// types
import { User } from '@/types/user-types'

// validation
import { z } from 'zod'
import {
  addressCreateAddressReqBodySchema,
  addressUpdateAddressReqBodySchema,
} from '@/validation/address-validation'

// Address

export type AddressCreateAddressReqBody = z.infer<
  typeof addressCreateAddressReqBodySchema
>

export type AddressUpdateAddressReqBody = z.infer<
  typeof addressUpdateAddressReqBodySchema
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
