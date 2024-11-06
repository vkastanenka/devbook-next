'use server'

// utils
import axios from 'axios'
import { cookies } from 'next/headers'
import { formatServerError } from '@/lib/utils'

// types
import { ServerResponse } from '@/types/server-types'

export const serverGetSessionJwt = async () => {
  const sessionCookie = await cookies().get('session')
  if (sessionCookie?.value) return sessionCookie.value
  return null
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
