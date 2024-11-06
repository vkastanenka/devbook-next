// validation
import { z } from 'zod'
import { searchDevbookReqBodySchema } from '@/validation/search-validation'

// Devbook

export type SearchDevbookReqBody = z.infer<typeof searchDevbookReqBodySchema>
