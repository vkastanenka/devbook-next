// utils
import { z } from 'zod'
import validator from 'validator'

// types
import { emailSchema } from '@/validation/auth'

const bioSchema = z
  .string()
  .min(10, { message: 'Bio must be at least 10 characters.' })
  .max(1000, {
    message: 'Bio must not be longer than 1000 characters.',
  })
  .nullable()

const countrySchema = z.string().nullable()

const headlineSchema = z
  .string()
  .min(3, { message: 'Headling must be at least 3 characters.' })
  .max(50, {
    message: 'Headline must be no longer than 50 characters.',
  })
  .nullable()

const phoneSchema = z.string().refine(validator.isMobilePhone).nullable()

const pronounsSchema = z.string().nullable()

const stateNameSchema = z.string().nullable()

const streetNameSchema = z.string().nullable()

const streetNumberSchema = z.string().nullable()

const suburbNameSchema = z.string().nullable()

const websiteSchema = z.string().refine(validator.isURL).nullable()

const unitNumberSchema = z.string().nullable()

export const nameSchema = z.string().refine((s) => {
  const names = s.split(' ')
  if (names.length === 2) return true
}, 'First and last names are required.')

export const bioFormSchema = z
  .object({
    bio: bioSchema,
  })
  .strict()

export type BioFormData = z.infer<typeof bioFormSchema>

export const githubReposFormSchema = z.object({
  githubRepositories: z.array(
    z
      .string()
      .min(5, { message: 'Repo URL must be at least 5 characters.' })
      .max(100, {
        message: 'Repo URL must not be longer than 100 characters.',
      })
  ),
})

export type GithubReposFormData = z.infer<typeof githubReposFormSchema>

export const userFormSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    pronouns: pronounsSchema,
    headline: headlineSchema,
    phone: phoneSchema,
    website: websiteSchema,
    unitNumber: unitNumberSchema,
    streetNumber: streetNumberSchema,
    streetName: streetNameSchema,
    suburbName: suburbNameSchema,
    stateName: stateNameSchema,
    country: countrySchema,
    // image
    // resume
  })
  .strict()

export type UserFormData = z.infer<typeof userFormSchema>

export const userFormReqBodySchema = z.object({
  name: nameSchema,
  email: emailSchema,
  pronouns: pronounsSchema,
  headline: headlineSchema,
  phone: phoneSchema,
  website: websiteSchema,
  addresses: z
    .object({
      update: z
        .object({
          where: z.object({ id: z.string() }),
          data: z.object({
            unitNumber: unitNumberSchema,
            streetNumber: streetNumberSchema,
            streetName: streetNameSchema,
            suburbName: suburbNameSchema,
            stateName: stateNameSchema,
            country: countrySchema,
          }),
        })
        .optional(),
      create: z
        .array(
          z.object({
            unitNumber: unitNumberSchema,
            streetNumber: streetNumberSchema,
            streetName: streetNameSchema,
            suburbName: suburbNameSchema,
            stateName: stateNameSchema,
            country: countrySchema,
          })
        )
        .optional(),
    })
    .optional(),
})

export type UserFormReqBodySchema = z.infer<typeof userFormReqBodySchema>
