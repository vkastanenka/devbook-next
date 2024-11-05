// types
import { Address } from '@/types/address-types'
import { CommentLike, Post, PostLike } from '@/types/post-types'
import { Session } from '@/types/auth-types'

// validation
import { z } from 'zod'
import { userValidation } from '@/validation/user'

// User

export type UserUpdateUserReqBody = z.infer<
  typeof userValidation.userUpdateUserReqBodySchema
>

// UserEducation

export type UserCreateEducationReqBody = z.infer<
  typeof userValidation.userCreateEducationReqBodySchema
>

export type UserUpdateEducationReqBody = z.infer<
  typeof userValidation.userUpdateEducationReqBodySchema
>

// UserExperience

export type UserCreateExperienceReqBody = z.infer<
  typeof userValidation.userCreateExperienceReqBodySchema
>

export type UserUpdateExperienceReqBody = z.infer<
  typeof userValidation.userUpdateExperienceReqBodySchema
>

// User

export enum UserRole {
  'USER',
  'ADMIN',
}

export interface User {
  id: string
  name: string
  email: string
  username: string
  password: string
  phone?: string | null
  pronouns?: string | null
  image?: string | null
  headline?: string | null
  bio?: string | null
  website?: string | null
  resume?: string | null
  githubRepos: string[]
  skills: string[]
  role: UserRole
  resetPasswordToken?: string | null
  resetPasswordTokenExpires?: string | null
  passwordUpdatedAt?: string | null
  createdAt: Date
  updatedAt: Date
  addresses?: Address[]
  comments?: Comment[]
  commentLikes?: CommentLike[]
  contacts?: User[]
  contactsOf?: User[]
  posts?: Post[]
  postLikes?: PostLike[]
  sessions?: Session[]
  userEducations?: UserEducation[]
  userExperiences?: UserExperience[]
}

// UserEducation

export interface UserEducation {
  id: string
  school: string
  degree: string
  startYear: string
  endYear?: string | null
  createdAt: Date
  updatedAt: Date
  user?: User
  userId: string
}

// UserExperience

export interface UserExperience {
  id: string
  company: string
  type: string
  schedule: string
  title: string
  startYear: string
  endYear?: string | null
  createdAt: Date
  updatedAt: Date
  user?: User
  userId: string
}
