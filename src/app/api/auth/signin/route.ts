import { NextRequest } from 'next/server';
import { corsOptions, response, supabasePromiseResolver } from '@/lib/supabase/helper';
import { createProfile, isUserNotExist, signUp } from '@/services/server/authService';

export const T_ROLE = {
  candidate: 'candidate',
  recruiter: 'recruiter',
};

export async function OPTIONS() {
  return corsOptions();
}

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, password, confirmPassword, profileImage } =
      await request.json();

    // Password match check
    if (password !== confirmPassword) {
      return response(
        {
          message: 'Passwords do not match',
          data: null,
          error: 'password_mismatch',
        },
        400,
      );
    }

    const lowerCased = email.toLowerCase();

    // Ensure user does not already exist
    const isUserNotExistResponse = await supabasePromiseResolver({
      requestFunction: isUserNotExist,
      requestBody: { email: lowerCased },
    });
    if (!isUserNotExistResponse?.success) {
      return response({ error: isUserNotExistResponse?.error }, 400);
    }

    // Sign up new recruiter
    const signUpResponse = await supabasePromiseResolver({
      requestFunction: signUp,
      requestBody: {
        email: lowerCased,
        password,
      },
    });
    if (!signUpResponse?.success) {
      return response({ error: signUpResponse?.error }, 400);
    }

    const userId = signUpResponse?.data?.user?.id;

    const createProfileResponse = await supabasePromiseResolver({
      requestFunction: createProfile,
      requestBody: {
        userId,
        firstName,
        lastName,
        email: lowerCased,
        role: T_ROLE.recruiter,
        profileImage,
      },
    });

    if (!createProfileResponse.success) {
      return response({ error: createProfileResponse?.error }, 400);
    }

    return response(
      {
        message: 'Recruiter created successfully! Please check your email for verification.',
        data: createProfileResponse?.data?.data,
        error: null,
      },
      200,
    );
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
