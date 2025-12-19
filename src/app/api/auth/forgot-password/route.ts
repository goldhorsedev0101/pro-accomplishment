import { NextRequest } from 'next/server';
import { corsOptions, response, supabasePromiseResolver } from '@/lib/supabase/helper';
import { resetPassword } from '@/services/server/authService';
import { getRecruiterProfileByEmail } from '@/services/server/recruiterService';

export const runtime = 'edge'; // ⚡ Faster cold starts and lower latency

export async function OPTIONS() {
  return corsOptions();
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return response(
        {
          message: 'Email is required.',
          data: null,
          error: 'Missing email field.',
        },
        400,
      );
    }

    const lowerCased = email.toLowerCase();

    const userCheck = await supabasePromiseResolver({
      requestFunction: getRecruiterProfileByEmail,
      requestBody: { email: lowerCased },
    });

    if (!userCheck?.success) {
      return response(
        {
          message: userCheck?.error || 'Email not found.',
          data: null,
          error: userCheck?.error || 'Email not found.',
        },
        400,
      );
    }

    const otpSend = await supabasePromiseResolver({
      requestFunction: resetPassword,
      requestBody: { email: lowerCased },
    });

    if (!otpSend?.success) {
      return response(
        {
          message: otpSend?.error || 'Error while sending OTP.',
          data: null,
          error: otpSend?.error || 'Error while sending OTP.',
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
        message: (error as Error)?.message || 'Internal Server Error.',
        data: null,
        error,
      },
      500,
    );
  }
}
