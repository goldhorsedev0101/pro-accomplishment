import {
  corsOptions,
  getAccessToken,
  response,
  supabasePromiseResolver,
  verifyToken,
} from '@/lib/supabase/helper';
import { deleteRecruiterProfile, getRecruiterProfile } from '@/services/server/recruiterService';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function OPTIONS() {
  return corsOptions();
}

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

    const recruiterProfileResponse = await supabasePromiseResolver({
      requestFunction: getRecruiterProfile,
      requestBody: {
        profileId: tokenCheckResponse?.id,
      },
    });

    if (!recruiterProfileResponse?.success) {
      return response(
        {
          message: 'Recruiter profile not found.',
          data: null,
          error: recruiterProfileResponse?.error || 'Recruiter profile not found.',
        },
        404,
      );
    }

    const deleteRecruiterProfileResponse = await supabasePromiseResolver({
      requestFunction: deleteRecruiterProfile,
      requestBody: {
        profileId: tokenCheckResponse?.id,
      },
    });

    if (!deleteRecruiterProfileResponse?.success) {
      return response(
        {
          message: 'Error Occurred deleting recruiter profile.',
          data: null,
          error: recruiterProfileResponse?.error || 'Error Occurred deleting recruiter profile.',
        },
        404,
      );
    }

    return response(
      {
        message: 'Recruiter profile deleted successfully.',
        data: recruiterProfileResponse?.data,
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
