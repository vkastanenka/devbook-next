'use server'

// utils
import { serverRequestServer } from '@/src/actions/server-actions'

// types
import { SearchDevbookReqBody } from '@vkastanenka/devbook-types/dist/search'
import { User } from '@vkastanenka/devbook-types/dist/user'

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
