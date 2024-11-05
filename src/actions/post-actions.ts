'use server'

// utils
import axios from 'axios'
import { formatServerError } from '@/lib/utils'

// types
import { ServerResponse } from '@/types/server-types'
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
  try {
    const url = `${process.env.NEXT_DEVBOOK_API_URL}${POSTS_CURRENT_USER_COMMENT}`
    const axiosResponse = await axios.post(url, reqBody)
    return axiosResponse.data as ServerResponse<Comment>
  } catch (err) {
    formatServerError(err)
  }
}

// Update current user comment
export const postUpdateCurrentUserComment = async (
  recordId: string,
  reqBody: PostUpdateCommentReqBody
) => {
  try {
    const url = `${process.env.NEXT_DEVBOOK_API_URL}${POSTS_CURRENT_USER_COMMENT}/${recordId}`
    const axiosResponse = await axios.patch(url, reqBody)
    return axiosResponse.data as ServerResponse<Comment>
  } catch (err) {
    formatServerError(err)
  }
}

// Delete current user comment
export const postDeleteCurrentUserComment = async (recordId: string) => {
  try {
    const url = `${process.env.NEXT_DEVBOOK_API_URL}${POSTS_CURRENT_USER_COMMENT}/${recordId}`
    const axiosResponse = await axios.delete(url)
    return axiosResponse.data as ServerResponse
  } catch (err) {
    formatServerError(err)
  }
}

// CommentLike

// Create current user comment like
export const postCreateCurrentUserCommentLike = async (
  reqBody: PostCreateCommentLikeReqBody
) => {
  try {
    const url = `${process.env.NEXT_DEVBOOK_API_URL}${POSTS_CURRENT_USER_COMMENT_LIKE}`
    const axiosResponse = await axios.post(url, reqBody)
    return axiosResponse.data as ServerResponse<CommentLike>
  } catch (err) {
    formatServerError(err)
  }
}

// Delete current user comment like
export const postDeleteCurrentUserCommentLike = async (recordId: string) => {
  try {
    const url = `${process.env.NEXT_DEVBOOK_API_URL}${POSTS_CURRENT_USER_COMMENT_LIKE}/${recordId}`
    const axiosResponse = await axios.delete(url)
    return axiosResponse.data as ServerResponse
  } catch (err) {
    formatServerError(err)
  }
}

// Post

// Create current user post
export const postCreateCurrentUserPost = async (
  reqBody: PostCreatePostReqBody
) => {
  try {
    const url = `${process.env.NEXT_DEVBOOK_API_URL}${POSTS_CURRENT_USER_POST}`
    const axiosResponse = await axios.post(url, reqBody)
    return axiosResponse.data as ServerResponse<Comment>
  } catch (err) {
    formatServerError(err)
  }
}

// Update current user post
export const postUpdateCurrentUserPost = async (
  recordId: string,
  reqBody: PostUpdatePostReqBody
) => {
  try {
    const url = `${process.env.NEXT_DEVBOOK_API_URL}${POSTS_CURRENT_USER_POST}/${recordId}`
    const axiosResponse = await axios.patch(url, reqBody)
    return axiosResponse.data as ServerResponse<Post>
  } catch (err) {
    formatServerError(err)
  }
}

// Delete current user post
export const postDeleteCurrentUserPost = async (recordId: string) => {
  try {
    const url = `${process.env.NEXT_DEVBOOK_API_URL}${POSTS_CURRENT_USER_POST}/${recordId}`
    const axiosResponse = await axios.delete(url)
    return axiosResponse.data as ServerResponse
  } catch (err) {
    formatServerError(err)
  }
}

// PostLike

// Create current user post like
export const postCreateCurrentUserPostLike = async (
  reqBody: PostCreatePostLikeReqBody
) => {
  try {
    const url = `${process.env.NEXT_DEVBOOK_API_URL}${POSTS_CURRENT_USER_POST_LIKE}`
    const axiosResponse = await axios.post(url, reqBody)
    return axiosResponse.data as ServerResponse<PostLike>
  } catch (err) {
    formatServerError(err)
  }
}

// Delete current user post like
export const postDeleteCurrentUserPostLike = async (recordId: string) => {
  try {
    const url = `${process.env.NEXT_DEVBOOK_API_URL}${POSTS_CURRENT_USER_POST_LIKE}/${recordId}`
    const axiosResponse = await axios.delete(url)
    return axiosResponse.data as ServerResponse
  } catch (err) {
    formatServerError(err)
  }
}
