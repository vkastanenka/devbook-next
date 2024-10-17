'use server'

// utils
import axios from 'axios'
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'

// types
import { Session } from '@/lib/types'

// constants
import { AUTH_SESSIONS, AUTH_LOGIN } from '@/lib/api-endpoints'

export const getSessionById = async ({ id }: { id: string }) => {
  try {
    const url = `${process.env.NEXT_DEVBOOK_API_URL}${AUTH_SESSIONS}/${id}`
    const { data } = await axios.get(url)
    return data as Session
  } catch (error) {
    console.log(error)
  }
}

export const getSessionCookie = async (): Promise<any | null> => {
  const sessionCookie = cookies().get('session')

  if (!sessionCookie?.value) return null

  const jwtSecret = new TextEncoder().encode(process.env.NEXT_JWT_SECRET)
  const { payload } = await jwtVerify(sessionCookie.value, jwtSecret, {
    algorithms: ['HS256'],
  })

  return payload as { id: string; iat: number }
}

export const login = async (loginData: { email: string; password: string }) => {
  try {
    const url = `${process.env.NEXT_DEVBOOK_API_URL}${AUTH_LOGIN}`
    const res = await axios.post(url, loginData)

    // Set cookie using encrypted JWT fetched from api (TODO: add proper expiration)
    cookies().set('session', res.data, { httpOnly: true })
  } catch (error) {
    // TODO: Learn how to handle errors
    console.log(error)
  }
}

// export const logout = async ({ id }: { id: string }) => {
//   try {
//     const sessionCookie = await getSessionCookie()
//     const url = `${process.env.NEXT_DEVBOOK_API_URL}${AUTH_SESSIONS}/${id}`
//     await axios.delete(url)
//     cookies().delete('session')
//   } catch (error) {
//     console.log(error)
//   }
// }
