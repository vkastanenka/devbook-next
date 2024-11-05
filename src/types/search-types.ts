// validation
import { z } from 'zod'
import { searchValidation } from '@/validation/search'

// Devbook

export type SearchDevbookReqBody = z.infer<
  typeof searchValidation.searchDevbookReqBodySchema
>
