import { corsOptions, response, supabasePromiseResolver } from '@/lib/supabase/helper';
import { authGuard } from '@/services/server/authGuard';
import { getFavoriteCandidates } from '@/services/server/favoriteService';

import { NextRequest } from 'next/server';

export async function OPTIONS() {
  return corsOptions();
}

export async function GET(request: NextRequest) {
  try {
    const { recruiter, errorResponse } = await authGuard(request);
    if (errorResponse) return errorResponse;

    const { searchParams } = new URL(request.url);
    const skip = parseInt(searchParams.get('skip') || '0', 10);
    const take = parseInt(searchParams.get('take') || '25', 10);
    const search = searchParams.get('search') || null;

    const favoriteCandidatesResponse = await supabasePromiseResolver({
      requestFunction: getFavoriteCandidates,
      requestBody: { recruiterId: recruiter?.recruiter_id, search, skip, take },
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
