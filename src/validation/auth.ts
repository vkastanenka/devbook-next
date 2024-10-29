import { z } from 'zod'

const nameSchema = z.string().refine((s) => {
  const names = s.split(' ')
  if (names.length === 2) return true
}, 'First and last names are required.')

export const emailSchema = z.string().email()

const usernameSchema = z
  .string()
  .min(4, { message: 'Username must be at least 4 characters.' })

const passwordSchema = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters.' })

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

export const sendResetPasswordTokenFormSchema = z
  .object({
    email: emailSchema,
  })
  .strict()

export type SendResetPasswordTokenFormData = z.infer<
  typeof sendResetPasswordTokenFormSchema
>

export const resetPasswordFormSchema = z
  .object({
    password: passwordSchema,
  })
  .strict()

export type ResetPasswordFormData = z.infer<typeof resetPasswordFormSchema>
