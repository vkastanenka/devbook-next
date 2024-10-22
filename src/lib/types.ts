export interface Session {
  id: string
  userId: string
}

export interface DecodedSession {
  id: string
  expires: Date
  iat: number
  exp: number
}

export interface User {
  id: string
  name: string
  email: string
  username: string
  image: string
  headline: string
  bio: string | null
}
