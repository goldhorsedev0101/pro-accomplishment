import { NextRequest } from 'next/server';
import { corsOptions, response, supabasePromiseResolver } from '@/lib/supabase/helper';
import { createProfile, isUserNotExist, signUp } from '@/services/server/authService';

export const runtime = 'edge';

export const T_ROLE = {
  candidate: 'candidate',
  recruiter: 'recruiter',
};

export async function OPTIONS() {
  return corsOptions();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      iso2,
      profileImage,
      confirmPassword,
    } = body;
    const lowerCased = email?.toLowerCase();

    if (!lowerCased || !password || !firstName || !lastName) {
      return response(
        { message: 'Missing required fields', data: null, error: 'Invalid input' },
        400,
      );
    }

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

    const [signUpResponse, isUserNotExistResponse] = await Promise.all([
      supabasePromiseResolver({
        requestFunction: signUp,
        requestBody: { email: lowerCased, password },
      }),
      supabasePromiseResolver({
        requestFunction: isUserNotExist,
        requestBody: { email: lowerCased },
      }),
    ]);

    // 🧩 Handle "user already exists"
    if (!isUserNotExistResponse?.success) {
      return response(
        {
          message: 'User already exists',
          data: null,
          error: isUserNotExistResponse?.error,
        },
        400,
      );
    }

    // 🧩 Handle signup errors
    if (!signUpResponse?.success) {
      return response(
        {
          message: signUpResponse?.error || 'Failed to register user',
          data: null,
          error: signUpResponse?.error,
        },
        400,
      );
    }

    const userId = signUpResponse?.data?.user?.id;
    if (!userId) {
      return response(
        { message: 'User ID not returned from Supabase', data: null, error: 'Missing userId' },
        400,
      );
    }

    // ⚡ Create profile (don’t block on unnecessary post-signup tasks)
    const profilePromise = supabasePromiseResolver({
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

    const createProfileResponse = await profilePromise;
    if (!createProfileResponse?.success) {
      return response(
        {
          message: createProfileResponse?.error || 'Failed to create recruiter profile',
          data: null,
          error: createProfileResponse?.error,
        },
        400,
      );
    }

    return response(
      {
        message: 'Recruiter created successfully! Please check your email for verification.',
        data: { ...createProfileResponse?.data?.data, userId },
        error: null,
      },
      200,
    );
  } catch (error) {
    return response(
      {
        message: (error as Error)?.message || 'Internal Server Error',
        data: null,
        error,
      },
      500,
    );
  }
}
