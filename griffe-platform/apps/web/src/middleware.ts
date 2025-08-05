import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  const isAuth = !!token
  const isAuthPage = req.nextUrl.pathname.startsWith('/auth')
  const isDashboard = req.nextUrl.pathname.startsWith('/dashboard')
  const isStorePage = req.nextUrl.pathname.startsWith('/store')
  const isAdminDashboard = req.nextUrl.pathname.startsWith('/admin')
  const isHomePage = req.nextUrl.pathname === '/'
  const isApiAuthRoute = req.nextUrl.pathname.startsWith('/api/auth')

  // Allow API auth routes (including password reset)
  if (isApiAuthRoute) {
    return NextResponse.next()
  }

  // Allow home page to redirect naturally
  if (isHomePage) {
    return NextResponse.next()
  }

  // Allow password reset pages even if not authenticated
  const passwordResetPages = [
    '/auth/forgot-password',
    '/auth/reset-password'
  ]
  if (passwordResetPages.some(page => req.nextUrl.pathname.startsWith(page))) {
    return NextResponse.next()
  }

  // If user is on auth page and is authenticated, redirect to appropriate dashboard
  if (isAuthPage && isAuth) {
    if (token.role === 'ADMIN') {
      return NextResponse.redirect(new URL('/admin', req.url))
    } else if (token.role === 'STORE_OWNER' || token.role === 'STORE_EMPLOYEE') {
      return NextResponse.redirect(new URL('/store', req.url))
    } else {
      // For users without specific roles, redirect to store dashboard
      return NextResponse.redirect(new URL('/store', req.url))
    }
  }

  // If user is not authenticated and trying to access protected routes
  if (!isAuth && (isDashboard || isAdminDashboard || isStorePage)) {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }

  // If user is authenticated but trying to access admin routes without admin role
  if (isAuth && isAdminDashboard && token.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/store', req.url))
  }

  // If user is authenticated but trying to access store routes without proper role
  if (isAuth && isStorePage && !['STORE_OWNER', 'STORE_EMPLOYEE', 'ADMIN'].includes(token.role as string)) {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }

  // If user is authenticated but trying to access legacy dashboard, redirect to store
  if (isAuth && isDashboard) {
    return NextResponse.redirect(new URL('/store', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api/auth|_next/static|_next/image|favicon.ico|public).*)',
  ],
}