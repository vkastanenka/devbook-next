'use server'

// utils
import axios from 'axios'
import { cookies } from 'next/headers'
import { verify as jwtVerify } from 'jsonwebtoken'
import { addDays } from 'date-fns'

// types
import { DecodedSession, User } from '@/lib/types'
import {
  RegisterFormData,
  LoginFormData,
  SendResetPasswordTokenData,
  ResetPasswordData,
} from '@/lib/validation/auth'

// constants
import {
  AUTH_LOGIN,
  AUTH_REGISTER,
  AUTH_RESET_PASSWORD,
  AUTH_SEND_RESET_PASSWORD_TOKEN,
  AUTH_SESSION,
  USERS_GET_CURRENT_USER,
} from '@/lib/api-endpoints'

export const getSessionCookieValue = () => {
  // Get session cookie if value
  const sessionCookie = cookies().get('session')
  if (sessionCookie?.value) return sessionCookie.value
  return null
}

export const decodeSession = async (): Promise<DecodedSession | null> => {
  // Get session cookie
  const sessionCookieValue = getSessionCookieValue()
  if (!sessionCookieValue) return null

  // Decode session cookie
  const decodedSession = await jwtVerify(
    sessionCookieValue,
    process.env.NEXT_JWT_SECRET || ''
  )

  return decodedSession as DecodedSession
}

const deleteSession = async (data: DecodedSession) => {
  // Send delete request to session and delete cookie
  const { id } = data
  const url = `${process.env.NEXT_DEVBOOK_API_URL}${AUTH_SESSION}/${id}`
  await axios.delete(url)
  cookies().delete('session')
}

const validateSession = async (data: DecodedSession) => {
  // Check if session has expired, delete if has
  if (data.expires < new Date()) {
    await deleteSession(data)
    return false
  }
  return true
}

export const getCurrentUser = async () => {
  // Decode session
  const sessionCookie = await decodeSession()
  if (!sessionCookie) return null

  // Check if session valid, otherwise delete session and cookie
  const isSessionValid = await validateSession(sessionCookie)
  if (!isSessionValid) return null

  // Get session jwt
  const sessionCookieValue = getSessionCookieValue()
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

export const register = async (data: RegisterFormData) => {
  // Send post request with provided data
  const url = `${process.env.NEXT_DEVBOOK_API_URL}${AUTH_REGISTER}`
  await axios.post(url, {
    // TODO: Remove after testing done
    id: 'f1bdf45e-1b1c-11ec-9621-0242ac130002',
    ...data,
  })
}

export const login = async (data: LoginFormData) => {
  // Send post request to receive session jwt
  const url = `${process.env.NEXT_DEVBOOK_API_URL}${AUTH_LOGIN}`
  const res = await axios.post(url, data)

  // Set session jwt in a cookie
  const cookieExpires = addDays(new Date(), 1)
  cookies().set('session', res.data.data, {
    httpOnly: true,
    expires: cookieExpires,
  })
}

export const logout = async () => {
  // Decode session jwt
  const sessionCookie = await decodeSession()
  if (!sessionCookie) return null

  // Delete session + session jwt
  deleteSession(sessionCookie)
}

export const sendResetPasswordToken = async (
  data: SendResetPasswordTokenData
) => {
  // Send post request with provided data
  const url = `${process.env.NEXT_DEVBOOK_API_URL}${AUTH_SEND_RESET_PASSWORD_TOKEN}`
  await axios.post(url, data)
}

export const resetPassword = async (
  data: ResetPasswordData,
  resetPasswordToken: string
) => {
  // Send post request with provided data
  const url = `${process.env.NEXT_DEVBOOK_API_URL}${AUTH_RESET_PASSWORD}/${resetPasswordToken}`
  await axios.post(url, data)
}

// export const updateSessionCookie = async (request: NextRequest) => {
//   const sessionCookie = request.cookies.get('session')?.value
//   if (!sessionCookie) return null

//   const decodedJwt = await jwtVerify(
//     sessionCookie.value,
//     process.env.NEXT_JWT_SECRET || '',
//     {
//       algorithms: ['HS256'],
//     }
//   )

//   // Refresh the session so it doesn't expire
//   const parsed = await decrypt(session)
//   parsed.expires = new Date(Date.now() + 10 * 1000)
//   const res = NextResponse.next()
//   res.cookies.set({
//     name: 'session',
//     value: await encrypt(parsed),
//     httpOnly: true,
//     expires: parsed.expires,
//   })
//   return res
// }
