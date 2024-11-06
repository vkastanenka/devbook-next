// validation
import { z } from 'zod'

/**
 * Inputs
 */

const searchDevbookQuerySchema = z
  .string()
  .min(3, { message: '3 character(s) min' })
  .max(100, { message: '100 character(s) max' })

/**
 * Request bodies
 */

export const searchDevbookReqBodySchema = z
  .object({
    query: searchDevbookQuerySchema,
  })
  .strict()
