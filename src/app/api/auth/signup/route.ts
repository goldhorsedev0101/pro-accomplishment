import { NextRequest, NextResponse } from 'next/server';
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
    const { firstName, lastName, email, password, phoneNumber, iso2, profileImage } =
      await request.json();

    const lowerCased = email.toLowerCase();
    const isUserNotExistResponse = await supabasePromiseResolver({
      requestFunction: isUserNotExist,
      requestBody: { email: lowerCased },
    });
    if (!isUserNotExistResponse?.success) {
      return response(
        {
          data: null,
          message: isUserNotExistResponse?.error,
          error: isUserNotExistResponse?.error,
        },
        400,
      );
    }
    const signUpResponse = await supabasePromiseResolver({
      requestFunction: signUp,
      requestBody: {
        email: lowerCased,
        password,
      },
    });
    if (!signUpResponse?.success) {
      return response(
        {
          error: signUpResponse?.error,
          data: null,
          message: signUpResponse?.error,
        },
        400,
      );
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
        phoneNumber,
        iso2,
        profileImage,
      },
    });
    if (!createProfileResponse.success) {
      return response(
        {
          error: createProfileResponse?.error,
          data: null,
          message: createProfileResponse?.error,
        },
        400,
      );
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
