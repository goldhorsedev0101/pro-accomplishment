import {
  getAccessToken,
  response,
  supabasePromiseResolver,
  verifyToken,
} from '@/lib/supabase/helper';
import { getRecruiterProfile } from '@/services/server/recruiterService';
import { NextRequest } from 'next/server';

export async function authGuard(request: NextRequest) {
  const accessToken = await getAccessToken(request);
  if (!accessToken) {
    return {
      errorResponse: response({ message: 'Unauthorized', data: null, error: 'Unauthorized' }, 401),
      recruiter: null,
    };
  }
  const tokenCheckResponse = verifyToken(accessToken);
  if (!tokenCheckResponse?.valid) {
    return {
      errorResponse: response(
        {
          message: tokenCheckResponse.error,
          data: null,
          error: tokenCheckResponse.error,
        },
        401,
      ),
      recruiter: null,
    };
  }

  const getRecruiterResponse = await supabasePromiseResolver({
    requestFunction: getRecruiterProfile,
    requestBody: { profileId: tokenCheckResponse?.id },
  });

  if (!getRecruiterResponse?.success) {
    return {
      errorResponse: response(
        {
          message: 'Recruiter not found',
          data: null,
          error: getRecruiterResponse?.error || 'Recruiter not found.',
        },
        404,
      ),
      recruiter: null,
    };
  }

  return {
    recruiter: getRecruiterResponse?.data,
    errorResponse: null,
  };
}
