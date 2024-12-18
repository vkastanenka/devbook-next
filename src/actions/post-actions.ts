'use server'

// utils
import { serverRequestServer } from '@/src/actions/server-actions'

// types
import {
  PostReadCommentRelationQueryReqBody,
  PostReadPostRelationQueryReqBody,
  PostCreateCommentReqBody,
  PostUpdateCommentReqBody,
  PostCreatePostReqBody,
  PostUpdatePostReqBody,
  PostCreatePostLikeReqBody,
  Comment,
  Post,
  PostLike,
} from '@vkastanenka/devbook-types/dist/post'

// constants
import {
  POSTS_POST,
  POSTS_COMMENT,
  POSTS_CURRENT_USER_COMMENT,
  POSTS_CURRENT_USER_POST,
  POSTS_CURRENT_USER_POST_LIKE,
} from '@/src/constants/server-endpoint-constants'

// Comment

// Read post with args
export const postReadComment = async (
  recordId: string,
  reqBody?: PostReadCommentRelationQueryReqBody
) => {
  return await serverRequestServer<
    Comment,
    PostReadCommentRelationQueryReqBody
  >({
    data: reqBody,
    endpoint: `${POSTS_COMMENT}/${recordId}`,
    method: 'post',
  })
}

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

// Post

// Read post with args
export const postReadPost = async (
  recordId: string,
  reqBody?: PostReadPostRelationQueryReqBody
) => {
  return await serverRequestServer<Post, PostReadPostRelationQueryReqBody>({
    data: reqBody,
    endpoint: `${POSTS_POST}/${recordId}`,
    method: 'post',
  })
}

// Create current user post
export const postCreateCurrentUserPost = async (
  reqBody: PostCreatePostReqBody
) => {
  return await serverRequestServer<Post, PostCreatePostReqBody>({
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
