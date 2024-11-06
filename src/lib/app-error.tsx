// types
import { HttpStatusCode } from '@/types/http-status-code'
import { ServerResponse } from '@/types/server-types'

// AppError object for providing meaningful errors
export const appError = ({
  message,
  statusCode,
}: {
  message: string
  statusCode: HttpStatusCode
}): ServerResponse => ({
  message,
  status: 'error',
  statusCode,
  success: false,
})
