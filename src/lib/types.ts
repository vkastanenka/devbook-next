export interface Session {
  id: string
  userId: string
}

// TODO: Sync types between projects
export interface DecodedSession {
  id: string
  expires: Date
  iat: number
  exp: number
}

export enum UserRoles {
  'USER',
  'ADMIN',
}

export interface User {
  id: string
  name: string
  email: string
  username: string
  password: string
  emailVerified: string | null
  image: string | null
  headline: string | null
  bio: string | null
  role: UserRoles
  resetPasswordToken: string | null
  resetPasswordTokenExpires: string | null
  passwordUpdatedAt: string | null
  createdAt: string
  updatedAt: string
}
