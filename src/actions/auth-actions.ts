'use server'

// utils
import axios from 'axios'
import { cookies } from 'next/headers'
import { verify as jwtVerify } from 'jsonwebtoken'
import { addDays } from 'date-fns'
import { formatServerErrorData } from '@/lib/utils'

// types
import { DecodedSession } from '@/types/auth-types'
import {
  GetUserSearchResData,
  GetUsernameResData,
  LoginResData,
  RegisterResData,
  ResData,
} from '@/types/server-types'
import { User } from '@/types/user-types'
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
  USERS_GET_CURRENT_USER,
  USERS_GET_DEVBOOK_SEARCH,
  USERS_GET_USERNAME,
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

// Delete session cookie and record - TODO: Async error handling
const deleteSession = async (data: DecodedSession) => {
  // Send delete request to session and delete cookie
  const { id } = data
  const url = `${process.env.NEXT_DEVBOOK_API_URL}${AUTH_SESSION}/${id}`
  await axios.delete(url)
  await cookies().delete('session')
}

// Checks if session is still valid
const validateSession = async (data: DecodedSession) => {
  // Check if session has expired, delete if has
  if (data.expires < new Date()) {
    await deleteSession(data)
    return false
  }
  return true
}

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

// Delete session cookie and session record - TODO: Async error handling
export const logout = async () => {
  // Decode session jwt
  const sessionCookie = await decodeSession()
  if (!sessionCookie) return null

  // Delete session + session jwt
  await deleteSession(sessionCookie)
}

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

// Obtains currently logged in user from session - TODO: Async error handling
export const getCurrentUser = async () => {
  // Decode session
  const sessionCookie = await decodeSession()
  if (!sessionCookie) return null

  // Check if session valid, otherwise delete session and cookie
  const isSessionValid = await validateSession(sessionCookie)
  if (!isSessionValid) return null

  // Get session jwt
  const sessionCookieValue = await getSessionCookieValue()
  if (!sessionCookieValue) return null

  // Get the current user
  const url = `${process.env.NEXT_DEVBOOK_API_URL}${USERS_GET_CURRENT_USER}`
  const {
    data: { data },
  } = await axios.get(url, {
    headers: { Authorization: `Bearer ${sessionCookieValue}` },
  })

  return data as User
}

export const getUserDevbookSearch = async (
  query: string
): Promise<GetUserSearchResData | ResData> => {
  try {
    // Send post request with provided data
    const url = `${process.env.NEXT_DEVBOOK_API_URL}${USERS_GET_DEVBOOK_SEARCH}/${query}`
    const response = await axios.get(url)
    return response.data as GetUserSearchResData
  } catch (err) {
    return formatServerErrorData(err)
  }
}

export const getUsername = async (
  username: string,
  data?: {
    include: {
      addresses?: boolean
      userEducations?: boolean
      userExperiences?: boolean
    }
  }
): Promise<GetUsernameResData | ResData> => {
  try {
    // Send post request with provided data
    const url = `${process.env.NEXT_DEVBOOK_API_URL}${USERS_GET_USERNAME}/${username}`
    const response = await axios.post(url, data)
    return response.data as GetUsernameResData
  } catch (err) {
    return formatServerErrorData(err)
  }
}
