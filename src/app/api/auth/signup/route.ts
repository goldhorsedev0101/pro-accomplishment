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
  const startTime = Date.now();
  const log = (step: string, extra: Record<string, any> = {}) => {
    console.log(`[${new Date().toISOString()}] [REGISTER] ${step}`, {
      elapsed: `${Date.now() - startTime}ms`,
      ...extra,
    });
  };

  try {
    log('Request started');

    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      phoneNumber,
      iso2,
      profileImage,
    } = body;

    const lowerCased = email?.toLowerCase();

    if (!lowerCased || !password || !firstName || !lastName) {
      log('Validation failed: missing fields');
      return response(
        { message: 'Missing required fields', data: null, error: 'invalid_input' },
        400,
      );
    }

    if (password !== confirmPassword) {
      log('Validation failed: password mismatch');
      return response(
        { message: 'Passwords do not match', data: null, error: 'password_mismatch' },
        400,
      );
    }

    log('Checking if user exists', { email: lowerCased });
    const isUserNotExistResponse = await supabasePromiseResolver({
      requestFunction: isUserNotExist,
      requestBody: { email: lowerCased },
    });
    log('User existence check complete', { success: isUserNotExistResponse?.success });

    if (!isUserNotExistResponse?.success) {
      log('User already exists');
      return response(
        {
          message: 'User already exists.',
          data: null,
          error: isUserNotExistResponse?.error || 'user_exists',
        },
        400,
      );
    }

    log('Calling signUp');
    const signUpResponse = await supabasePromiseResolver({
      requestFunction: signUp,
      requestBody: { email: lowerCased, password },
    });
    log('Sign-up response received', { success: signUpResponse?.success });

    if (!signUpResponse?.success) {
      log('Sign-up failed', { error: signUpResponse?.error });
      return response(
        {
          message: signUpResponse?.error || 'Failed to register user.',
          data: null,
          error: signUpResponse?.error,
        },
        400,
      );
    }

    const userId = signUpResponse?.data?.user?.id;
    if (!userId) {
      log('Missing userId in signup response');
      return response(
        { message: 'User ID not returned from Supabase.', data: null, error: 'missing_user_id' },
        400,
      );
    }

    log('Creating recruiter profile', { userId });
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
    log('Create profile complete', { success: createProfileResponse?.success });

    if (!createProfileResponse?.success) {
      log('Profile creation failed', { error: createProfileResponse?.error });
      return response(
        {
          message: createProfileResponse?.error || 'Failed to create recruiter profile.',
          data: null,
          error: createProfileResponse?.error,
        },
        400,
      );
    }

    log('Registration success', { totalDuration: `${Date.now() - startTime}ms` });

    return response(
      {
        message: 'Recruiter created successfully! Please check your email for verification.',
        data: { ...createProfileResponse?.data, userId },
        error: null,
      },
      200,
    );
  } catch (error) {
    log('Unexpected error', { error });
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
