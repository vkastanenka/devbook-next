import { User } from '@/types/user-types'

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

export interface CommentLike {
  id: string
  createdAt: Date
  updatedAt: Date
  comment?: Comment
  commentId: string
  user?: User
  userId: string
}

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

export interface PostLike {
  id: string
  createdAt: Date
  updatedAt: Date
  post?: Post
  postId: string
  user?: User
  userId: string
}
