// utils
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// types
import { AxiosError } from 'axios'
import { ServerResponse } from '@/types/server-types'
import { HttpStatusCode } from '@/types/http-status-code'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Formats error received from our server
export const formatServerError = (err: unknown) => {
  const error = err as AxiosError

  // Return axios error if data
  if (error?.response?.data) {
    return error.response.data as ServerResponse
  }

  // Return default async error if axios troubles
  return {
    message: 'Internal server error!',
    status: 'error',
    statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    success: false,
  } as ServerResponse
}

export const formatText = (text: string) => {
  return text.split('\n').map((line, i) => {
    if (line === '') {
      return <div key={i} />
    }

    return (
      <p className="p" key={i}>
        {line}
      </p>
    )
  })
}
