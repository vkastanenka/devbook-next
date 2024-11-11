'use server'

// utils
import { serverRequestServer } from '@/src/actions/server-actions'

// types
import { SearchDevbookReqBody } from '@/src/types/search-types'
import { User } from '@/src/types/user-types'

// constants
import { SEARCH_DEVBOOK } from '@/src/constants/server-endpoint-constants'

// Gets results from Devbook search
export const searchDevbook = async (reqBody: SearchDevbookReqBody) => {
  return await serverRequestServer<User[], SearchDevbookReqBody>({
    data: reqBody,
    endpoint: SEARCH_DEVBOOK,
    method: 'post',
  })
}
