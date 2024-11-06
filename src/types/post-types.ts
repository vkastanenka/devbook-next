// types
import { User } from '@/types/user-types'

/**
 * Fields
 */

export type PostCommentBody = string
export type PostBody = string

/**
 * Models
 */

// Comment

export interface PostComment {
  id: string
  body: PostCommentBody
  createdAt: Date
  updatedAt: Date
  parentComment?: PostComment
  parentCommentId?: string
  post?: Post
  postId: string
  user?: User
  userId: string
  commentLikes?: PostCommentLike[]
  subComments?: PostComment[]
}

// CommentLike

export interface PostCommentLike {
  id: string
  createdAt: Date
  updatedAt: Date
  comment?: PostComment
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
  body: PostBody
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

/**
 * Forms
 */

// Comment

export interface PostCreateCommentFormData {
  body: string
}

export interface PostUpdateCommentFormData {
  body?: string
}

// Post

export interface PostCreatePostFormData {
  body: string
}

export interface PostUpdatePostFormData {
  body?: string
}

/**
 * Request bodies
 */

// Comment

export interface PostCreateCurrentUserCommentReqBody {
  body: PostCommentBody
  parentCommentId?: string | null
  postId: string
  userId: string
}

export interface PostUpdateCommentReqBody {
  body?: PostCommentBody
}

// CommentLike

export interface PostCreateCurrentUserCommentLikeReqBody {
  commentId: string
  userId: string
}

// Post

export interface PostCreateCurrentUserPostReqBody {
  body: PostBody
  userId: string
}

export interface PostUpdatePostReqBody {
  body?: PostBody
}

// PostLike

export interface PostCreateCurrentUserPostLikeReqBody {
  postId: string
  userId: string
}
