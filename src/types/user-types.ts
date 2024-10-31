import { Address } from '@/types/'

export interface User {
  id: string
  name: string
  email: string
  username: string
  password: string
  phone?: string | null
  pronouns?: string | null
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
  createdAt: string
  updatedAt: string
  // attachments: Attachment[]
  addresses?: Address[]
  // comments: Comment[]
  // commentLikes: CommentLike[]
  // posts: Post[]
  // postLikes: PostLike[]
  // sessions: Session[]
  userEducations?: UserEducation[]
  userExperiences?: UserExperience[]
}

export interface UserDataCard {
  isEditable?: boolean
  user: User
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

export enum UserRoles {
  'USER',
  'ADMIN',
}
