import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname

  // Check if the URL contains any of the specified paths
  if (
    url.includes('/mens') || 
    url.includes('/womens') || 
    url.includes('/kids') ||
    url.includes('/cart') ||
    url.includes('/wishlist') ||
    url.includes('/account') ||
    url.includes('/settings')
  ) {
    return NextResponse.redirect(new URL('/under-construction', request.url))
  }

  return NextResponse.next()
}

// Configure matcher for the middleware
export const config = {
  matcher: [
    '/mens/:path*',
    '/womens/:path*',
    '/kids/:path*',
    '/cart/:path*',
    '/wishlist/:path*',
    '/account/:path*',
    '/settings/:path*'
  ]
} 