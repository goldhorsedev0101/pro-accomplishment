// Types
import { NextRequest, NextResponse } from 'next/server';

// Constant
import Routes from './constants/routes';

// Url
import { URLS } from './services/base-url';

// Public Routes
const { forgetPassword, resetPassword, signUp, signIn, verifyEmail } = Routes;
const publicRoutes: Array<string> = [forgetPassword, resetPassword, signUp, signIn, verifyEmail];

// Private Routes
const { home, profile } = Routes;
const privateRoutes: Array<string> = [home, profile];

export async function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const token = request.cookies.get('token')?.value;

  await getUser('');

  if (pathName === '/' || pathName === '/icons') {
    return NextResponse.redirect(new URL(home, request.url));
  }

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

const getUser = async (token?: string) => {
  if (!token) return null;

  const response = await fetch(URLS.ME, { headers: { Authorization: `Bearer ${token}` } });

  if (!response.ok) return null;

  const user = await response.json();
  return user;
};
