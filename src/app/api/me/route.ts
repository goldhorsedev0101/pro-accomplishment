// Helper
import { response, supabasePromiseResolver } from '@/lib/supabase/helper';

// Services
import { isUserExist } from '@/services/server/authService';

// JWT Decoder
import { jwtDecode } from 'jwt-decode';

// Header
import { headers } from 'next/headers';

export async function GET() {
  try {
    const { get } = await headers();
    const token = get('authorization')?.split(' ')[1];

    if (!token) {
      const errorMsg = 'Pleas Login first';
      return response({ error: errorMsg, data: null, message: errorMsg }, 401);
    }

    const { email } = jwtDecode<{ email: string }>(token);

    const { success, data, error } = await supabasePromiseResolver({
      requestFunction: isUserExist,
      requestBody: { email },
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
