import { corsOptions, response, supabasePromiseResolver } from '@/lib/supabase/helper';
import { authGuard } from '@/services/server/authGuard';
import { editRecruiterProfile } from '@/services/server/recruiterService';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function OPTIONS() {
  return corsOptions();
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, phoneNumber, iso2, profileImage } = body;

    if (!firstName || !lastName || !phoneNumber || !iso2 || !profileImage) {
      return response(
        {
          message: 'First name, last name, phone number, iso2, and profile picture are required.',
          data: null,
          error: 'Validation error',
        },
        400,
      );
    }

    const { recruiter, errorResponse } = await authGuard(request);
    if (errorResponse) return errorResponse;

    const editProfileResponse = await supabasePromiseResolver({
      requestFunction: editRecruiterProfile,
      requestBody: {
        profileId: recruiter?.profile_id,
        firstName,
        lastName,
        phoneNumber,
        iso2,
        profileImage,
      },
    });

    if (!editProfileResponse?.success) {
      return response(
        {
          message: 'Failed to update recruiter profile.',
          data: null,
          error: editProfileResponse?.error || 'Update failed.',
        },
        400,
      );
    }

    return response(
      {
        message: 'Recruiter profile updated successfully.',
        data: editProfileResponse?.data || null,
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
