import { NextRequest } from 'next/server';
import { corsOptions, response, supabasePromiseResolver } from '@/lib/supabase/helper';
import { updatePassword, signIn } from '@/services/server/authService';
import { authGuard } from '@/services/server/authGuard';

export const runtime = 'edge';

export async function OPTIONS() {
  return corsOptions();
}

export async function POST(request: NextRequest) {
  try {
    const { recruiter, errorResponse } = await authGuard(request);
    if (errorResponse) return errorResponse;

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return response(
        {
          message: 'Both current and new passwords are required.',
          data: null,
          error: 'Missing required fields',
        },
        400,
      );
    }

    const loginResponse = await supabasePromiseResolver({
      requestFunction: signIn,
      requestBody: {
        email: recruiter?.email,
        password: currentPassword,
      },
    });

    if (!loginResponse?.success) {
      return response(
        {
          message: 'Old password is incorrect.',
          data: null,
          error: 'Old password is incorrect.',
        },
        400,
      );
    }

    const updatePasswordResponse = await supabasePromiseResolver({
      requestFunction: updatePassword,
      requestBody: { password: newPassword },
    });

    if (!updatePasswordResponse?.success) {
      return response(
        {
          message: updatePasswordResponse?.error || 'Error while changing password.',
          data: null,
          error: updatePasswordResponse?.error,
        },
        400,
      );
    }

    return response(
      {
        message: 'Password changed successfully.',
        data: updatePasswordResponse?.data,
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
