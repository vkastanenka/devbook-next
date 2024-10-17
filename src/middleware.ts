import { NextRequest } from 'next/server'
import {
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  USER_ROUTE,
  PROTECTED_ROUTES,
} from './lib/routes'

export async function middleware(req: NextRequest) {
  const { nextUrl } = req
  const session = req.cookies.get('session')
  const isAuthenticated = !!session

  // Redirect users to user page if authenticated
  if (isAuthenticated && nextUrl.pathname.startsWith(LOGIN_ROUTE)) {
    return Response.redirect(new URL(USER_ROUTE, nextUrl))
  }

  // Redirect users to user page if authenticated
  if (isAuthenticated && nextUrl.pathname.startsWith(REGISTER_ROUTE)) {
    return Response.redirect(new URL(USER_ROUTE, nextUrl))
  }

  // Check if route is public
  const isProtectedRoute = PROTECTED_ROUTES.find((route) => {
    return nextUrl.pathname.startsWith(route)
  })

  // Redirect users to login if not authenticated and accessing private route
  if (!isAuthenticated && isProtectedRoute) {
    return Response.redirect(new URL(LOGIN_ROUTE, nextUrl))
  }
}

// Routes middleware should *not* run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
