'use server'

// utils
import axios from 'axios'
import { Octokit } from 'octokit'
import { createTokenAuth } from '@octokit/auth-token'
import {
  authGetSessionJwt,
  authDecodeSessionJwt,
  authDeleteCurrentUserSession,
} from '@/actions/auth-actions'
import { formatServerError } from '@/lib/utils'

// types
import {
  ServerResponse,
  ReadGithubRepoServerResponse,
} from '@/types/server-types'
import {
  User,
  UserCreateEducationReqBody,
  UserCreateExperienceReqBody,
  UserEducation,
  UserExperience,
  UserUpdateEducationReqBody,
  UserUpdateExperienceReqBody,
  UserUpdateUserReqBody,
} from '@/types/user-types'
import { HttpStatusCode } from '@/types/http-status-code'

// constants
import {
  USERS_USERNAME,
  USERS_CURRENT_USER,
  USERS_CURRENT_USER_EDUCATION,
  USERS_CURRENT_USER_EXPERIENCE,
} from '@/constants/server-endpoint-constants'

// Username

// Reads user based on username
export const readUsername = async (username: string) => {
  try {
    const url = `${process.env.NEXT_DEVBOOK_API_URL}${USERS_USERNAME}/${username}`
    const response = await axios.get(url)
    return response.data as ServerResponse<User>
  } catch (err) {
    return formatServerError(err)
  }
}

// Current user

// Obtains currently logged in user from session
export const readCurrentUser = async () => {
  // Decode session jwt
  const decodedSession = await authDecodeSessionJwt()
  if (!decodedSession) return null

  // Check if session valid, otherwise delete session and cookie
  if (decodedSession.expires < new Date()) {
    return await authDeleteCurrentUserSession(decodedSession.id)
  }

  // Get session jwt
  const sessionCookieValue = await authGetSessionJwt()
  if (!sessionCookieValue) return null

  // Get the current user
  const url = `${process.env.NEXT_DEVBOOK_API_URL}${USERS_CURRENT_USER}`
  const {
    data: { data },
  } = await axios.get(url, {
    headers: { Authorization: `Bearer ${sessionCookieValue}` },
  })

  return data as User
}

// Update current user
export const updateCurrentUser = async (
  recordId: string,
  reqBody: UserUpdateUserReqBody
) => {
  try {
    const url = `${process.env.NEXT_DEVBOOK_API_URL}${USERS_CURRENT_USER}/${recordId}`
    const axiosResponse = await axios.patch(url, reqBody)
    return axiosResponse.data as ServerResponse<User>
  } catch (err) {
    formatServerError(err)
  }
}

// UserEducation

// Create current user education
export const createCurrentUserEducation = async (
  reqBody: UserCreateEducationReqBody
) => {
  try {
    const url = `${process.env.NEXT_DEVBOOK_API_URL}${USERS_CURRENT_USER_EDUCATION}`
    const axiosResponse = await axios.post(url, reqBody)
    return axiosResponse.data as ServerResponse<UserEducation>
  } catch (err) {
    formatServerError(err)
  }
}

// Update current user education
export const updateCurrentUserEducation = async (
  recordId: string,
  reqBody: UserUpdateEducationReqBody
) => {
  try {
    const url = `${process.env.NEXT_DEVBOOK_API_URL}${USERS_CURRENT_USER_EDUCATION}/${recordId}`
    const axiosResponse = await axios.patch(url, reqBody)
    return axiosResponse.data as ServerResponse<UserEducation>
  } catch (err) {
    formatServerError(err)
  }
}

// Delete current user education
export const deleteCurrentUserEducation = async (recordId: string) => {
  try {
    const url = `${process.env.NEXT_DEVBOOK_API_URL}${USERS_CURRENT_USER_EDUCATION}/${recordId}`
    const axiosResponse = await axios.delete(url)
    return axiosResponse.data as ServerResponse
  } catch (err) {
    formatServerError(err)
  }
}

// UserExperience

// Create current user education
export const createCurrentUserExperience = async (
  reqBody: UserCreateExperienceReqBody
) => {
  try {
    const url = `${process.env.NEXT_DEVBOOK_API_URL}${USERS_CURRENT_USER_EXPERIENCE}`
    const axiosResponse = await axios.post(url, reqBody)
    return axiosResponse.data as ServerResponse<UserExperience>
  } catch (err) {
    formatServerError(err)
  }
}

// Update current user education
export const updateCurrentUserExperience = async (
  recordId: string,
  reqBody: UserUpdateExperienceReqBody
) => {
  try {
    const url = `${process.env.NEXT_DEVBOOK_API_URL}${USERS_CURRENT_USER_EXPERIENCE}/${recordId}`
    const axiosResponse = await axios.patch(url, reqBody)
    return axiosResponse.data as ServerResponse<UserExperience>
  } catch (err) {
    formatServerError(err)
  }
}

// Delete current user education
export const deleteCurrentUserExperience = async (recordId: string) => {
  try {
    const url = `${process.env.NEXT_DEVBOOK_API_URL}${USERS_CURRENT_USER_EXPERIENCE}/${recordId}`
    const axiosResponse = await axios.delete(url)
    return axiosResponse.data as ServerResponse
  } catch (err) {
    formatServerError(err)
  }
}

// Github repositories

// Gets user github repos
export const readUserGithubRepos = async (
  githubRepositories: string[]
): Promise<ReadGithubRepoServerResponse[]> => {
  // Setup octokit
  const auth = createTokenAuth(process.env.NEXT_GITHUB_AUTH_TOKEN || '')
  const { token } = await auth()
  const octokit = new Octokit({ auth: token })

  // Obtain repositories / errors
  const repoResponses = await Promise.all(
    githubRepositories.map(async (repository) => {
      const endpoint = repository.split('.com/')[1]

      try {
        const repositoryResponse = await octokit.request(
          `GET /repos/${endpoint}`
        )
        return repositoryResponse as ReadGithubRepoServerResponse
      } catch {
        return {
          status: HttpStatusCode.INTERNAL_SERVER_ERROR,
          success: false,
          type: 'error',
          url: 'http:localhost:3000/feed',
        }
      }
    })
  )

  return repoResponses
}
