import {
  CommentBody,
  PostBody,
  PostCreateCommentFormData,
  PostUpdateCommentFormData,
  PostCreatePostFormData,
  PostUpdatePostFormData,
} from '@/src/types/post-types'

// validation
import { z } from 'zod'

/**
 * Inputs
 */

// Comment

const postCommentBodySchema: z.ZodType<CommentBody> = z
  .string()
  .min(10, { message: '10 character(s) min' })
  .max(1000, {
    message: '1000 character(s) max',
  })

// Post

const postBodySchema: z.ZodType<PostBody> = z
  .string()
  .min(10, { message: '10 character(s) min' })
  .max(1000, {
    message: '1000 character(s) max',
  })

/**
 * Forms
 */

// Comment

export const postCreateCommentFormSchema: z.ZodType<PostCreateCommentFormData> =
  z
    .object({
      body: postCommentBodySchema,
    })
    .strict()

export const postUpdateCommentFormSchema: z.ZodType<PostUpdateCommentFormData> =
  z
    .object({
      body: postCommentBodySchema.optional(),
    })
    .strict()

// Post

export const postCreatePostFormSchema: z.ZodType<PostCreatePostFormData> = z
  .object({
    body: postBodySchema,
  })
  .strict()

export const postUpdatePostFormSchema: z.ZodType<PostUpdatePostFormData> = z
  .object({
    body: postBodySchema.optional(),
  })
  .strict()
