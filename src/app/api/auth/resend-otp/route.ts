import { NextRequest } from 'next/server';
import { corsOptions, response, supabasePromiseResolver } from '@/lib/supabase/helper';
import { resendOtp } from '@/services/server/authService';

export async function OPTIONS() {
  return corsOptions();
}

export async function POST(request: NextRequest) {
  try {
    const { email, type } = await request.json();

    const resendOtpResponse = await supabasePromiseResolver({
      requestFunction: resendOtp,
      requestBody: {
        email: email.toLowerCase(),
        type: type ?? 'signup',
      },
    });

    if (!resendOtpResponse?.success) {
      return response(
        {
          message: resendOtpResponse?.error ?? 'Error while resending OTP',
          data: null,
          error: resendOtpResponse?.error,
        },
        400,
      );
    }

    return response(
      {
        message: 'OTP resent successfully',
        data: null,
        error: null,
      },
      200,
    );
  } catch (error) {
    return response(
      {
        message: (error as Error)?.message ?? 'Internal Server Error',
        data: null,
        error,
      },
      500,
    );
  }
}
