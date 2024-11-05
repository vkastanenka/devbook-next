// types
import { User } from '@/types/user-types'

// validation
import { z } from 'zod'
import { postValidation } from '@/validation/post'

// Comment

export type PostCreateCommentReqBody = z.infer<
  typeof postValidation.postCreateCommentReqBodySchema
>

export type PostUpdateCommentReqBody = z.infer<
  typeof postValidation.postUpdateCommentReqBodySchema
>

// CommentLike

export type PostCreateCommentLikeReqBody = z.infer<
  typeof postValidation.postCreateCommentLikeReqBodySchema
>

// Post

export type PostCreatePostReqBody = z.infer<
  typeof postValidation.postCreatePostReqBodySchema
>

export type PostUpdatePostReqBody = z.infer<
  typeof postValidation.postUpdatePostReqBodySchema
>

// PostLike

export type PostCreatePostLikeReqBody = z.infer<
  typeof postValidation.postCreatePostLikeReqBodySchema
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
