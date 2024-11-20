// Public
export const ROOT_ROUTE = '/'
export const LOGIN_ROUTE = '/login'
export const REGISTER_ROUTE = '/register'
export const RECOVER_PASSWORD_ROUTE = '/recover-password'
export const RESET_PASSWORD_ROUTE = '/reset-password'

// Protected
export const FEED_ROUTE = '/feed'
export const COMMENTS_ROUTE = '/comments'
export const USER_ROUTE = '/user'
export const UPDATE_PASSWORD_ROUTE = '/update-password'

export const PUBLIC_ROUTES = [
  ROOT_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  RECOVER_PASSWORD_ROUTE,
  RESET_PASSWORD_ROUTE,
]

export const PROTECTED_ROUTES = [
  FEED_ROUTE,
  COMMENTS_ROUTE,
  USER_ROUTE,
  UPDATE_PASSWORD_ROUTE,
]

export const ALL_ROUTES = [...PUBLIC_ROUTES, ...PROTECTED_ROUTES]
