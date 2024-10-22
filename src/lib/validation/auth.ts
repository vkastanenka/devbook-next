import { z } from 'zod'

const nameSchema = z.string().refine((s) => {
  const names = s.split(' ')
  if (names.length === 2) return true
}, 'First and last names are required.')

const emailSchema = z.string().email()

const usernameSchema = z
  .string()
  .min(4, { message: 'Username must be at least 4 characters.' })

const passwordSchema = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters.' })

export const loginSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
  })
  .strict()

export const registerFormSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    username: usernameSchema,
    password: passwordSchema,
  })
  .strict()

export type RegisterFormData = z.infer<typeof registerFormSchema>

export const loginFormSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
  })
  .strict()

export type LoginFormData = z.infer<typeof loginFormSchema>

export const sendResetPasswordTokenSchema = z
  .object({
    email: emailSchema,
  })
  .strict()

export type SendResetPasswordTokenData = z.infer<
  typeof sendResetPasswordTokenSchema
>

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
  })
  .strict()

export type ResetPasswordData = z.infer<typeof resetPasswordSchema>
