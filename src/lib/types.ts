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

type ResponseErrors = { [key: string]: string }

export interface ResponseData {
  success: boolean
  status: number
  message: string
  errors?: ResponseErrors
}

export interface LoginResponseData extends ResponseData {
  data: { jwt: string }
}

export interface RegisterResponseData extends ResponseData {
  data: User
}

export interface GetManyUsersResponseData extends ResponseData {
  data: User[]
}

export enum PostType {
  DEFAULT,
  EVENT,
  ARTICLE,
}

export interface Post {
  id: string
  body: string
  postType: PostType
  // user
  // userId
  createdAt: Date
  updatedAt: Date
  // attachments
  // postComments
  // postLikes
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
