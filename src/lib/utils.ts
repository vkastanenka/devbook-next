// utils
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// types
import { AxiosError } from 'axios'
import { ResData } from '@/types/server-types'

// constants
import { DEFAULT_INTERNAL_SERVER_ERROR_RESPONSE_DATA } from '@/constants/server-constants'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * TODO
 * 
 * Catch async error handling
 */

export const formatServerErrorData = (err: unknown) => {
  const error = err as AxiosError

  // Return axios error if data
  if (error?.response?.data) {
    return error.response.data as ResData
  }

  // Return default async error if axios troubles
  return DEFAULT_INTERNAL_SERVER_ERROR_RESPONSE_DATA as ResData
}
