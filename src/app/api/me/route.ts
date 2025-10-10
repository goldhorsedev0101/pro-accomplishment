// Helper
import {
  getAccessToken,
  response,
  supabasePromiseResolver,
  verifyToken,
} from '@/lib/supabase/helper';

// Services
import { getRecruiterProfileByEmail } from '@/services/server/authService';

// Header
import { headers } from 'next/headers';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const accessToken = await getAccessToken(request);
    if (!accessToken) {
      return response(
        {
          message: 'Unauthorized',
          data: null,
          error: 'Unauthorized',
        },
        404,
      );
    }
    const tokenCheckResponse = verifyToken(accessToken);
    if (!tokenCheckResponse?.valid) {
      return response(
        {
          message: tokenCheckResponse.error,
          data: null,
          error: tokenCheckResponse.error,
        },
        401,
      );
    }

    const { success, data, error } = await supabasePromiseResolver({
      requestFunction: getRecruiterProfileByEmail,
      requestBody: { email: tokenCheckResponse?.email },
    });
    if (!success) {
      const errorMsg = error || 'User not found.';
      return response({ error: errorMsg, data: null, message: errorMsg }, 400);
    }

    return response({ message: 'Login successful.', data: data, error: null }, 200);
  } catch (error) {
    return response(
      {
        message: (error as Error)?.message,
        data: null,
        error: (error as Error) ?? 'Internal Server Error',
      },
      500,
    );
  }
}
