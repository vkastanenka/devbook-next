'use server'

// utils
import axios from 'axios'
import { formatServerError } from '@/lib/utils'

// types
import { SearchDevbookReqBody } from '@/types/search-types'
import { ServerResponse } from '@/types/server-types'
import { User } from '@/types/user-types'

// constants
import { SEARCH_DEVBOOK } from '@/constants/server-endpoint-constants'

// Gets results from Devbook search
export const searchDevbook = async (reqBody: SearchDevbookReqBody) => {
  try {
    const url = `${process.env.NEXT_DEVBOOK_API_URL}${SEARCH_DEVBOOK}`
    const response = await axios.post(url, reqBody)
    return response.data as ServerResponse<User[]>
  } catch (err) {
    return formatServerError(err)
  }
}
