// validation
import { z } from 'zod'
import {
  emailSchema,
  phoneSchema,
  urlSchema,
  startYearSchema,
  endYearSchema,
} from '@/validation/shared-validation'

/**
 * Fields
 */

// User

export const userNameSchema = z
  .string()
  .min(3, { message: '3 character(s) min' })
  .max(100, { message: '100 character(s) max' })
  .refine((s) => {
    const names = s.split(' ')
    if (names.length === 2) return true
  }, 'First and last names are required.')

export const userUsernameSchema = z
  .string()
  .min(4, { message: '4 character(s) min' })
  .max(15, { message: '15 character(s) max' })
  .refine((s) => {
    const spaces = s.split(' ')
    if (spaces.length === 1) return true
  }, 'No spaces allowed.')

export const userPasswordSchema = z
  .string()
  .min(8, { message: '8 character(s) min' })
  .max(100, { message: '100 character(s) max' })

const userPhoneSchema = phoneSchema.nullable()

const userPronounsSchema = z
  .union([
    z.literal('he/him'),
    z.literal('she/her'),
    z.literal('they/them'),
    z.literal('other'),
  ])
  .nullable()

const userHeadlineSchema = z
  .string()
  .min(2, { message: '2 character(s) min' })
  .max(50, {
    message: '50 character(s) max',
  })
  .nullable()

const userBioSchema = z
  .string()
  .min(10, { message: '10 character(s) min' })
  .max(5000, {
    message: '5000 character(s) max',
  })
  .nullable()

const userWebsiteSchema = urlSchema.nullable()

const userGithubReposSchema = z.array(urlSchema)

const userSkillSchema = z
  .string()
  .min(1, { message: '1 character(s) min' })
  .max(30, {
    message: '30 character(s) max',
  })

const userSkillsSchema = z.array(userSkillSchema)

// UserEducation

const userEducationSchoolSchema = z
  .string()
  .min(1, { message: '1 character(s) min' })
  .max(100, {
    message: '100 character(s) max',
  })

const userEducationDegreeSchema = z
  .string()
  .min(1, { message: '1 character(s) min' })
  .max(100, {
    message: '100 character(s) max',
  })

// User experience

const userExperienceCompanySchema = z
  .string()
  .min(1, { message: '1 character(s) min' })
  .max(100, {
    message: '100 character(s) max',
  })

const userExperienceTypeSchema = z.union([
  z.literal('Contract'),
  z.literal('Permanent'),
])

const userExperienceScheduleSchema = z.union([
  z.literal('Full-time'),
  z.literal('Part-time'),
])

const userExperienceTitleSchema = z
  .string()
  .min(1, { message: '1 character(s) min' })
  .max(100, {
    message: '100 character(s) max',
  })

const userExperienceDescriptionSchema = z
  .string()
  .min(10, { message: '10 character(s) min' })
  .max(5000, {
    message: '5000 character(s) max',
  })

/**
 * Forms
 */

export const userBioFormSchema = z
  .object({
    bio: userBioSchema,
  })
  .strict()

/**
 * Request bodies
 */

export const userUpdateUserReqBodySchema = z
  .object({
    name: userNameSchema.optional(),
    email: emailSchema.optional(),
    pronouns: userPronounsSchema.optional(),
    headline: userHeadlineSchema.optional(),
    phone: userPhoneSchema.optional(),
    website: userWebsiteSchema.optional(),
    bio: userBioSchema.optional(),
    githubRepos: userGithubReposSchema.optional(),
    skills: userSkillsSchema.optional(),
  })
  .strict()

export const userCreateEducationReqBodySchema = z
  .object({
    school: userEducationSchoolSchema,
    degree: userEducationDegreeSchema,
    startYear: startYearSchema,
    endYear: endYearSchema.nullable(),
    userId: z.string(),
  })
  .strict()
  .refine((s) => {
    if (s.endYear) {
      if (Number(s.endYear) > Number(s.startYear)) return false
    }
    return true
  }, 'End year cannot be greater than start year')

export const userUpdateEducationReqBodySchema = z
  .object({
    school: userEducationSchoolSchema.optional(),
    degree: userEducationDegreeSchema.optional(),
    startYear: startYearSchema.optional(),
    endYear: endYearSchema.nullable().optional(),
  })
  .strict()
  .refine((s) => {
    if (s.endYear) {
      if (Number(s.endYear) > Number(s.startYear)) return false
    }
    return true
  }, 'End year cannot be greater than start year')

export const userCreateExperienceReqBodySchema = z
  .object({
    company: userExperienceCompanySchema,
    type: userExperienceTypeSchema,
    schedule: userExperienceScheduleSchema,
    title: userExperienceTitleSchema,
    description: userExperienceDescriptionSchema,
    startYear: startYearSchema,
    endYear: endYearSchema.nullable(),
    userId: z.string(),
  })
  .strict()
  .refine((s) => {
    if (s.endYear) {
      if (Number(s.endYear) > Number(s.startYear)) return false
    }
    return true
  }, 'End year cannot be greater than start year')

export const userUpdateExperienceReqBodySchema = z
  .object({
    company: userExperienceCompanySchema.optional(),
    type: userExperienceTypeSchema.optional(),
    schedule: userExperienceScheduleSchema.optional(),
    title: userExperienceTitleSchema.optional(),
    description: userExperienceDescriptionSchema.optional(),
    startYear: startYearSchema.optional(),
    endYear: endYearSchema.nullable().optional(),
  })
  .strict()
  .refine((s) => {
    if (s.endYear) {
      if (Number(s.endYear) > Number(s.startYear)) return false
    }
    return true
  }, 'End year cannot be greater than start year')
