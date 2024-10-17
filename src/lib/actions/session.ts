'use server'

// utils
import axios from 'axios'

// types
import { Session } from '@/lib/types'

// constants
import { SESSIONS_GET_SESSION_BY_ID } from '@/lib/api-endpoints'

export const getSessionById = async ({ id }: { id: string }) => {
  try {
    const url = `${process.env.NEXT_DEVBOOK_API_URL}${SESSIONS_GET_SESSION_BY_ID}/${id}`
    const { data } = await axios.get(url)
    return data as Session
  } catch (error) {
    console.log(error)
  }
}
