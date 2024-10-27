export const STATUS_CODES = {
  ok: 200,
  created: 201,
  accepted: 202,
  noContent: 204,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  internalServerError: 500,
  serviceUnavailable: 503,
}

export const DEFAULT_INTERNAL_SERVER_ERROR_RESPONSE_DATA = {
  success: false,
  status: STATUS_CODES.internalServerError,
  message: 'Internal server error!',
}
