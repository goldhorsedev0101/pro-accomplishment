import { corsOptions, response, supabasePromiseResolver } from '@/lib/supabase/helper';
import { authGuard } from '@/services/server/authGuard';
import { getRecruiterProfile } from '@/services/server/recruiterService';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function OPTIONS() {
  return corsOptions();
}

export async function GET(request: NextRequest) {
  try {
    const { recruiter, errorResponse } = await authGuard(request);
    if (errorResponse) return errorResponse;

    const recruiterProfileResponse = await supabasePromiseResolver({
      requestFunction: getRecruiterProfile,
      requestBody: { profileId: recruiter?.profile_id },
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

    return response(
      {
        message: 'Recruiter profile retrieved successfully.',
        data: recruiterProfileResponse?.data || null,
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
