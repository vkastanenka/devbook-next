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

export interface UserEducation {
  id: string
  school: string
  degree: string
  startYear?: string | null
  endYear?: string | null
  current: boolean
  createdAt: string
  updatedAt: string
  // user
  userId: string
}

export interface UserExperience {
  id: string
  company: string
  type: string
  schedule: string
  title: string
  startYear?: string | null
  endYear?: string | null
  current: boolean
  description: string
  skills: string[]
  createdAt: string
  updatedAt: string
  // user
  userId: string
  addresses?: Address[]
}

export enum UserRoles {
  'USER',
  'ADMIN',
}
