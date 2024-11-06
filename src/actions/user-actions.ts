'use server'

// utils
import { Octokit } from 'octokit'
import { createTokenAuth } from '@octokit/auth-token'
import { serverRequestServer } from '@/actions/server-actions'

// types
import { ReadGithubRepoServerResponse } from '@/types/server-types'
import {
  User,
  UserCreateCurrentUserEducationReqBody,
  UserUpdateEducationReqBody,
  UserCreateCurrentUserExperienceReqBody,
  UserUpdateExperienceReqBody,
  UserEducation,
  UserExperience,
  UserUpdateCurrentUserReqBody,
} from '@/types/user-types'
import { HttpStatusCode } from '@/types/http-status-code'
import { Prisma } from '@vkastanenka/devbook-prisma'

// constants
import {
  USERS_USERNAME,
  USERS_CURRENT_USER,
  USERS_CURRENT_USER_EDUCATION,
  USERS_CURRENT_USER_EXPERIENCE,
} from '@/constants/server-endpoint-constants'

interface UserRelationQueryReqBody {
  include?: Prisma.UserInclude
}

// Username

// Reads user based on username
export const userReadUsername = async (
  reqId: string,
  reqBody?: UserRelationQueryReqBody
) => {
  return await serverRequestServer<User, UserRelationQueryReqBody>({
    data: reqBody,
    endpoint: `${USERS_USERNAME}/${reqId}`,
    method: 'post',
  })
}

// Current user

// Obtains currently logged in user from session
export const userReadCurrentUser = async (reqBody?: {
  include?: Prisma.UserInclude
}) => {
  return await serverRequestServer<User, UserRelationQueryReqBody>({
    data: reqBody,
    endpoint: USERS_CURRENT_USER,
    method: 'post',
  })
}

// Update current user
export const userUpdateCurrentUser = async (
  recordId: string,
  reqBody: UserUpdateCurrentUserReqBody
) => {
  return await serverRequestServer<User, UserUpdateCurrentUserReqBody>({
    data: reqBody,
    endpoint: `${USERS_CURRENT_USER}/${recordId}`,
    method: 'patch',
  })
}

// UserEducation

// Create current user education
export const userCreateCurrentUserEducation = async (
  reqBody: UserCreateCurrentUserEducationReqBody
) => {
  return await serverRequestServer<UserEducation, UserCreateCurrentUserEducationReqBody>({
    data: reqBody,
    endpoint: `${USERS_CURRENT_USER_EDUCATION}`,
    method: 'post',
  })
}

// Update current user education
export const userUpdateCurrentUserEducation = async (
  recordId: string,
  reqBody: UserUpdateEducationReqBody
) => {
  return await serverRequestServer<UserEducation, UserUpdateEducationReqBody>({
    data: reqBody,
    endpoint: `${USERS_CURRENT_USER_EDUCATION}/${recordId}`,
    method: 'patch',
  })
}

// Delete current user education
export const userDeleteCurrentUserEducation = async (recordId: string) => {
  return await serverRequestServer({
    endpoint: `${USERS_CURRENT_USER_EDUCATION}/${recordId}`,
    method: 'delete',
  })
}

// UserExperience

// Create current user experience
export const userCreateCurrentUserExperience = async (
  reqBody: UserCreateCurrentUserExperienceReqBody
) => {
  return await serverRequestServer<UserExperience, UserCreateCurrentUserExperienceReqBody>(
    {
      data: reqBody,
      endpoint: `${USERS_CURRENT_USER_EXPERIENCE}`,
      method: 'post',
    }
  )
}

// Update current user experience
export const userUpdateCurrentUserExperience = async (
  recordId: string,
  reqBody: UserUpdateExperienceReqBody
) => {
  return await serverRequestServer<UserExperience, UserUpdateExperienceReqBody>(
    {
      data: reqBody,
      endpoint: `${USERS_CURRENT_USER_EXPERIENCE}/${recordId}`,
      method: 'patch',
    }
  )
}

// Delete current user experience
export const userDeleteCurrentUserExperience = async (recordId: string) => {
  return await serverRequestServer({
    endpoint: `${USERS_CURRENT_USER_EXPERIENCE}/${recordId}`,
    method: 'delete',
  })
}

// Github repositories

// Gets user github repos
export const userReadCurrentUserGithubRepos = async (
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
