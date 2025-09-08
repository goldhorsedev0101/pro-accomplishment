import { NextRequest } from 'next/server';
import { corsOptions, response, supabasePromiseResolver } from '@/lib/supabase/helper';
import { resendOtp, resetPassword } from '@/services/server/authService';

export async function OPTIONS() {
  return corsOptions();
}

export async function POST(request: NextRequest) {
  try {
    const { email, type } = await request.json();

    const resendOtpResponse = await supabasePromiseResolver({
      requestFunction: type === 'recovery' ? resetPassword : resendOtp,
      requestBody: {
        email: email.toLowerCase(),
        type: type || 'signup',
      },
    });

    if (!resendOtpResponse?.success) {
      return response(
        {
          data: null,
          error: resendOtpResponse?.error || 'Error while resending OTP',
          message: resendOtpResponse?.error || 'Error while resending OTP',
        },
        400,
      );
    }

    return response(
      {
        data: null,
        error: null,
        message: 'OTP resent successfully.',
      },
      200,
    );
  } catch (error) {
    return response(
      {
        message: (error as Error)?.message || 'Internal Server Error',
        data: null,
        error: error || 'Internal Server Error',
      },
      500,
    );
  }
}
