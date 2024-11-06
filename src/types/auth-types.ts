// types
import { User } from '@/types/user-types'

// validation
import { z } from 'zod'
import {
  authLoginReqBodySchema,
  authRegisterReqBodySchema,
  authSendResetPasswordTokenReqBodySchema,
  authResetPasswordReqBodySchema,
} from '@/validation/auth-validation'

// Authorization

export type AuthLoginReqBody = z.infer<typeof authLoginReqBodySchema>

export type AuthRegisterReqBody = z.infer<typeof authRegisterReqBodySchema>

export type AuthSendResetPasswordTokenReqBody = z.infer<
  typeof authSendResetPasswordTokenReqBodySchema
>

export type AuthResetPasswordReqBody = z.infer<
  typeof authResetPasswordReqBodySchema
>

// Session

export interface Session {
  id: string
  expires: Date
  createdAt: Date
  updatedAt: Date
  user?: User
  userId: string
}
