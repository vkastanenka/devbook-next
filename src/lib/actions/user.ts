'use server'

// types
import {
  GetUserGithubRepositoryResponse,
  GetUserGithubRepositoriesResponse,
} from '@/lib/types'

// utils
import { Octokit } from 'octokit'
import { createTokenAuth } from '@octokit/auth-token'

export const getUserGithubRepositories = async (
  githubRepositories: string[]
): Promise<GetUserGithubRepositoriesResponse> => {
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
        return repositoryResponse as GetUserGithubRepositoryResponse
      } catch {
        return { url: repository, success: false }
      }
    })
  )

  return repositoryResponses
}
