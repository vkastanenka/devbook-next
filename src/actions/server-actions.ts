'use server'

// utils
import axios from 'axios'
import jsonwebtoken from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { formatServerError } from '@/src/lib/utils'

// types
import { AuthSession } from '@vkastanenka/devbook-types/dist/auth'
import { ServerResponse } from '@vkastanenka/devbook-types/dist/server'

export const serverGetSessionJwt = async () => {
  const sessionCookie = await cookies().get(
    process.env.NEXT_SESSION_JWT_COOKIE_NAME || ''
  )
  if (sessionCookie?.value) return sessionCookie.value
  return null
}

export const serverDecodeSessionJwt = async () => {
  const sessionJwt = await serverGetSessionJwt()
  if (!sessionJwt) return null

  const decodedSession = (await jsonwebtoken.verify(
    sessionJwt,
    process.env.NEXT_SESSION_JWT_SECRET || ''
  )) as jsonwebtoken.JwtPayload

  return decodedSession as AuthSession
}

export const serverRequestServer = async <
  T = object | undefined,
  S = object | undefined
>({
  data,
  method,
  endpoint,
}: {
  data?: S
  method: 'get' | 'post' | 'patch' | 'delete'
  endpoint: string
}) => {
  try {
    // Get session jwt
    const sessionJwt = await serverGetSessionJwt()

    // Read the current user
    const { data: resData } = await axios({
      data,
      method,
      url: `${process.env.NEXT_DEVBOOK_API_URL}${endpoint}`,
      headers: { Authorization: `Bearer ${sessionJwt}` },
    })

    return resData as ServerResponse<T>
  } catch (err) {
    return formatServerError(err)
  }
}
