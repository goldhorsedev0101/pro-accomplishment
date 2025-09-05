import { NextRequest } from 'next/server';
import { corsOptions, response, supabasePromiseResolver } from '@/lib/supabase/helper';
import { updatePassword } from '@/services/server/authService';

export async function OPTIONS() {
  return corsOptions();
}

export async function POST(request: NextRequest) {
  try {
    const { newPassword, confirmPassword } = await request.json();

    if (newPassword !== confirmPassword) {
      return response(
        {
          message: 'Passwords do not match',
          data: null,
          error: 'password_mismatch',
        },
        400,
      );
    }

    const resetPasswordResponse = await supabasePromiseResolver({
      requestFunction: updatePassword,
      requestBody: { password: newPassword },
    });

    if (!resetPasswordResponse?.success) {
      return response(
        {
          message: resetPasswordResponse?.error ?? 'Failed to reset password',
          data: null,
          error: resetPasswordResponse?.error,
        },
        400,
      );
    }

    return response(
      {
        message: 'Password reset successfully',
        data: resetPasswordResponse?.data,
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
