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

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken')?.value;
  const { nextUrl } = req;
  const { pathname } = nextUrl;

  const { redirect, next } = NextResponse;

  const publicRoutes = [
    Routes.forgetPassword,
    Routes.resetPassword,
    Routes.signUp,
    Routes.signIn,
    Routes.verifyEmail,
  ];

  const privateRoutes = [Routes.home, Routes.profile];

  // Match dynamic private routes like /home/[slug]
  const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route));
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

  // If not logged in and accessing private route → redirect
  if (!accessToken && isPrivateRoute) {
    return redirect(new URL(Routes.signIn, req.url));
  }

  // If logged in → validate token
  if (accessToken) {
    const user = await getUser(accessToken);

    if (!user) {
      const response = redirect(new URL(Routes.signIn, req.url));
      response.cookies.delete('accessToken');
      return response;
    }

    // If logged in but trying to access public routes → redirect to /home
    if (isPublicRoute) {
      return redirect(new URL(Routes.home, req.url));
    }
  }

  return next();
}

// Helper function to validate the user by token
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
