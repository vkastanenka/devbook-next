'use server'

// utils
import axios from 'axios'
import { cookies } from 'next/headers'
import { verify as jwtVerify } from 'jsonwebtoken'
import { addDays } from 'date-fns'
import { formatServerErrorData } from '@/lib/utils'

// types
import { DecodedSession } from '@/types/auth-types'
import { LoginResData, RegisterResData, ResData } from '@/types/server-types'

import {
  RegisterFormData,
  LoginFormData,
  SendResetPasswordTokenFormData,
  ResetPasswordFormData,
} from '@/validation/auth'

// constants
import {
  AUTH_LOGIN,
  AUTH_REGISTER,
  AUTH_RESET_PASSWORD,
  AUTH_SEND_RESET_PASSWORD_TOKEN,
  AUTH_SESSION,
} from '@/constants/api-endpoint-constants'

// Get session jwt from cookie
export const getSessionCookieValue = async () => {
  // Get session cookie if value
  const sessionCookie = await cookies().get('session')
  if (sessionCookie?.value) return sessionCookie.value
  return null
}

// Decode session jwt
export const decodeSession = async (): Promise<DecodedSession | null> => {
  // Get session cookie
  const sessionCookieValue = await getSessionCookieValue()
  if (!sessionCookieValue) return null

  // Decode session cookie
  const decodedSession = await jwtVerify(
    sessionCookieValue,
    process.env.NEXT_JWT_SECRET || ''
  )

  return decodedSession as DecodedSession
}

/**
 * TODO
 *
 * Async error handling
 * Catch async implementation
 */

// Deletes current user session and session cookie
export const deleteSession = async (data: DecodedSession) => {
  // Send delete request to session and delete cookie
  const { id } = data
  const url = `${process.env.NEXT_DEVBOOK_API_URL}${AUTH_SESSION}/${id}`
  await axios.delete(url)
  await cookies().delete('session')
}

// Checks if session is still valid
export const validateSession = async (data: DecodedSession) => {
  // Check if session has expired, delete if has
  if (data.expires < new Date()) {
    await deleteSession(data)
    return false
  }
  return true
}

/**
 * TODO
 *
 * Remove user id
 * Return response as 1 type (include errors)
 * Catch async implementation
 */

// Creates new user record
export const register = async (data: RegisterFormData) => {
  try {
    // Send post request with provided data
    const url = `${process.env.NEXT_DEVBOOK_API_URL}${AUTH_REGISTER}`
    const response = await axios.post(url, {
      // TODO: Remove after testing done
      id: 'f1bdf45e-1b1c-11ec-9621-0242ac130002',
      ...data,
    })
    return response.data as RegisterResData
  } catch (err) {
    return formatServerErrorData(err)
  }
}

/**
 * TODO
 *
 * Return response as 1 type (include errors)
 * Catch async implementation
 */

// Create session and set jwt cookie
export const login = async (data: LoginFormData) => {
  try {
    // Send post request to receive session jwt
    const url = `${process.env.NEXT_DEVBOOK_API_URL}${AUTH_LOGIN}`
    const response = await axios.post(url, data)
    const responseData: LoginResData = response.data

    // Set session jwt in a cookie
    const cookieExpires = addDays(new Date(), 1)
    await cookies().set('session', responseData.data.jwt, {
      httpOnly: true,
      expires: cookieExpires,
    })

    // Return successful response data
    return responseData
  } catch (err) {
    return formatServerErrorData(err)
  }
}

/**
 * TODO
 *
 * Async error handling
 * Catch async implementation
 */

// Delete session cookie and session record - TODO: Async error handling
export const logout = async () => {
  // Decode session jwt
  const sessionCookie = await decodeSession()
  if (!sessionCookie) return null

  // Delete session + session jwt
  await deleteSession(sessionCookie)
}

/**
 * TODO
 *
 * Return response as 1 type (include errors)
 * Catch async implementation
 */

// Send password reset link to email
export const sendResetPasswordToken = async (
  data: SendResetPasswordTokenFormData
) => {
  try {
    // Send post request with provided data
    const url = `${process.env.NEXT_DEVBOOK_API_URL}${AUTH_SEND_RESET_PASSWORD_TOKEN}`
    const response = await axios.post(url, data)
    return response.data as ResData
  } catch (err) {
    return formatServerErrorData(err)
  }
}

/**
 * TODO
 *
 * Return response as 1 type (include errors)
 * Catch async implementation
 */

// Reset user password with token
export const resetPassword = async (
  data: ResetPasswordFormData,
  resetPasswordToken: string
) => {
  try {
    // Send post request with provided data
    const url = `${process.env.NEXT_DEVBOOK_API_URL}${AUTH_RESET_PASSWORD}/${resetPasswordToken}`
    const response = await axios.patch(url, data)
    return response.data as ResData
  } catch (err) {
    return formatServerErrorData(err)
  }
}
