import { corsOptions, response, supabasePromiseResolver } from '@/lib/supabase/helper';
import { getRecruiterProfileByEmail, resetPassword } from '@/services/server/authService';
import { NextRequest } from 'next/server';

export async function OPTIONS() {
  return corsOptions();
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    const lowerCased = email.toLowerCase();
    const isUserExistResponse = await supabasePromiseResolver({
      requestFunction: getRecruiterProfileByEmail,
      requestBody: { email: email },
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
    const resendOtpResponse = await supabasePromiseResolver({
      requestFunction: resetPassword,
      requestBody: { email: lowerCased },
    });
    if (!resendOtpResponse?.success) {
      return response(
        {
          message: resendOtpResponse?.error || 'Error while sending OTP.',
          data: null,
          error: resendOtpResponse?.error || 'Error while sending OTP.',
        },
        400,
      );
    }
    return response(
      {
        message: 'OTP sent successfully.',
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
