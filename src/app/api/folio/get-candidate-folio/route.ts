import { corsOptions, response, supabasePromiseResolver } from '@/lib/supabase/helper';
import { authGuard } from '@/services/server/authGuard';
import { getCandidateFolio } from '@/services/server/folioService';
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
    const candidateId = searchParams.get('candidateId');

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

    const getCandidateFolioResponse = await supabasePromiseResolver({
      requestFunction: getCandidateFolio,
      requestBody: { recruiterId: recruiter?.recruiter_id, candidateId },
    });

    if (!getCandidateFolioResponse?.success || !getCandidateFolioResponse?.data) {
      return response(
        {
          message: 'No shared folio found for this candidate and recruiter.',
          data: null,
          error: getCandidateFolioResponse?.error || 'No folio access.',
        },
        403,
      );
    }

    return response(
      {
        message: 'Candidate folio retrieved successfully.',
        data: getCandidateFolioResponse?.data?.data || {},
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
