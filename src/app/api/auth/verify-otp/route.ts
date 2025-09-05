import { corsOptions, response, supabasePromiseResolver } from '@/lib/supabase/helper';
import { verifyOtp } from '@/services/server/authService';
import { NextRequest } from 'next/server';

export async function OPTIONS() {
  return corsOptions();
}

export async function POST(request: NextRequest) {
  try {
    const { otp, email, type } = await request.json();

    if (otp.length !== 6) {
      return response({ error: 'Please enter the 6-digit OTP code sent to your email.' }, 400);
    }
    const verifyOtpResponse = await supabasePromiseResolver({
      requestFunction: verifyOtp,
      requestBody: {
        email,
        token: otp,
        type,
      },
    });

    if (!verifyOtpResponse?.success) {
      return response(
        { error: verifyOtpResponse?.error, message: verifyOtpResponse?.error, data: null },
        400,
      );
    }

    return response(
      {
        message: 'OTP verified successfully.',
        data: verifyOtpResponse?.data,
        error: null,
      },
      200,
    );
  } catch (error) {
    return response(
      {
        error: error as Error,
        message: (error as Error)?.message ?? 'Internal Server Error',
        data: null,
      },
      500,
    );
  }
}
