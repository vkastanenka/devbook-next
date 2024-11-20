import {
  UserName,
  UserUsername,
  UserPassword,
  UserPhone,
  UserPronouns,
  UserHeadline,
  UserBio,
  UserWebsite,
  UserGithubRepos,
  UserSkills,
  UserEducationSchool,
  UserEducationDegree,
  UserExperienceCompany,
  UserExperienceType,
  UserExperienceSchedule,
  UserExperienceTitle,
  UserExperienceDescription,
  UserUpdateBioFormData,
  UserUpdateDetailsFormData,
  UserUpdateGithubReposFormData,
  UserUpdateSkillsFormData,
  UserEducationFormItem,
  UserCreateUpdateEducationsFormData,
  UserExperienceFormItem,
  UserCreateUpdateExperiencesFormData,
} from '@/src/types/user-types'

// validation
import { z } from 'zod'
import {
  emailSchema,
  phoneSchema,
  urlSchema,
  startYearSchema,
  endYearSchema,
} from '@/src/validation/general-validation'

/**
 * Fields
 */

// User

export const userNameSchema: z.ZodType<UserName> = z
  .string()
  .min(3, { message: '3 character(s) min' })
  .max(100, { message: '100 character(s) max' })
  .refine((s) => {
    const names = s.split(' ')
    if (names.length === 2) return true
  }, 'First and last names are required.')

export const userUsernameSchema: z.ZodType<UserUsername> = z
  .string()
  .min(4, { message: '4 character(s) min' })
  .max(15, { message: '15 character(s) max' })
  .refine((s) => {
    const spaces = s.split(' ')
    if (spaces.length === 1) return true
  }, 'No spaces allowed.')

export const userPasswordSchema: z.ZodType<UserPassword> = z
  .string()
  .min(8, { message: '8 character(s) min' })
  .max(100, { message: '100 character(s) max' })

const userPhoneSchema: z.ZodType<UserPhone> = phoneSchema.nullable()

const userPronounsSchema: z.ZodType<UserPronouns> = z.string().nullable()

const userHeadlineSchema: z.ZodType<UserHeadline> = z
  .string()
  .min(2, { message: '2 character(s) min' })
  .max(50, {
    message: '50 character(s) max',
  })
  .nullable()

const userBioSchema: z.ZodType<UserBio> = z
  .string()
  .min(10, { message: '10 character(s) min' })
  .max(5000, {
    message: '5000 character(s) max',
  })
  .nullable()

const userWebsiteSchema: z.ZodType<UserWebsite> = urlSchema.nullable()

const userGithubReposSchema: z.ZodType<UserGithubRepos> = z.array(urlSchema)

const userSkillSchema: z.ZodType<string> = z
  .string()
  .min(1, { message: '1 character(s) min' })
  .max(30, {
    message: '30 character(s) max',
  })

const userSkillsSchema: z.ZodType<UserSkills> = z.array(userSkillSchema)

// UserEducation

const userEducationSchoolSchema: z.ZodType<UserEducationSchool> = z
  .string()
  .min(1, { message: '1 character(s) min' })
  .max(100, {
    message: '100 character(s) max',
  })

const userEducationDegreeSchema: z.ZodType<UserEducationDegree> = z
  .string()
  .min(1, { message: '1 character(s) min' })
  .max(100, {
    message: '100 character(s) max',
  })

// User experience

const userExperienceCompanySchema: z.ZodType<UserExperienceCompany> = z
  .string()
  .min(1, { message: '1 character(s) min' })
  .max(100, {
    message: '100 character(s) max',
  })

const userExperienceTypeSchema: z.ZodType<UserExperienceType> = z.union([
  z.literal('Contract'),
  z.literal('Permanent'),
])

const userExperienceScheduleSchema: z.ZodType<UserExperienceSchedule> = z.union(
  [z.literal('Full-time'), z.literal('Part-time')]
)

const userExperienceTitleSchema: z.ZodType<UserExperienceTitle> = z
  .string()
  .min(1, { message: '1 character(s) min' })
  .max(100, {
    message: '100 character(s) max',
  })

const userExperienceDescriptionSchema: z.ZodType<UserExperienceDescription> = z
  .string()
  .min(10, { message: '10 character(s) min' })
  .max(5000, {
    message: '5000 character(s) max',
  })

/**
 * Forms
 */

// User

export const userUpdateBioFormSchema: z.ZodType<UserUpdateBioFormData> = z
  .object({
    bio: userBioSchema.optional(),
  })
  .strict()

export const userUpdateDetailsFormSchema: z.ZodType<UserUpdateDetailsFormData> =
  z
    .object({
      name: userNameSchema.optional(),
      email: emailSchema.optional(),
      pronouns: userPronounsSchema.nullable().optional(),
      headline: userHeadlineSchema.nullable().optional(),
      phone: userPhoneSchema.nullable().optional(),
      website: userWebsiteSchema.nullable().optional(),
    })
    .strict()

export const userUpdateGithubReposFormSchema: z.ZodType<UserUpdateGithubReposFormData> =
  z
    .object({
      githubRepos: userGithubReposSchema,
    })
    .strict()

export const userUpdateSkillsFormSchema: z.ZodType<UserUpdateSkillsFormData> = z
  .object({
    skills: userSkillsSchema,
  })
  .strict()

// UserEducation

export const userEducationFormItemSchema: z.ZodType<UserEducationFormItem> = z
  .object({
    school: userEducationSchoolSchema,
    degree: userEducationDegreeSchema,
    startYear: startYearSchema,
    endYear: endYearSchema.nullable().optional(),
  })
  .strict()
  .refine((s) => {
    if (s.endYear) {
      if (Number(s.startYear) > Number(s.endYear)) return false
    }
    return true
  }, 'Start year cannot be greater than end year')

export const userCreateUpdateEducationsFormSchema: z.ZodType<UserCreateUpdateEducationsFormData> =
  z.object({
    create: z.array(userEducationFormItemSchema),
    update: z
      .array(
        z.object({ recordId: z.string(), reqBody: userEducationFormItemSchema })
      )
      .optional(),
  })

export const userExperienceFormItemSchema: z.ZodType<UserExperienceFormItem> = z
  .object({
    company: userExperienceCompanySchema,
    type: userExperienceTypeSchema,
    schedule: userExperienceScheduleSchema,
    title: userExperienceTitleSchema,
    description: userExperienceDescriptionSchema,
    startYear: startYearSchema,
    endYear: endYearSchema.nullable().optional(),
  })
  .strict()
  .refine((s) => {
    if (s.endYear) {
      if (Number(s.startYear) > Number(s.endYear)) return false
    }
    return true
  }, 'Start year cannot be greater than end year')

export const userCreateUpdateExperiencesFormSchema: z.ZodType<UserCreateUpdateExperiencesFormData> =
  z.object({
    create: z.array(userExperienceFormItemSchema),
    update: z
      .array(
        z.object({
          recordId: z.string(),
          reqBody: userExperienceFormItemSchema,
        })
      )
      .optional(),
  })
