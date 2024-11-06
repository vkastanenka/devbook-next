// types
import {
  SearchDevbookQuery,
  SearchDevbookFormData,
} from '@/src/types/search-types'

// validation
import { z } from 'zod'

/**
 * Inputs
 */

const searchDevbookQuerySchema: z.ZodType<SearchDevbookQuery> = z
  .string()
  .min(3, { message: '3 character(s) min' })
  .max(100, { message: '100 character(s) max' })

/**
 * Request bodies
 */

export const searchDevbookReqBodySchema: z.ZodType<SearchDevbookFormData> = z
  .object({
    query: searchDevbookQuerySchema,
  })
  .strict()
