'use server'

// utils
import axios from 'axios'
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'

// types
import { Session } from '@/lib/types'

// constants
import { AUTH_SESSIONS, AUTH_LOGIN, AUTH_REGISTER } from '@/lib/api-endpoints'

export const getSessionCookie = async (): Promise<{
  id: string
  iat: number
} | null> => {
  const sessionCookie = cookies().get('session')

  if (!sessionCookie?.value) return null

  const jwtSecret = new TextEncoder().encode(process.env.NEXT_JWT_SECRET)
  const { payload } = await jwtVerify(sessionCookie.value, jwtSecret, {
    algorithms: ['HS256'],
  })

  return payload as { id: string; iat: number }
}

// export async function updateSession(request: NextRequest) {
//   const session = request.cookies.get('session')?.value
//   if (!session) return

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

export const getSessionById = async ({ id }: { id: string }) => {
  try {
    const url = `${process.env.NEXT_DEVBOOK_API_URL}${AUTH_SESSIONS}/${id}`
    const { data } = await axios.get(url)
    return data as Session
  } catch (error) {
    console.log(error)
  }
}

export const register = async (data: {
  name: string
  username: string
  email: string
  password: string
}) => {
  try {
    const url = `${process.env.NEXT_DEVBOOK_API_URL}${AUTH_REGISTER}`
    await axios.post(url, {
      id: 'f1bdf45e-1b1c-11ec-9621-0242ac130002',
      ...data,
    })
  } catch (error) {
    // TODO: Learn how to handle errors
    console.log(error)
  }
}

export const login = async (data: { email: string; password: string }) => {
  try {
    const url = `${process.env.NEXT_DEVBOOK_API_URL}${AUTH_LOGIN}`
    const res = await axios.post(url, data)

    // Set cookie using encrypted JWT fetched from api (TODO: add proper expiration)
    cookies().set('session', res.data, { httpOnly: true })
  } catch (error) {
    // TODO: Learn how to handle errors
    console.log(error)
  }
}

export const logout = async () => {
  try {
    const sessionCookie = await getSessionCookie()

    if (sessionCookie) {
      const { id } = sessionCookie
      const url = `${process.env.NEXT_DEVBOOK_API_URL}${AUTH_SESSIONS}/${id}`
      await axios.delete(url)
      cookies().delete('session')
    }
  } catch (error) {
    console.log(error)
  }
}
