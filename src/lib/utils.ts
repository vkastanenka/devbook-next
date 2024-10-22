// utils
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// types
import { AxiosError } from 'axios'
import { ResponseData } from '@/lib/types'

// constants
import { DEFAULT_INTERNAL_SERVER_ERROR_RESPONSE_DATA } from '@/lib/constants'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatServerErrorData = (err: unknown) => {
  const error = err as AxiosError

  // Return axios error if data
  if (error?.response?.data) {
    return error.response.data as ResponseData
  }

  // Return default async error if axios troubles
  return DEFAULT_INTERNAL_SERVER_ERROR_RESPONSE_DATA as ResponseData
}
