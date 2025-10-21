import {
  corsOptions,
  getAccessToken,
  response,
  supabasePromiseResolver,
  verifyToken,
} from '@/lib/supabase/helper';
import { getCandidates } from '@/services/server/candidatesService';
import { getRecruiterProfile } from '@/services/server/recruiterService';
import { NextRequest } from 'next/server';

export async function OPTIONS() {
  return corsOptions();
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get('searchTerm') ?? null;
    const categoryId = searchParams.get('categoryId') ?? null;
    const subCategoryId = searchParams.get('subCategoryId') ?? null;
    const skip = Number(searchParams.get('skip') ?? 0);
    const take = Number(searchParams.get('take') ?? 25);
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
      requestBody: {
        profileId: tokenCheckResponse?.id,
      },
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
    const getCandidatesResponse = await supabasePromiseResolver({
      requestFunction: getCandidates,
      requestBody: {
        recruiterId: getRecruiterResponse?.data?.id,
        searchTerm: searchTerm,
        categoryId: categoryId,
        subCategoryId: subCategoryId,
        skip: skip,
        take: take,
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
        data: getCandidatesResponse?.data?.data || {},
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
