import { NextRequest } from 'next/server';
import { corsOptions, response, supabasePromiseResolver } from '@/lib/supabase/helper';
import { verifyOtp } from '@/services/server/authService';

export const runtime = 'edge';

export async function OPTIONS() {
  return corsOptions();
}

export async function POST(request: NextRequest) {
  try {
    const { otp, email, type } = await request.json();

    if (!otp || !email) {
      return response(
        {
          data: null,
          error: 'Email and OTP are required.',
          message: 'Email and OTP are required.',
        },
        400,
      );
    }

    if (typeof otp !== 'string' || otp.trim().length !== 6) {
      return response(
        {
          data: null,
          error: 'Please enter the 6-digit OTP code sent to your email.',
          message: 'Please enter the 6-digit OTP code sent to your email.',
        },
        400,
      );
    }

    const verifyOtpResponse = await supabasePromiseResolver({
      requestFunction: verifyOtp,
      requestBody: {
        email: email.toLowerCase(),
        token: otp.trim(),
        type: type || 'signup',
      },
    });

    if (!verifyOtpResponse?.success) {
      return response(
        {
          data: null,
          error: verifyOtpResponse?.error || 'Verification failed.',
          message: verifyOtpResponse?.error || 'Verification failed.',
        },
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
    console.error('OTP Verification Error:', error);
    return response(
      {
        message: (error as Error)?.message || 'Internal Server Error',
        data: null,
        error: (error as Error)?.message || 'Internal Server Error',
      },
      500,
    );
  }
}
