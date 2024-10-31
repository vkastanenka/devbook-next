// utils
import { z } from 'zod'
import validator from 'validator'

// types
import { emailSchema } from '@/validation/auth'
import {
  UserEducation,
  UserEducationsFormData,
  UserEducationsFormItem,
  UserExperience,
  UserExperiencesFormData,
  UserExperiencesFormItem,
  UserDetailsFormData,
  UserBioFormData,
} from '@/types/user-types'

/**
 * Form Inputs
 */

const bioSchema = z
  .string()
  .min(10, { message: 'Minimum 10 characters.' })
  .max(1000, {
    message: 'Maximum 1000 characters.',
  })
  .nullable()

const countrySchema = z
  .string()
  .min(2, { message: 'Minimum 2 characters.' })
  .max(50, {
    message: 'Maximum 50 characters.',
  })
  .optional()

const headlineSchema = z
  .string()
  .min(2, { message: 'Minimum 2 characters.' })
  .max(50, {
    message: 'Maximum 50 characters.',
  })
  .nullable()

const phoneSchema = z.string().refine(validator.isMobilePhone).nullable()

const pronounsSchema = z.string().nullable()

const stateSchema = z
  .string()
  .min(2, { message: 'Minimum 2 characters.' })
  .max(50, {
    message: 'Maximum 50 characters.',
  })
  .optional()

const streetNameSchema = z
  .string()
  .min(2, { message: 'Minimum 2 characters.' })
  .max(50, {
    message: 'Maximum 50 characters.',
  })
  .optional()

const streetNumberSchema = z
  .string()
  .min(2, { message: 'Minimum 2 characters.' })
  .max(50, {
    message: 'Maximum 50 characters.',
  })
  .optional()

const suburbSchema = z
  .string()
  .min(2, { message: 'Minimum 2 characters.' })
  .max(50, {
    message: 'Maximum 50 characters.',
  })
  .optional()

const websiteSchema = z.string().refine(validator.isURL).nullable()

export const nameSchema = z.string().refine((s) => {
  const names = s.split(' ')
  if (names.length === 2) return true
}, 'First and last names are required.')

/**
 * Forms
 */

export const bioFormSchema: z.ZodType<UserBioFormData> = z.object({
  bio: bioSchema,
})

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

export const userEducationsFormItemSchema: z.ZodType<UserEducationsFormItem> =
  z.object({
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
  })

export const userEducationSchema: z.ZodType<UserEducation> = z
  .object({
    id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    userId: z.string().optional(),
  })
  .and(userEducationsFormItemSchema)

export const userEducationsFormSchema: z.ZodType<UserEducationsFormData> =
  z.object({
    userEducations: z.array(
      z.union([userEducationSchema, userEducationsFormItemSchema])
    ),
  })

export const userExperiencesFormItemSchema: z.ZodType<UserExperiencesFormItem> =
  z.object({
    company: z
      .string()
      .min(1, { message: 'School must be at least 1 character.' })
      .max(100, {
        message: 'School must not be longer than 100 characters.',
      }),
    type: z
      .string()
      .min(1, { message: 'Degree must be at least 1 character.' })
      .max(100, {
        message: 'Degree must not be longer than 100 characters.',
      }),
    schedule: z.string(),
    title: z.string(),
    description: z
      .string()
      .min(1, { message: 'Description must be at least 1 character.' })
      .max(1000, {
        message: 'Description must not be longer than 1000 characters.',
      }),
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
  })

export const userExperienceSchema: z.ZodType<UserExperience> = z
  .object({
    id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    userId: z.string().optional(),
  })
  .and(userExperiencesFormItemSchema)

export const userExperiencesFormSchema: z.ZodType<UserExperiencesFormData> =
  z.object({
    userExperiences: z.array(
      z.union([userExperienceSchema, userExperiencesFormItemSchema])
    ),
  })

export const userDetailsFormSchema: z.ZodType<UserDetailsFormData> = z.object({
  name: nameSchema,
  email: emailSchema,
  pronouns: pronounsSchema,
  headline: headlineSchema,
  phone: phoneSchema,
  website: websiteSchema,
  streetNumber: streetNumberSchema,
  streetName: streetNameSchema,
  suburb: suburbSchema,
  state: stateSchema,
  country: countrySchema,
})
