// Types
import { NextRequest, NextResponse } from 'next/server';
import { MeResponseT } from './types/others/me/me-response';

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

export async function middleware({ url, nextUrl, cookies }: NextRequest) {
  const accessToken = cookies.get('accessToken')?.value;
  const { redirect, next } = NextResponse;
  const user = await getUser(accessToken);
  const { pathname } = nextUrl;

  const isPublicRoute = publicRoutes.includes(pathname);
  const isPrivateRoute = privateRoutes.includes(pathname);

  if (pathname === '/' || pathname === '/icons') return redirect(new URL(home, url));

  // invalid token && private route
  if (!user && isPrivateRoute) return redirect(new URL(signIn, url));

  // valid token && public route
  if (user && isPublicRoute) return redirect(new URL(home, url));

  // Default: Allow
  return next();
}

const getUser = async (token?: string) => {
  if (!token) return null;

  const response = await fetch(URLS.ME, { headers: { Authorization: `Bearer ${token}` } });

  if (!response.ok) return null;

  const { data }: MeResponseT = await response.json();
  return data;
};

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
