import {
  corsOptions,
  getAccessToken,
  response,
  supabasePromiseResolver,
  verifyToken,
} from '@/lib/supabase/helper';
import { editRecruiterProfile } from '@/services/server/recruiterService';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function OPTIONS() {
  return corsOptions();
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, phoneNumber, iso2 } = body;

    if (!firstName || !lastName || !phoneNumber || iso2) {
      return response(
        {
          message: 'First name, last name and phone number are required.',
          data: null,
          error: 'Validation error',
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

    const editProfileResponse = await supabasePromiseResolver({
      requestFunction: editRecruiterProfile,
      requestBody: {
        profileId: tokenCheckResponse?.id,
        firstName,
        lastName,
        phoneNumber,
        iso2,
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
        data: editProfileResponse?.data,
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
