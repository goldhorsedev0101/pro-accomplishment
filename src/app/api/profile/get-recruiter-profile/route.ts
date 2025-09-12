import { corsOptions, response, supabasePromiseResolver, verifyToken } from '@/lib/supabase/helper';
import { getRecruiterProfile } from '@/services/server/recruiterService';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function OPTIONS() {
  return corsOptions();
}

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
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
    return response(
      {
        message: 'Recruiter profile retrieved successfully.',
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
