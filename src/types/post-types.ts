// types
import { User } from '@/types/user-types'

// validation
import { z } from 'zod'
import {
  postFormSchema,
  postCommentFormSchema,
  postCreateCommentReqBodySchema,
  postUpdateCommentReqBodySchema,
  postCreateCommentLikeReqBodySchema,
  postCreatePostReqBodySchema,
  postUpdatePostReqBodySchema,
  postCreatePostLikeReqBodySchema,
} from '@/validation/post-validation'

// Comment

export type PostCommentFormData = z.infer<typeof postCommentFormSchema>

export type PostCreateCommentReqBody = z.infer<
  typeof postCreateCommentReqBodySchema
>

export type PostUpdateCommentReqBody = z.infer<
  typeof postUpdateCommentReqBodySchema
>

// CommentLike

export type PostCreateCommentLikeReqBody = z.infer<
  typeof postCreateCommentLikeReqBodySchema
>

// Post

export type PostFormData = z.infer<typeof postFormSchema>

export type PostCreatePostReqBody = z.infer<typeof postCreatePostReqBodySchema>

export type PostUpdatePostReqBody = z.infer<typeof postUpdatePostReqBodySchema>

// PostLike

export type PostCreatePostLikeReqBody = z.infer<
  typeof postCreatePostLikeReqBodySchema
>

// Comment

export interface Comment {
  id: string
  body: string
  createdAt: Date
  updatedAt: Date
  parentComment?: Comment
  parentCommentId?: string
  post?: Post
  postId: string
  user?: User
  userId: string
  commentLikes?: CommentLike[]
  subComments?: Comment[]
}

// CommentLike

export interface CommentLike {
  id: string
  createdAt: Date
  updatedAt: Date
  comment?: Comment
  commentId: string
  user?: User
  userId: string
}

// Post

export enum PostType {
  DEFAULT,
  EVENT,
  ARTICLE,
}

export interface Post {
  id: string
  body: string
  postType: PostType
  createdAt: Date
  updatedAt: Date
  user?: User
  userId: string
  comments?: Comment[]
  postLikes?: PostLike[]
}

// PostLike

export interface PostLike {
  id: string
  createdAt: Date
  updatedAt: Date
  post?: Post
  postId: string
  user?: User
  userId: string
}
