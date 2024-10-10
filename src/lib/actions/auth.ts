'use server'

import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

const secretKey = 'secret'
const key = new TextEncoder().encode(secretKey)

const loginRoute = `${process.env.NEXT_DEVBOOK_API_URL}/auth/login`

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('10 sec from now')
    .sign(key)
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256'],
  })
  return payload
}

export const login = async (loginData: { email: string; password: string }) => {
  try {
    // Verify credentials && get the user
    const res = await axios.post(loginRoute, loginData)

    // Set cookie using encrypted JWT fetched from api (TODO: add proper expiration)
    cookies().set('session', res.data, { httpOnly: true })
  } catch (error) {
    // TODO: Learn how to handle errors
    console.log(error)
  }
}

export async function logout() {
  // Destroy the session
  cookies().set('session', '', { expires: new Date(0) })
}

export async function getSession() {
  const session = cookies().get('session')?.value
  if (!session) return null
  return session
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get('session')?.value
  if (!session) return

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session)
  parsed.expires = new Date(Date.now() + 10 * 1000)
  const res = NextResponse.next()
  res.cookies.set({
    name: 'session',
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  })
  return res
}
