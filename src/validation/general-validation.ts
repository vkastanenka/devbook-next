// validation
import { z } from 'zod'
import validator from 'validator'

/**
 * Inputs
 */

export const emailSchema = z.string().email()

export const phoneSchema = z.string().refine(validator.isMobilePhone)

export const urlSchema = z.string().refine(validator.isURL)

export const startYearSchema = z
  .string()
  .min(4, { message: '4 character(s) min' })
  .max(4, {
    message: '4 character(s) max',
  })
  .refine((s) => {
    const newDate = new Date()
    const newDateYear = newDate.getFullYear()
    if (Number(s) <= newDateYear) return true
  }, 'Start year cannot be greater than current year')

export const endYearSchema = z
  .string()
  .min(4, { message: '4 character(s) min' })
  .max(4, {
    message: '4 character(s) max',
  })
  .refine((s) => {
    const newDate = new Date()
    const newDateYear = newDate.getFullYear()
    if (Number(s) <= newDateYear) return true
  }, 'End year cannot be greater than current year')
