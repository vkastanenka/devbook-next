'use server'

// utils
import { serverRequestServer } from '@/actions/server-actions'

// types
import { SearchDevbookReqBody } from '@/types/search-types'
import { User } from '@/types/user-types'

// constants
import { SEARCH_DEVBOOK } from '@/constants/server-endpoint-constants'

// Gets results from Devbook search
export const searchDevbook = async (reqBody: SearchDevbookReqBody) => {
  return await serverRequestServer<User[], SearchDevbookReqBody>({
    data: reqBody,
    endpoint: SEARCH_DEVBOOK,
    method: 'post',
  })
}
