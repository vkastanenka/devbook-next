'use server'

// utils
import axios from 'axios'
import { Octokit } from 'octokit'
import { createTokenAuth } from '@octokit/auth-token'
import {
  decodeSession,
  validateSession,
  getSessionCookieValue,
} from './auth-actions'
import { formatServerErrorData } from '@/lib/utils'

// types
import {
  GetUserGithubRepoRes,
  GetUserGithubReposRes,
  GetUsernameResData,
  GetUserSearchResData,
  ResData,
} from '@/types/server-types'
import { User } from '@/types/user-types'

// constants
import {
  USERS_GET_CURRENT_USER,
  USERS_GET_DEVBOOK_SEARCH,
  USERS_GET_USERNAME,
} from '@/constants/api-endpoint-constants'

/**
 * TODO
 *
 * Async error handling
 * Catch async implementation
 */

// Obtains currently logged in user from session
export const getCurrentUser = async () => {
  // Decode session
  const sessionCookie = await decodeSession()
  if (!sessionCookie) return null

  // Check if session valid, otherwise delete session and cookie
  const isSessionValid = await validateSession(sessionCookie)
  if (!isSessionValid) return null

  // Get session jwt
  const sessionCookieValue = await getSessionCookieValue()
  if (!sessionCookieValue) return null

  // Get the current user
  const url = `${process.env.NEXT_DEVBOOK_API_URL}${USERS_GET_CURRENT_USER}`
  const {
    data: { data },
  } = await axios.get(url, {
    headers: { Authorization: `Bearer ${sessionCookieValue}` },
  })

  return data as User
}

/**
 * TODO
 *
 * Return response as 1 type (include errors)
 * Catch async implementation
 */

export const getUserSearch = async (
  query: string
): Promise<GetUserSearchResData | ResData> => {
  try {
    // Send post request with provided data
    const url = `${process.env.NEXT_DEVBOOK_API_URL}${USERS_GET_DEVBOOK_SEARCH}/${query}`
    const response = await axios.get(url)
    return response.data as GetUserSearchResData
  } catch (err) {
    return formatServerErrorData(err)
  }
}

/**
 * TODO
 *
 * Return response as 1 type (include errors)
 * Catch async implementation
 */

export const getUsername = async (
  username: string,
  data?: {
    include: {
      addresses?: boolean
      userEducations?: boolean
      userExperiences?: boolean
    }
  }
): Promise<GetUsernameResData | ResData> => {
  try {
    // Send post request with provided data
    const url = `${process.env.NEXT_DEVBOOK_API_URL}${USERS_GET_USERNAME}/${username}`
    const response = await axios.post(url, data)
    return response.data as GetUsernameResData
  } catch (err) {
    return formatServerErrorData(err)
  }
}

/**
 * TODO
 *
 * Return response as 1 type (include errors)
 * Catch async implementation
 */

export const getUserGithubRepos = async (
  githubRepositories: string[]
): Promise<GetUserGithubReposRes> => {
  const auth = createTokenAuth(process.env.NEXT_GITHUB_AUTH_TOKEN || '')
  const { token } = await auth()
  const octokit = new Octokit({ auth: token })

  const repositoryResponses = await Promise.all(
    githubRepositories.map(async (repository) => {
      const endpoint = repository.split('.com/')[1]

      try {
        const repositoryResponse = await octokit.request(
          `GET /repos/${endpoint}`
        )
        return repositoryResponse as GetUserGithubRepoRes
      } catch {
        return { url: repository, success: false }
      }
    })
  )

  return repositoryResponses
}