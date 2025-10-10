import * as jwt from 'jwt-decode';
export interface ISupabasePromiseResolver {
  requestFunction: (requestBody: any) => Promise<{ data?: any; error?: any }>;
  requestBody: any;
}

export const supabasePromiseResolver = async ({
  requestFunction,
  requestBody,
}: ISupabasePromiseResolver) => {
  try {
    const res = await requestFunction(requestBody);

    if (res?.error) {
      const errorMessage = res.error.message;

      if (errorMessage?.includes('Network request failed.')) {
        return { success: false, error: 'Network Request Error.' };
      }

      switch (res.error.status) {
        case 400:
          return { success: false, data: null, error: errorMessage || 'Bad Request.' };

        case 401:
          return { success: false, data: null, error: errorMessage || 'You are unauthorized.' };

        case 404:
          return { success: false, data: null, error: errorMessage || 'Not Found.' };

        case 409:
          return { success: false, data: null, error: errorMessage || 'Conflict.' };

        case 500:
          return { success: false, data: null, error: errorMessage || 'Internal Server Error.' };

        case 502:
          return { success: false, data: null, error: errorMessage || 'Bad Gateway Error.' };

        case 503:
          return { success: false, data: null, error: errorMessage || 'Server timed out.' };

        default:
          return { success: false, data: null, error: errorMessage || 'Something went wrong.' };
      }
    }
    if (res && res?.data) {
      return {
        success: true,
        data: res?.data,
        error: null,
      };
    }

    if (res?.data?.success && !res?.data?.success) {
      return { success: false, data: null, error: 'Network Request Error.' };
    }

    return { success: false, error: 'Oops! There might be an issue. Please try again.' };
  } catch (error: any) {
    console.error('REQUEST HANDLER ERROR CATCH', error);
    return { success: false, error: error?.message, data: null };
  }
};

import { NextResponse } from 'next/server';

const corsHeaders = {
  'Access-Control-Allow-Origin': 'http://localhost:3000',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers':
    'X-CSRF-Token, X-Requested-With, Accept, Content-Type, Authorization',
  'Access-Control-Allow-Credentials': 'true',
};

export const response = (json: any, status = 200) => {
  return NextResponse.json(json, { status, headers: corsHeaders });
};

export function corsOptions() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

interface CustomJwtPayload {
  exp?: number;
  email?: string;
  sub?: string;
}

export function isTokenExpired(token: string): boolean {
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

export function verifyToken(accessToken?: string) {
  if (!accessToken) {
    return {
      valid: false,
      error: 'Unauthorized',
    };
  }
  try {
    const decoded = jwt.jwtDecode<CustomJwtPayload>(accessToken);
    if (isTokenExpired(accessToken)) {
      return {
        valid: false,
        error: 'Token expired. Please login again.',
      };
    }
    if (!decoded.email || !decoded.sub) {
      return {
        valid: false,
        error: 'Invalid token. Please login again.',
      };
    }
    return {
      valid: true,
      email: decoded.email,
      id: decoded.sub,
    };
  } catch {
    return {
      valid: false,
      error: 'Invalid token format.',
    };
  }
}

import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function getAccessToken(request: NextRequest): Promise<string | null> {
  const cookieStore = await cookies();
  const cookieToken = cookieStore.get('accessToken')?.value;

  if (cookieToken) return cookieToken;

  const authHeader = request.headers.get('authorization') || request.headers.get('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7).trim();
  }

  return null;
}
