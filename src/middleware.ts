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
  const { pathname } = nextUrl;

  // Early return for root and icons
  if (pathname === '/' || pathname === '/icons') {
    return redirect(new URL(home, url));
  }

  const isPublicRoute = publicRoutes.includes(pathname);
  const isPrivateRoute = privateRoutes.includes(pathname);

  // If no token and trying to access private route -> redirect to signin
  if (!accessToken && isPrivateRoute) {
    return redirect(new URL(signIn, url));
  }

  // If has token, validate it
  if (accessToken) {
    const user = await getUser(accessToken);

    // Invalid token - clear it and redirect if on private route
    if (!user) {
      const response = isPrivateRoute ? redirect(new URL(signIn, url)) : next();

      // Clear the invalid cookie
      response.cookies.delete('accessToken');
      return response;
    }

    // Valid token but on public route -> redirect to home
    if (isPublicRoute) {
      return redirect(new URL(home, url));
    }
  }

  // Default: Allow
  return next();
}

const getUser = async (token?: string) => {
  if (!token) return null;

  const response = await fetch(URLS.GET_RECRUITER_PROFILE, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) return null;

  const { data }: MeResponseT = await response.json();
  return data;
};

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
