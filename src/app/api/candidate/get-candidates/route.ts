import { corsOptions, response, supabasePromiseResolver } from '@/lib/supabase/helper';
import { authGuard } from '@/services/server/authGuard';
import { getCandidates } from '@/services/server/candidatesService';

import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function OPTIONS() {
  return corsOptions();
}

export async function GET(request: NextRequest) {
  try {
    const { recruiter, errorResponse } = await authGuard(request);
    if (errorResponse) return errorResponse;

    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get('searchTerm');
    const categoryId = searchParams.get('categoryId');
    const subCategoryId = searchParams.get('subCategoryId');
    const skip = Number(searchParams.get('skip') ?? 0);
    const take = Number(searchParams.get('take') ?? 10);

    const getCandidatesResponse = await supabasePromiseResolver({
      requestFunction: getCandidates,
      requestBody: {
        recruiterId: recruiter?.recruiter_id,
        searchTerm,
        categoryId,
        subCategoryId,
        skip,
        take,
      },
    });

    if (!getCandidatesResponse?.success) {
      return response(
        {
          message: getCandidatesResponse?.error || 'Failed to retrieve candidates data.',
          data: null,
          error: getCandidatesResponse?.error || 'Failed to retrieve candidates data.',
        },
        400,
      );
    }

    return response(
      {
        message: getCandidatesResponse?.data?.message || 'Candidates retrieved successfully.',
        data: getCandidatesResponse?.data?.data || [],
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
