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

export const skillsFormSchema = z.object({
  skills: z.array(
    z
      .string()
      .min(1, { message: 'Skill must be at least 1 character.' })
      .max(30, {
        message: 'Skill must not be longer than 30 characters.',
      })
  ),
})

export type SkillsFormData = z.infer<typeof skillsFormSchema>

export const userEducationSchema = z.object({
  id: z.string().optional(),
  school: z
    .string()
    .min(1, { message: 'School must be at least 1 character.' })
    .max(100, {
      message: 'School must not be longer than 100 characters.',
    }),
  degree: z
    .string()
    .min(1, { message: 'Degree must be at least 1 character.' })
    .max(100, {
      message: 'Degree must not be longer than 100 characters.',
    }),
  current: z.boolean().optional().nullable(),
  startYear: z
    .string()
    .min(4, { message: 'Start year must be at least 4 characters.' })
    .max(4, {
      message: 'Start year must not be longer than 4 characters.',
    }),
  endYear: z
    .string()
    .min(4, { message: 'End year must be at least 4 characters.' })
    .max(4, {
      message: 'End year must not be longer than 4 characters.',
    })
    .nullable(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  userId: z.string().optional(),
})

export type UserEducationData = z.infer<typeof userEducationSchema>

export const userEducationsFormSchema = z.object({
  userEducations: z.array(userEducationSchema),
})

export type UserEducationsFormData = z.infer<typeof userEducationsFormSchema>

export const userEducationsFormReqBodySchemaCreates = z
  .object({
    userEducations: z.object({
      create: z.array(userEducationSchema).optional(),
    }),
  })
  .optional()

export type UserEducationsFormReqBodyDataCreates = z.infer<
  typeof userEducationsFormReqBodySchemaCreates
>

export const userEducationsFormReqBodySchemaUpdates = z
  .array(
    z
      .object({
        userEducations: z.object({
          update: z.object({
            where: z.object({
              id: z.string().optional(),
            }),
            data: userEducationSchema,
          }),
        }),
      })
      .optional()
  )
  .optional()

export type UserEducationsFormReqBodyDataUpdates = z.infer<
  typeof userEducationsFormReqBodySchemaUpdates
>

export const userEducationsFormReqBodySchema = z
  .object({
    creates: userEducationsFormReqBodySchemaCreates,
    updates: userEducationsFormReqBodySchemaUpdates,
  })
  .optional()

export type UserEducationsFormReqBodyData = z.infer<
  typeof userEducationsFormReqBodySchema
>

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
