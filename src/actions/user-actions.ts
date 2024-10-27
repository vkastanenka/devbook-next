'use server'

// types
import {
  GetUserGithubRepoRes,
  GetUserGithubReposRes,
} from '@/types/server-types'

// utils
import { Octokit } from 'octokit'
import { createTokenAuth } from '@octokit/auth-token'

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
