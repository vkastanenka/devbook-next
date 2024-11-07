// types
import { Address } from '@/src/types/address-types'
import { AuthSession } from '@/src/types/auth-types'
import { Comment, CommentLike, Post, PostLike } from '@/src/types/post-types'

/**
 * Fields
 */

// User

export type UserName = string
export type UserEmail = string
export type UserUsername = string
export type UserPassword = string
export type UserPhone = string | null
export type UserPronouns = string | null
export type UserImage = string | null
export type UserHeadline = string | null
export type UserBio = string | null
export type UserWebsite = string | null
export type UserResume = string | null
export type UserGithubRepos = string[]
export type UserSkills = string[]
export type UserResetPasswordToken = string | null
export type UserResetPasswordTokenExpires = string | null
export type UserPasswordUpdatedAt = string | null

// UserEducation

export type UserEducationSchool = string
export type UserEducationDegree = string

// UserExperience

export type UserExperienceCompany = string
export type UserExperienceType = string
export type UserExperienceSchedule = string
export type UserExperienceTitle = string
export type UserExperienceDescription = string

/**
 * Models
 */

// User

export enum UserRole {
  'USER',
  'ADMIN',
}

export interface User {
  id: string
  name: UserName
  email: UserEmail
  username: UserUsername
  password: UserPassword
  phone?: UserPhone
  pronouns?: UserPronouns
  image?: UserImage
  headline?: UserHeadline
  bio?: UserBio
  website?: UserWebsite
  resume?: UserResume
  githubRepos: UserGithubRepos
  skills: UserSkills
  role: UserRole
  resetPasswordToken?: UserResetPasswordToken
  resetPasswordTokenExpires?: UserResetPasswordTokenExpires
  passwordUpdatedAt?: UserPasswordUpdatedAt
  createdAt: Date
  updatedAt: Date
  addresses?: Address[]
  comments?: Comment[]
  commentLikes?: CommentLike[]
  contacts?: User[]
  contactsOf?: User[]
  posts?: Post[]
  postLikes?: PostLike[]
  sessions?: AuthSession[]
  userEducations?: UserEducation[]
  userExperiences?: UserExperience[]
}

// UserEducation

export interface UserEducation {
  id: string
  school: UserEducationSchool
  degree: UserEducationDegree
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
  company: UserExperienceCompany
  type: UserExperienceType
  schedule: UserExperienceSchedule
  title: UserExperienceTitle
  description: UserExperienceDescription
  startYear: string
  endYear?: string | null
  createdAt: Date
  updatedAt: Date
  user?: User
  userId: string
}

/**
 * Forms
 */

// User

export interface UserUpdateBioFormData {
  bio?: UserBio
}

export interface UserUpdateDetailsFormData {
  name?: UserName
  email?: string
  pronouns?: UserPronouns
  headline?: UserHeadline
  phone?: UserPhone
  website?: UserWebsite
}

export interface UserUpdateGithubReposFormData {
  githubRepos: UserGithubRepos
}

export interface UserUpdateSkillsFormData {
  skills: UserSkills
}

// UserEducation

export interface UserEducationFormItem {
  school: UserEducationSchool
  degree: UserEducationDegree
  startYear: string
  endYear?: string | null
}

export interface UserCreateUpdateEducationsFormData {
  create: UserEducationFormItem[]
  update: { recordId: string; reqBody: UserEducationFormItem }[]
}

// UserExperience

export interface UserExperienceFormItem {
  company: UserExperienceCompany
  type: UserExperienceType
  schedule: UserExperienceSchedule
  title: UserExperienceTitle
  description: UserExperienceDescription
  startYear: string
  endYear?: string | null
}

export interface UserCreateUpdateExperiencesFormData {
  create: UserExperienceFormItem[]
  update: { recordId: string; reqBody: UserExperienceFormItem }[]
}

/**
 * Request bodies
 */

// User

export interface UserUpdateUserReqBody {
  name?: UserName
  email?: UserEmail
  phone?: UserPhone
  pronouns?: UserPronouns
  image?: UserImage
  headline?: UserHeadline
  bio?: UserBio
  website?: UserWebsite
  resume?: UserResume
  githubRepos?: UserGithubRepos
  skills?: UserSkills
  contacts?: {
    connect?: { id: string }
    disconnect?: { id: string }
  }
}

// UserEducation

export interface UserCreateEducationReqBody {
  school: UserEducationSchool
  degree: UserEducationDegree
  startYear: string
  endYear?: string | null
  userId: string
}

export interface UserUpdateEducationReqBody {
  school?: UserEducationSchool
  degree?: UserEducationDegree
  startYear?: string
  endYear?: string | null
}

// UserExperience

export interface UserCreateExperienceReqBody {
  company: UserExperienceCompany
  type: UserExperienceType
  schedule: UserExperienceSchedule
  title: UserExperienceTitle
  description: UserExperienceDescription
  startYear: string
  endYear?: string | null
  userId: string
}

export interface UserUpdateExperienceReqBody {
  company?: UserExperienceCompany
  type?: UserExperienceType
  schedule?: UserExperienceSchedule
  title?: UserExperienceTitle
  description?: UserExperienceDescription
  startYear?: string
  endYear?: string | null
}
