// types
import { User } from '@/types/user-types'

export interface GetUserGithubRepoRes {
  data: GetUserGithubRepoResData
  headers: { [key: string]: string }
  status: number
  url: string
}

export interface GetUserGithubRepoResData {
  name: string
  description: string | null
  html_url: string
}

export type GetUserGithubReposRes = (
  | GetUserGithubRepoRes
  | { url: string; success: boolean }
)[]

export interface GetUserSearchResData extends ResData {
  data: User[]
}

export interface GetUsernameResData extends ResData {
  data: User
}

export interface LoginResData extends ResData {
  data: { jwt: string }
}

export interface PatchUserResData extends ResData {
  data: User
}

export interface RegisterResData extends ResData {
  data: User
}

type ResErrors = { [key: string]: string }

export interface ResData {
  success: boolean
  status: number
  message: string
  errors?: ResErrors
}
