import { corsOptions, response, supabasePromiseResolver } from '@/lib/supabase/helper';
import { signOut } from '@/services/server/authService';
import {
  candidateSignIn,
  deleteCandidate,
  getCandidateDetails,
} from '@/services/server/candidatesService';

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

    const [loginResponse, candidateResponse] = await Promise.all([
      supabasePromiseResolver({
        requestFunction: candidateSignIn,
        requestBody: { email: lowerCasedEmail, password },
      }),
      supabasePromiseResolver({
        requestFunction: getCandidateDetails,
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

    if (!candidateResponse?.success) {
      return response(
        {
          message: candidateResponse?.error || 'Candidate not found.',
          data: null,
          error: candidateResponse?.error || 'Candidate not found.',
        },
        400,
      );
    }

    const deleteAccount = await supabasePromiseResolver({
      requestFunction: deleteCandidate,
      requestBody: {},
    });

    if (!deleteAccount?.success) {
      return response(
        {
          message: candidateResponse?.error || 'Account Deletion error.',
          data: null,
          error: deleteAccount?.error || 'Account Deletion error',
        },
        400,
      );
    }

    supabasePromiseResolver({
      requestFunction: signOut,
      requestBody: {},
    });

    return response(
      {
        message: 'Login successful.',
        data: null,
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
