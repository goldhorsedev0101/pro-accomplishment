import { corsOptions, response, supabasePromiseResolver } from '@/lib/supabase/helper';
import { isUserExist, signIn } from '@/services/server/authService';
import { NextRequest } from 'next/server';

export const T_ROLE = {
  candidate: 'candidate',
  recruiter: 'recruiter',
};

export async function OPTIONS() {
  return corsOptions();
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return response(
        {
          message: 'Email and password are required',
          data: null,
          error: 'Email and password are required',
        },
        400,
      );
    }
    const lowerCasedEmail = email.toLowerCase();
    const isUserExistResponse = await supabasePromiseResolver({
      requestFunction: isUserExist,
      requestBody: { email: lowerCasedEmail },
    });
    if (!isUserExistResponse?.success) {
      return response(
        {
          error: isUserExistResponse?.error || 'User not found.',
          data: null,
          message: isUserExistResponse?.error || 'User not found.',
        },
        400,
      );
    }
    const loginResponse = await supabasePromiseResolver({
      requestFunction: signIn,
      requestBody: {
        email: lowerCasedEmail,
        password,
      },
    });

    if (!loginResponse?.success) {
      return response(
        {
          error: loginResponse?.error || 'Login error.',
          data: null,
          message: loginResponse?.error || 'Login error.',
        },
        400,
      );
    }

    return response(
      {
        message: 'Login successful.',
        data: loginResponse?.data,
        error: null,
      },
      200,
    );
  } catch (error) {
    return response(
      {
        message: (error as Error)?.message,
        data: null,
        error: (error as Error) ?? 'Internal Server Error',
      },
      500,
    );
  }
}
