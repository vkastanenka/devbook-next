// utils
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// types
import { AxiosError } from 'axios'
import { HttpStatusCode } from '@vkastanenka/devbook-types/dist'
import { ServerResponse } from '@vkastanenka/devbook-types/dist/server'

// Object for providing meaningful errors
export const appError = ({
  message,
  statusCode,
}: {
  message: string
  statusCode: HttpStatusCode
}): ServerResponse => ({
  message,
  status: 'error',
  statusCode,
  success: false,
})

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
  return appError({
    message: 'Internal server error!',
    statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
  })
}

export const constrainText = (characterLimit: number, text: string): string => {
  if (text.length > characterLimit) {
    return `${text.slice(0, characterLimit)}...`
  }

  return text
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

export const formatUserInitials = (userName: string): string => {
  const userNameSplit = userName.toUpperCase().split(' ')
  return `${userNameSplit[0][0]}${userNameSplit[1][0]}`
}
