import {
  corsOptions,
  getAccessToken,
  response,
  supabasePromiseResolver,
  verifyToken,
} from '@/lib/supabase/helper';
import { getFavoriteCandidates } from '@/services/server/favoriteService';
import { getRecruiterProfile } from '@/services/server/recruiterService';
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

    const getRecruiterResponse = await supabasePromiseResolver({
      requestFunction: getRecruiterProfile,
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

    const recruiterId = getRecruiterResponse?.data?.recruiter_id;
    const { searchParams } = new URL(request.url);

    const skip = parseInt(searchParams.get('skip') || '0', 10);
    const take = parseInt(searchParams.get('take') || '25', 10);
    const search = searchParams.get('search') || null;

    const favoriteCandidatesResponse = await supabasePromiseResolver({
      requestFunction: getFavoriteCandidates,
      requestBody: { recruiterId, search, skip, take },
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
        data: favoriteCandidatesResponse?.data?.data || [],
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
