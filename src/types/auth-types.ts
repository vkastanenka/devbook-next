import { User } from '@/types/user-types'

export interface DecodedSession {
  id: string
  expires: Date
  iat: number
  exp: number
}

export interface Session {
  id: string
  expires: Date
  createdAt: Date
  updatedAt: Date
  user?: User
  userId: string
}
