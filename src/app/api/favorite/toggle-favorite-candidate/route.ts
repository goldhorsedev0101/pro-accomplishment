import { corsOptions, response, supabasePromiseResolver } from '@/lib/supabase/helper';
import { authGuard } from '@/services/server/authGuard';
import { toggleFavoriteCandidate } from '@/services/server/favoriteService';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function OPTIONS() {
  return corsOptions();
}

export async function POST(request: NextRequest) {
  try {
    const { recruiter, errorResponse } = await authGuard(request);
    if (errorResponse) return errorResponse;

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

    const toggleFavoriteCandidateResponse = await supabasePromiseResolver({
      requestFunction: toggleFavoriteCandidate,
      requestBody: {
        recruiterId: recruiter?.recruiter_id,
        candidateId,
      },
    });

    if (!toggleFavoriteCandidateResponse?.success) {
      return response(
        {
          message: toggleFavoriteCandidateResponse?.error?.message || 'Failed to toggle favorite.',
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
