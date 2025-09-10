import { corsOptions, response, supabasePromiseResolver, verifyToken } from '@/lib/supabase/helper';
import { getRecruiter } from '@/services/server/candidatesService';
import { toggleFavoriteCandidate } from '@/services/server/favoriteService';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function OPTIONS() {
  return corsOptions();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { candidateId } = body;
    if (!candidateId) {
      return response(
        {
          message: 'Candidate ID is required.',
          data: null,
          error: 'Missing candidateId',
        },
        400,
      );
    }
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
    const toggleFavoriteCandidateResponse = await supabasePromiseResolver({
      requestFunction: toggleFavoriteCandidate,
      requestBody: {
        recruiterId,
        candidateId,
      },
    });
    if (!toggleFavoriteCandidateResponse?.success) {
      return response(
        {
          message: toggleFavoriteCandidateResponse?.error.message || 'Failed to toggle favorite.',
          data: null,
          error: toggleFavoriteCandidateResponse?.error || 'Failed to toggle favorite.',
        },
        400,
      );
    }
    return response(
      {
        message: 'Favorite toggled successfully.',
        data: toggleFavoriteCandidateResponse?.data?.data || {},
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
