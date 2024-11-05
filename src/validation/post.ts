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
 * Request bodies
 */

// Comment

const postCreateCommentReqBodySchema = z
  .object({
    body: postCommentBodySchema,
    parentCommentId: z.string().nullable().optional(),
    postId: z.string(),
    userId: z.string(),
  })
  .strict()

const postUpdateCommentReqBodySchema = z
  .object({
    body: postCommentBodySchema.optional(),
  })
  .strict()

// CommentLike

const postCreateCommentLikeReqBodySchema = z
  .object({
    commentId: z.string(),
    userId: z.string(),
  })
  .strict()

// Post

const postCreatePostReqBodySchema = z
  .object({
    body: postBodySchema,
    userId: z.string(),
  })
  .strict()

const postUpdatePostReqBodySchema = z
  .object({
    body: postBodySchema.optional(),
  })
  .strict()

// PostLike

const postCreatePostLikeReqBodySchema = z
  .object({
    postId: z.string(),
    userId: z.string(),
  })
  .strict()

export const postValidation = {
  postCreateCommentReqBodySchema,
  postUpdateCommentReqBodySchema,
  postCreateCommentLikeReqBodySchema,
  postCreatePostReqBodySchema,
  postUpdatePostReqBodySchema,
  postCreatePostLikeReqBodySchema,
}
