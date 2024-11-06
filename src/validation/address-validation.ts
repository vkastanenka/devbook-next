// validation
import { z } from 'zod'

/**
 * Inputs
 */

const addressUnitNumberSchema = z
  .string()
  .min(1, { message: '1 characters(s) min' })
  .max(20, {
    message: '20 characters(s) max',
  })
  .nullable()

const addressStreetNumberSchema = z
  .string()
  .min(1, { message: '1 characters(s) min' })
  .max(20, {
    message: '20 characters(s) max',
  })

const addressStreetNameSchema = z
  .string()
  .min(2, { message: '2 characters(s) min' })
  .max(50, {
    message: '50 characters(s) max',
  })

const addressSuburbSchema = z
  .string()
  .min(1, { message: '1 characters(s) min' })
  .max(50, {
    message: '50 characters(s) max',
  })

const addressStateSchema = z
  .string()
  .min(2, { message: '2 characters(s) min' })
  .max(50, {
    message: '50 characters(s) max',
  })

const addressCountrySchema = z
  .string()
  .min(1, { message: '1 characters(s) min' })
  .max(50, {
    message: '50 characters(s) max',
  })

/**
 * Request bodies
 */

export const addressCreateAddressReqBodySchema = z
  .object({
    unitNumber: addressUnitNumberSchema.optional(),
    streetNumber: addressStreetNumberSchema,
    streetName: addressStreetNameSchema,
    suburb: addressSuburbSchema,
    state: addressStateSchema,
    country: addressCountrySchema,
    userId: z.string(),
  })
  .strict()

export const addressUpdateAddressReqBodySchema = z
  .object({
    unitNumber: addressUnitNumberSchema.optional(),
    streetNumber: addressStreetNumberSchema.optional(),
    streetName: addressStreetNameSchema.optional(),
    suburb: addressSuburbSchema.optional(),
    state: addressStateSchema.optional(),
    country: addressCountrySchema.optional(),
  })
  .strict()
