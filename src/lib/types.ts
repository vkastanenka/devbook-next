export interface Address {
  id: string
  unitNumber: string | null
  streetNumber: string | null
  streetName: string | null
  suburbName: string | null
  stateName: string | null
  country: string | null
  createdAt: string
  updatedAt: string
  // user
  userId: string
  // user experience
  userExperienceId?: string
}

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

export interface GetUserDevbookSearchResponseData extends ResponseData {
  data: User[]
}

export interface GetUsernameResponseData extends ResponseData {
  data: User
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
  phone?: string | null
  pronouns?: string | null
  image: string | null
  headline: string | null
  bio: string | null
  website: string | null
  resume: string | null
  githubRepositories: string[]
  skills: []
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
