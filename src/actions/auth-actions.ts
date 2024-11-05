'use server'

// utils
import axios from 'axios'
import { cookies } from 'next/headers'
import { verify as jwtVerify } from 'jsonwebtoken'
import { addDays } from 'date-fns'
import { formatServerError } from '@/lib/utils'

// types
import {
  AuthLoginReqBody,
  AuthRegisterReqBody,
  AuthResetPasswordReqBody,
  AuthSendResetPasswordTokenReqBody,
  DecodedSession,
} from '@/types/auth-types'
import { ServerResponse } from '@/types/server-types'
import { User } from '@/types/user-types'

// constants
import {
  AUTH_LOGIN,
  AUTH_REGISTER,
  AUTH_SEND_RESET_PASSWORD_TOKEN,
  AUTH_RESET_PASSWORD,
  AUTH_CURRENT_USER_SESSION,
} from '@/constants/server-endpoint-constants'

// Session

// Get session jwt from cookie
export const authGetSessionJwt = async () => {
  const sessionCookie = await cookies().get('session')
  if (sessionCookie?.value) return sessionCookie.value
  return null
}

// Decode session jwt
export const authDecodeSessionJwt =
  async (): Promise<DecodedSession | null> => {
    // Get session jwt
    const sessionJwt = await authGetSessionJwt()

    if (sessionJwt) {
      // Decode session cookie
      const decodedSession = await jwtVerify(
        sessionJwt,
        process.env.NEXT_JWT_SECRET || ''
      )

      return decodedSession as DecodedSession
    }

    return null
  }

// Delete current user session
export const authDeleteCurrentUserSession = async (recordId: string) => {
  try {
    const url = `${process.env.NEXT_DEVBOOK_API_URL}${AUTH_CURRENT_USER_SESSION}/${recordId}`
    const axiosResponse = await axios.delete(url)
    return axiosResponse.data as ServerResponse
  } catch (err) {
    formatServerError(err)
  }
}

// Authorization

// Create session and set jwt cookie
export const authLogin = async (reqBody: AuthLoginReqBody) => {
  try {
    // Send post request to receive session jwt
    const url = `${process.env.NEXT_DEVBOOK_API_URL}${AUTH_LOGIN}`
    const axiosResponse = await axios.post(url, reqBody)
    const serverResponse = axiosResponse.data as ServerResponse<{ jwt: string }>

    // Set session jwt in a cookie
    const cookieExpires = addDays(new Date(), 1)
    await cookies().set('session', serverResponse.data?.jwt || '', {
      httpOnly: true,
      expires: cookieExpires,
    })

    // Return successful response data
    return serverResponse
  } catch (err) {
    return formatServerError(err)
  }
}

// Register new user
export const authRegister = async (reqBody: AuthRegisterReqBody) => {
  try {
    const url = `${process.env.NEXT_DEVBOOK_API_URL}${AUTH_REGISTER}`
    const response = await axios.post(url, reqBody)
    return response.data as ServerResponse<User>
  } catch (err) {
    return formatServerError(err)
  }
}

// Send password reset link to email
export const authSendResetPasswordToken = async (
  reqBody: AuthSendResetPasswordTokenReqBody
) => {
  try {
    const url = `${process.env.NEXT_DEVBOOK_API_URL}${AUTH_SEND_RESET_PASSWORD_TOKEN}`
    const response = await axios.post(url, reqBody)
    return response.data as ServerResponse
  } catch (err) {
    return formatServerError(err)
  }
}

// Reset user password with token
export const resetPassword = async (
  resetPasswordToken: string,
  reqBody: AuthResetPasswordReqBody
) => {
  try {
    const url = `${process.env.NEXT_DEVBOOK_API_URL}${AUTH_RESET_PASSWORD}/${resetPasswordToken}`
    const response = await axios.patch(url, reqBody)
    return response.data as ServerResponse
  } catch (err) {
    return formatServerError(err)
  }
}

// Delete session cookie and session record
export const logout = async () => {
  const sessionJwt = await authGetSessionJwt()
  if (!sessionJwt) return null

  await cookies().delete('session')

  return await authDeleteCurrentUserSession(sessionJwt)
}
