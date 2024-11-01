// utils
import { z } from 'zod'

// types
import { PostFormData } from '@/types/form-types'

/**
 * Form Inputs
 */

const postBodySchema = z
  .string()
  .min(10, { message: 'Minimum 10 characters.' })
  .max(1000, {
    message: 'Maximum 1000 characters.',
  })

/**
 * Forms
 */

export const postFormSchema: z.ZodType<PostFormData> = z.object({
  body: postBodySchema,
})
