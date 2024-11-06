'use server'

// utils
import { serverRequestServer } from '@/actions/server-actions'

// types
import {
  PostCreateCommentReqBody,
  PostUpdateCommentReqBody,
  PostCreateCommentLikeReqBody,
  PostCreatePostReqBody,
  PostUpdatePostReqBody,
  PostCreatePostLikeReqBody,
  Comment,
  CommentLike,
  Post,
  PostLike,
} from '@/types/post-types'

// constants
import {
  POSTS_CURRENT_USER_COMMENT,
  POSTS_CURRENT_USER_COMMENT_LIKE,
  POSTS_CURRENT_USER_POST,
  POSTS_CURRENT_USER_POST_LIKE,
} from '@/constants/server-endpoint-constants'

// Comment

// Create current user comment
export const postCreateCurrentUserComment = async (
  reqBody: PostCreateCommentReqBody
) => {
  return await serverRequestServer<Comment, PostCreateCommentReqBody>({
    data: reqBody,
    endpoint: POSTS_CURRENT_USER_COMMENT,
    method: 'post',
  })
}

// Update current user comment
export const postUpdateCurrentUserComment = async (
  recordId: string,
  reqBody: PostUpdateCommentReqBody
) => {
  return await serverRequestServer<Comment, PostUpdateCommentReqBody>({
    data: reqBody,
    endpoint: `${POSTS_CURRENT_USER_COMMENT}/${recordId}`,
    method: 'patch',
  })
}

// Delete current user comment
export const postDeleteCurrentUserComment = async (recordId: string) => {
  return await serverRequestServer({
    endpoint: `${POSTS_CURRENT_USER_COMMENT}/${recordId}`,
    method: 'delete',
  })
}

// CommentLike

// Create current user comment like
export const postCreateCurrentUserCommentLike = async (
  reqBody: PostCreateCommentLikeReqBody
) => {
  return await serverRequestServer<CommentLike, PostCreateCommentLikeReqBody>({
    data: reqBody,
    endpoint: `${POSTS_CURRENT_USER_COMMENT_LIKE}`,
    method: 'post',
  })
}

// Delete current user comment like
export const postDeleteCurrentUserCommentLike = async (recordId: string) => {
  return await serverRequestServer({
    endpoint: `${POSTS_CURRENT_USER_COMMENT_LIKE}/${recordId}`,
    method: 'delete',
  })
}

// Post

// Create current user post
export const postCreateCurrentUserPost = async (
  reqBody: PostCreatePostReqBody
) => {
  return await serverRequestServer<Comment, PostCreatePostReqBody>({
    data: reqBody,
    endpoint: `${POSTS_CURRENT_USER_POST}`,
    method: 'post',
  })
}

// Update current user post
export const postUpdateCurrentUserPost = async (
  recordId: string,
  reqBody: PostUpdatePostReqBody
) => {
  return await serverRequestServer<Post, PostUpdatePostReqBody>({
    data: reqBody,
    endpoint: `${POSTS_CURRENT_USER_POST}/${recordId}`,
    method: 'patch',
  })
}

// Delete current user post
export const postDeleteCurrentUserPost = async (recordId: string) => {
  return await serverRequestServer({
    endpoint: `${POSTS_CURRENT_USER_POST}/${recordId}`,
    method: 'delete',
  })
}

// PostLike

// Create current user post like
export const postCreateCurrentUserPostLike = async (
  reqBody: PostCreatePostLikeReqBody
) => {
  return await serverRequestServer<PostLike, PostCreatePostLikeReqBody>({
    data: reqBody,
    endpoint: `${POSTS_CURRENT_USER_POST_LIKE}`,
    method: 'post',
  })
}

// Delete current user post like
export const postDeleteCurrentUserPostLike = async (recordId: string) => {
  return await serverRequestServer({
    endpoint: `${POSTS_CURRENT_USER_POST_LIKE}/${recordId}`,
    method: 'delete',
  })
}
