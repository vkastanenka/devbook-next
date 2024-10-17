'use server'

// utils
import axios from 'axios'

// types
import { User } from '@/lib/types'

// constants
import { USERS_GET_USER_BY_ID } from '@/lib/api-endpoints'

export const getUserById = async ({ id }: { id: string }) => {
  try {
    const url = `${process.env.NEXT_DEVBOOK_API_URL}${USERS_GET_USER_BY_ID}/${id}`
    const { data } = await axios.get(url)
    return data as User
  } catch (error) {
    console.log(error)
  }
}
