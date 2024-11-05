// types
import { User } from '@/types/user-types'

// validation
import { z } from 'zod'
import { authValidation } from '@/validation/auth'

// Authorization

export type AuthLoginReqBody = z.infer<
  typeof authValidation.authLoginReqBodySchema
>

export type AuthRegisterReqBody = z.infer<
  typeof authValidation.authRegisterReqBodySchema
>

export type AuthSendResetPasswordTokenReqBody = z.infer<
  typeof authValidation.authSendResetPasswordTokenReqBodySchema
>

export type AuthResetPasswordReqBody = z.infer<
  typeof authValidation.authResetPasswordReqBodySchema
>

// Session

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
