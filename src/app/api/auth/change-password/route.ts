import {
  corsOptions,
  getAccessToken,
  response,
  supabasePromiseResolver,
} from '@/lib/supabase/helper';
import { signIn, updatePassword } from '@/services/server/authService';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import * as jwt from 'jwt-decode';

export async function OPTIONS() {
  return corsOptions();
}

interface CustomJwtPayload {
  exp?: number;
  email?: string;
}

function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwt.jwtDecode<CustomJwtPayload>(token);
    if (!decoded.exp) {
      return true;
    }
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch {
    return true;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { currentPassword, newPassword } = await request.json();
    const accessToken = await getAccessToken(request);

    if (!accessToken) {
      return response(
        {
          message: 'Unauthorized',
          data: null,
          error: 'Unauthorized',
        },
        404,
      );
    }
    const decodedToken = jwt.jwtDecode<CustomJwtPayload>(accessToken);
    const tokenExpired = isTokenExpired(accessToken);
    if (tokenExpired) {
      return response(
        {
          message: 'Token expired. Please login again.',
          data: null,
          error: 'Token expired. Please login again.',
        },
        401,
      );
    }
    if (!decodedToken.email) {
      return response(
        {
          message: 'Invalid token. Please login again.',
          data: null,
          error: 'Invalid token. Please login again.',
        },
        401,
      );
    }
    const loginResponse = await supabasePromiseResolver({
      requestFunction: signIn,
      requestBody: {
        email: decodedToken.email,
        password: currentPassword,
      },
    });
    if (!loginResponse?.success) {
      return response(
        {
          error: loginResponse?.error || 'Current password is incorrect.',
          message: loginResponse?.error || 'Current password is incorrect.',
          data: null,
        },
        400,
      );
    }
    const updatePasswordResponse = await supabasePromiseResolver({
      requestFunction: updatePassword,
      requestBody: {
        password: newPassword,
      },
    });
    if (!updatePasswordResponse?.success) {
      return response(
        {
          message: updatePasswordResponse?.error || 'Error while changing password.',
          data: null,
          error: updatePasswordResponse?.error,
        },
        400,
      );
    }
    return response(
      {
        message: 'Password changed successfully.',
        data: updatePasswordResponse?.data,
        error: null,
      },
      200,
    );
  } catch (error) {
    return response(
      {
        message: (error as Error)?.message || 'Internal Server Error.',
        data: null,
        error,
      },
      500,
    );
  }
}
