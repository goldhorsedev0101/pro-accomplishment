import {
  corsOptions,
  getAccessToken,
  response,
  supabasePromiseResolver,
  verifyToken,
} from '@/lib/supabase/helper';
import { getCandidateFolio } from '@/services/server/folioService';
import { getRecruiterByProfileId } from '@/services/server/recruiterService';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function OPTIONS() {
  return corsOptions();
}

export async function GET(request: NextRequest) {
  try {
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
      requestFunction: getRecruiterByProfileId,
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
    const getCandidateFolioResponse = await supabasePromiseResolver({
      requestFunction: getCandidateFolio,
      requestBody: { recruiterId, candidateId },
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
