// types
import { Address, UserDetailsFormDataAddress } from '@/types/'
import { Comment, CommentLike, Post, PostLike } from '@/types/post-types'
import { Session } from '@/types/auth-types'

export interface User {
  id: string
  name: string
  email: string
  username: string
  password: string
  phone: string | null
  pronouns: string | null
  image: string | null
  headline: string | null
  bio: string | null
  website: string | null
  resume: string | null
  githubRepositories: string[]
  skills: string[]
  role: UserRoles
  resetPasswordToken: string | null
  resetPasswordTokenExpires: string | null
  passwordUpdatedAt: string | null
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

export interface UserBioFormData {
  bio: string | null
}

export interface UserDetailsFormData {
  name: string
  email: string
  pronouns: string | null
  headline: string | null
  phone: string | null
  website: string | null
  streetNumber?: string
  streetName?: string
  suburb?: string
  state?: string
  country?: string
}

export interface UserDetailsReqBody {
  name: string
  email: string
  pronouns: string | null
  headline: string | null
  phone: string | null
  website: string | null
  addresses?: {
    update?: {
      where: {
        id: string
      }
      data: UserDetailsFormDataAddress
    }
    create?: UserDetailsFormDataAddress[]
  }
}

export interface UserProfileCard {
  isCurrentUser?: boolean
  isEditable?: boolean
  user: User
}

export interface UserDetailsCard extends UserProfileCard {
  currentUser: User
  isContact?: boolean
}

export interface UserEducation extends UserEducationsFormItem {
  id: string
  createdAt: string
  updatedAt: string
  userId?: string
}

export interface UserEducationsFormItem {
  school: string
  degree: string
  startYear: string
  endYear?: string | null
}

export type UserEducationsFormItems = (UserEducation | UserEducationsFormItem)[]

export interface UserEducationsFormData {
  userEducations?: UserEducationsFormItems
}

export interface CreateUserEducationsReqBody {
  userEducations: { create: UserEducationsFormItem[] }
}

export interface UpdateUserEducationsReqBody {
  userEducations: {
    update: {
      where: {
        id: string
      }
      data: UserEducation
    }
  }
}

export interface UserExperience extends UserExperiencesFormItem {
  id: string
  createdAt: string
  updatedAt: string
  userId?: string
}

export interface UserExperiencesFormItem {
  company: string
  type: string
  schedule: string
  title: string
  startYear: string
  endYear?: string | null
  description: string
}

export type UserExperiencesFormItems = (
  | UserExperience
  | UserExperiencesFormItem
)[]

export interface UserExperiencesFormData {
  userExperiences?: UserExperiencesFormItems
}

export interface CreateUserExperiencesReqBody {
  userExperiences: { create: UserExperiencesFormItem[] }
}

export interface UpdateUserExperiencesReqBody {
  userExperiences: {
    update: {
      where: {
        id: string
      }
      data: UserExperience
    }
  }
}

export interface UserGithubReposFormData {
  githubRepositories: string[]
}

export enum UserRoles {
  'USER',
  'ADMIN',
}

export interface UserSkillsFormData {
  skills: string[]
}

export interface UserEditContactReqBody {
  contacts: {
    connect?: { id: string }
    disconnect?: { id: string }
  }
}
