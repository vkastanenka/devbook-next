// validation
import { z } from 'zod'
import { emailSchema } from '@/validation/'
import {
  userNameSchema,
  userUsernameSchema,
  userPasswordSchema,
} from '@/validation/user'

/**
 * Request bodies
 */

export const authLoginReqBodySchema = z
  .object({
    email: emailSchema,
    password: userPasswordSchema,
  })
  .strict()

export const authRegisterReqBodySchema = z
  .object({
    name: userNameSchema,
    email: emailSchema,
    username: userUsernameSchema,
    password: userPasswordSchema,
  })
  .strict()

export const authSendResetPasswordTokenReqBodySchema = z
  .object({
    email: emailSchema,
  })
  .strict()

export const authResetPasswordReqBodySchema = z
  .object({
    password: userPasswordSchema,
  })
  .strict()

export const authValidation = {
  authLoginReqBodySchema,
  authRegisterReqBodySchema,
  authSendResetPasswordTokenReqBodySchema,
  authResetPasswordReqBodySchema,
}
