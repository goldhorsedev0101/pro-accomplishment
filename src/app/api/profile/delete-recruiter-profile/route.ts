import { corsOptions, response, supabasePromiseResolver } from '@/lib/supabase/helper';
import { authGuard } from '@/services/server/authGuard';
import { deleteRecruiterProfile } from '@/services/server/recruiterService';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function OPTIONS() {
  return corsOptions();
}

export async function DELETE(request: NextRequest) {
  try {
    const { recruiter, errorResponse } = await authGuard(request);
    if (errorResponse) return errorResponse;

    const deleteRecruiterProfileResponse = await supabasePromiseResolver({
      requestFunction: deleteRecruiterProfile,
      requestBody: { profileId: recruiter?.profile_id },
    });

    if (!deleteRecruiterProfileResponse?.success) {
      return response(
        {
          message: 'Error occurred while deleting recruiter profile.',
          data: null,
          error:
            deleteRecruiterProfileResponse?.error ||
            'Error occurred while deleting recruiter profile.',
        },
        400,
      );
    }

    return response(
      {
        message: 'Recruiter profile deleted successfully.',
        data: deleteRecruiterProfileResponse?.data || null,
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
