// types
import { NextRequest } from 'next/server'

// constants
import {
  PUBLIC_ROUTES,
  FEED_ROUTE,
  PROTECTED_ROUTES,
  ROOT_ROUTE,
  ALL_ROUTES,
} from '@/src/constants/route-constants'

export async function middleware(req: NextRequest) {
  const { nextUrl, cookies } = req
  const session = cookies.get(process.env.NEXT_SESSION_JWT_COOKIE_NAME || '')
  const isAuthenticated = !!session

  // Obtains top level path ex: /post/post-id => /post
  const topPath = `/${nextUrl.pathname.slice(1).split('/')[0]}`

  // Redirect users to feed page from public page if authenticated
  if (isAuthenticated && PUBLIC_ROUTES.includes(topPath)) {
    return Response.redirect(new URL(FEED_ROUTE, nextUrl))
  }

  // Redirect users to login page from protected page if not authenticated
  if (!isAuthenticated && PROTECTED_ROUTES.includes(topPath)) {
    return Response.redirect(new URL(ROOT_ROUTE, nextUrl))
  }

  // Redirect users to login if path doesn't exist
  if (!ALL_ROUTES.includes(topPath)) {
    return Response.redirect(new URL(ROOT_ROUTE, nextUrl))
  }
}

// Routes middleware should not run on
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
