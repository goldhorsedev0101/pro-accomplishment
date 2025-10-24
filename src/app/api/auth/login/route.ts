import { corsOptions, response, supabasePromiseResolver } from '@/lib/supabase/helper';
import { getRecruiterProfileByEmail, signIn } from '@/services/server/authService';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

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

    const [loginResponse, recruiterResponse] = await Promise.all([
      supabasePromiseResolver({
        requestFunction: signIn,
        requestBody: { email: lowerCasedEmail, password },
      }),
      supabasePromiseResolver({
        requestFunction: getRecruiterProfileByEmail,
        requestBody: { email: lowerCasedEmail },
      }),
    ]);

    if (!loginResponse?.success) {
      return response(
        {
          message: loginResponse?.error || 'Login failed.',
          data: null,
          error: loginResponse?.error || 'Login failed.',
        },
        400,
      );
    }

    if (!recruiterResponse?.success) {
      return response(
        {
          message: recruiterResponse?.error || 'Recruiter not found.',
          data: null,
          error: recruiterResponse?.error || 'Recruiter not found.',
        },
        400,
      );
    }

    return response(
      {
        message: 'Login successful.',
        data: {
          ...loginResponse.data,
          recruiterProfile: recruiterResponse.data,
        },
        error: null,
      },
      200,
    );
  } catch (error) {
    return response(
      {
        message: (error as Error)?.message || 'Internal Server Error',
        data: null,
        error,
      },
      500,
    );
  }
}
