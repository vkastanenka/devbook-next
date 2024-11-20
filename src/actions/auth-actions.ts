'use server'

// actions
import { serverDecodeSessionJwt } from '@/src/actions/server-actions'
import { serverRequestServer } from '@/src/actions/server-actions'

// utils
import axios from 'axios'
import { cookies } from 'next/headers'
import { addDays } from 'date-fns'
import { formatServerError } from '@/src/lib/utils'
import { redirect } from 'next/navigation'

// types
import {
  AuthLoginReqBody,
  AuthRegisterReqBody,
  AuthResetPasswordReqBody,
  AuthUpdatePasswordReqBody,
  AuthSendResetPasswordTokenReqBody,
} from '@vkastanenka/devbook-types/dist/auth'
import { ServerResponse } from '@vkastanenka/devbook-types/dist/server'
import { User } from '@vkastanenka/devbook-types/dist/user'

// constants
import {
  AUTH_LOGIN,
  AUTH_REGISTER,
  AUTH_SEND_RESET_PASSWORD_TOKEN,
  AUTH_RESET_PASSWORD,
  AUTH_UPDATE_PASSWORD,
  AUTH_CURRENT_USER_SESSION,
} from '@/src/constants/server-endpoint-constants'

// Session

// Delete current user session
export const authDeleteCurrentUserSession = async (recordId: string) => {
  return await serverRequestServer({
    endpoint: `${AUTH_CURRENT_USER_SESSION}/${recordId}`,
    method: 'delete',
  })
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
    await cookies().set(
      process.env.NEXT_SESSION_JWT_COOKIE_NAME || '',
      serverResponse.data?.jwt || '',
      {
        httpOnly: true,
        expires: cookieExpires,
      }
    )

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
export const authResetPassword = async (
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

// Update user password with
export const authUpdatePassword = async (
  reqBody: AuthUpdatePasswordReqBody
) => {
  return await serverRequestServer<undefined, AuthUpdatePasswordReqBody>({
    data: reqBody,
    endpoint: `${AUTH_UPDATE_PASSWORD}`,
    method: 'patch',
  })
}

// Delete session cookie and session record
export const authLogout = async () => {
  let response
  const session = await serverDecodeSessionJwt()

  if (session) {
    response = await authDeleteCurrentUserSession(session.id)

    if (response.success) {
      await cookies().delete(process.env.NEXT_SESSION_JWT_COOKIE_NAME || '')
      redirect('/')
    }

    return response
  }

  redirect('/')
}
