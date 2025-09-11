import { corsOptions, response, supabasePromiseResolver, verifyToken } from '@/lib/supabase/helper';
import { getRecruiter } from '@/services/server/candidatesService';
import { getFavoriteCandidates } from '@/services/server/favoriteService';
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
    const getRecruiterResponse = await supabasePromiseResolver({
      requestFunction: getRecruiter,
      requestBody: { profileId: tokenCheckResponse?.id },
    });
    if (!getRecruiterResponse?.success) {
      return response(
        {
          message: 'Recruiter not found',
          data: null,
          error: getRecruiterResponse?.error || 'Recruiter not found.',
        },
        404,
      );
    }
    const recruiterId = getRecruiterResponse?.data?.id;
    const favoriteCandidatesResponse = await supabasePromiseResolver({
      requestFunction: getFavoriteCandidates,
      requestBody: { recruiterId },
    });
    if (!favoriteCandidatesResponse?.success) {
      return response(
        {
          message:
            favoriteCandidatesResponse?.error?.message || 'Failed to fetch favorite candidates.',
          data: [],
          error: favoriteCandidatesResponse?.error || 'Failed to fetch favorite candidates.',
        },
        400,
      );
    }
    return response(
      {
        message: 'Favorite candidates retrieved successfully.',
        data: favoriteCandidatesResponse?.data || [],
        error: null,
      },
      200,
    );
  } catch (error) {
    return response(
      {
        message: (error as Error)?.message || 'Internal Server Error.',
        data: [],
        error,
      },
      500,
    );
  }
}
