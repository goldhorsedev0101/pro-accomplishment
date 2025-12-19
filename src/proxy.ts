import { NextRequest, NextResponse } from 'next/server';
import Routes from './constants/routes';
import { URLS } from './services/base-url';
import { MeResponseT } from './types/others/me/me-response';

export async function proxy(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken')?.value;
  const { pathname } = req.nextUrl;

  const { redirect, next } = NextResponse;

  // Routes
  const publicRoutes = [
    Routes.forgetPassword,
    Routes.resetPassword,
    Routes.verifyEmail,
    Routes.signUp,
    Routes.signIn,
  ];

  const privateRoutes = [Routes.home, Routes.profile];

  const mixedRoutes = [Routes.deleteCandidateAccount];

  const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route));
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));
  const isMixedRoute = mixedRoutes.some((route) => pathname.startsWith(route));

  if (pathname === '/') return redirect(new URL(Routes.signIn, req.url));

  // If the route is mixed, always allow it
  if (isMixedRoute) return next();

  // Not logged in → accessing private route → redirect
  if (!accessToken && isPrivateRoute) {
    return redirect(new URL(Routes.signIn, req.url));
  }

  // Logged in → validate token
  if (accessToken) {
    const user = await getUser(accessToken);

    if (!user) {
      const response = redirect(new URL(Routes.signIn, req.url));
      response.cookies.delete('accessToken');
      return response;
    }

    // Logged in but accessing public route → redirect to /home
    if (isPublicRoute) {
      return redirect(new URL(Routes.home, req.url));
    }
  }

  return next();
}

// Token validation
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
  matcher: ['/((?!api|_next|favicon.ico).*)'],
};
