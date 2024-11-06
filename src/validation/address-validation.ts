// types
import {
  AddressUnitNumber,
  AddressStreetNumber,
  AddressStreetName,
  AddressSuburb,
  AddressState,
  AddressCountry,
  AddressCreateAddressFormData,
  AddressUpdateAddressFormData,
} from '@/src/types/address-types'

// validation
import { z } from 'zod'

/**
 * Fields
 */

const addressUnitNumberSchema: z.ZodType<AddressUnitNumber> = z
  .string()
  .min(1, { message: '1 characters(s) min' })
  .max(20, {
    message: '20 characters(s) max',
  })
  .nullable()

const addressStreetNumberSchema: z.ZodType<AddressStreetNumber> = z
  .string()
  .min(1, { message: '1 characters(s) min' })
  .max(20, {
    message: '20 characters(s) max',
  })

const addressStreetNameSchema: z.ZodType<AddressStreetName> = z
  .string()
  .min(2, { message: '2 characters(s) min' })
  .max(50, {
    message: '50 characters(s) max',
  })

const addressSuburbSchema: z.ZodType<AddressSuburb> = z
  .string()
  .min(1, { message: '1 characters(s) min' })
  .max(50, {
    message: '50 characters(s) max',
  })

const addressStateSchema: z.ZodType<AddressState> = z
  .string()
  .min(2, { message: '2 characters(s) min' })
  .max(50, {
    message: '50 characters(s) max',
  })

const addressCountrySchema: z.ZodType<AddressCountry> = z
  .string()
  .min(1, { message: '1 characters(s) min' })
  .max(50, {
    message: '50 characters(s) max',
  })

/**
 * Forms
 */

export const addressCreateAddressFormSchema: z.ZodType<AddressCreateAddressFormData> =
  z
    .object({
      unitNumber: addressUnitNumberSchema.optional(),
      streetNumber: addressStreetNumberSchema,
      streetName: addressStreetNameSchema,
      suburb: addressSuburbSchema,
      state: addressStateSchema,
      country: addressCountrySchema,
    })
    .strict()

export const addressUpdateAddressFormSchema: z.ZodType<AddressUpdateAddressFormData> =
  z
    .object({
      unitNumber: addressUnitNumberSchema.optional(),
      streetNumber: addressStreetNumberSchema.optional(),
      streetName: addressStreetNameSchema.optional(),
      suburb: addressSuburbSchema.optional(),
      state: addressStateSchema.optional(),
      country: addressCountrySchema.optional(),
    })
    .strict()
