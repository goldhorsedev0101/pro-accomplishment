// Helper
import { response, supabasePromiseResolver, verifyToken } from '@/lib/supabase/helper';

// Services
import { isUserExist } from '@/services/server/authService';

// Header
import { headers } from 'next/headers';

export async function GET() {
  try {
    const { get } = await headers();

    const accessToken = get('authorization')?.split(' ')[1];

    if (!accessToken) {
      const errorMsg = 'Please login first';
      return response({ error: errorMsg, data: null, message: errorMsg }, 401);
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
      requestFunction: isUserExist,
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
