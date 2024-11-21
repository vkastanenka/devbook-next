// Public
export const LOGIN_ROUTE = '/login'
export const RECOVER_PASSWORD_ROUTE = '/recover-password'
export const REGISTER_ROUTE = '/register'
export const RESET_PASSWORD_ROUTE = '/reset-password'
export const ROOT_ROUTE = '/'

// Protected
export const COMMENTS_ROUTE = '/comments'
export const FEED_ROUTE = '/feed'
export const SEARCH_ROUTE = '/search'
export const UPDATE_PASSWORD_ROUTE = '/update-password'
export const USER_ROUTE = '/user'

export const PUBLIC_ROUTES = [
  LOGIN_ROUTE,
  RECOVER_PASSWORD_ROUTE,
  REGISTER_ROUTE,
  RESET_PASSWORD_ROUTE,
  ROOT_ROUTE,
]

export const PROTECTED_ROUTES = [
  COMMENTS_ROUTE,
  FEED_ROUTE,
  SEARCH_ROUTE,
  UPDATE_PASSWORD_ROUTE,
  USER_ROUTE,
]

export const ALL_ROUTES = [...PUBLIC_ROUTES, ...PROTECTED_ROUTES]
