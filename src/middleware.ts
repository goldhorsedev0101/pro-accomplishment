// Types
import { NextRequest, NextResponse } from 'next/server';

// Constant
import Routes from './constants/routes';

// Public Routes
const { forgetPassword, resetPassword, signUp, signIn, verifyEmail } = Routes;
const publicRoutes: Array<string> = [forgetPassword, resetPassword, signUp, signIn, verifyEmail];

// Private Routes
const { home, profile } = Routes;
const privateRoutes: Array<string> = [home, profile];

export function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const token = request.cookies.get('token');

  if (pathName === '/') return NextResponse.redirect(new URL(home, request.url));

  if (!token && publicRoutes.includes(pathName)) return NextResponse.next();

  if (token && privateRoutes.includes(pathName)) return NextResponse.next();

  if (!token && privateRoutes.includes(pathName)) {
    return NextResponse.redirect(new URL(signIn, request.url));
  }

  if (token && publicRoutes.includes(pathName)) {
    return NextResponse.redirect(new URL(home, request.url));
  }

  // Default: Allow
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
