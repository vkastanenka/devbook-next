import { HttpStatusCode } from '@/src/types/http-status-code'

// Devbook

export interface ServerResponse<Data = undefined> {
  errors?: { [key: string]: string }
  data?: Data
  message: string
  status: 'success' | 'fail' | 'error'
  statusCode: HttpStatusCode
  success: boolean
}

// Github

export interface ReadGithubRepoServerResponse {
  data?: GithubRepo[]
  headers?: { [key: string]: string }
  status: number
  success?: boolean
  type?: string
  url: string
}

export interface GithubRepo {
  name: string
  description: string | null
  html_url: string
}
