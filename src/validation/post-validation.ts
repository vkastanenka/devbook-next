// validation
import { z } from 'zod'

/**
 * Inputs
 */

// Comment

const postCommentBodySchema = z
  .string()
  .min(10, { message: '10 character(s) min' })
  .max(1000, {
    message: '1000 character(s) max',
  })

// Post

const postBodySchema = z
  .string()
  .min(10, { message: '10 character(s) min' })
  .max(1000, {
    message: '1000 character(s) max',
  })

/**
 * Forms
 */

// Comment

export const postCommentFormSchema = z
  .object({
    body: postCommentBodySchema,
  })
  .strict()

// Post
export const postFormSchema = z
  .object({
    body: postBodySchema,
  })
  .strict()

/**
 * Request bodies
 */

// Comment

export const postCreateCommentReqBodySchema = z
  .object({
    body: postCommentBodySchema,
    parentCommentId: z.string().nullable().optional(),
    postId: z.string(),
    userId: z.string(),
  })
  .strict()

export const postUpdateCommentReqBodySchema = z
  .object({
    body: postCommentBodySchema.optional(),
  })
  .strict()

// CommentLike

export const postCreateCommentLikeReqBodySchema = z
  .object({
    commentId: z.string(),
    userId: z.string(),
  })
  .strict()

// Post

export const postCreatePostReqBodySchema = z
  .object({
    body: postBodySchema,
    userId: z.string(),
  })
  .strict()

export const postUpdatePostReqBodySchema = z
  .object({
    body: postBodySchema.optional(),
  })
  .strict()

// PostLike

export const postCreatePostLikeReqBodySchema = z
  .object({
    postId: z.string(),
    userId: z.string(),
  })
  .strict()
