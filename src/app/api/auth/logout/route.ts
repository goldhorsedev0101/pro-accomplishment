import { corsOptions, response, supabasePromiseResolver } from '@/lib/supabase/helper';
import { deleteFcmToken, setFcmToken, signIn } from '@/services/server/authService';
import { getRecruiterProfileByEmail } from '@/services/server/recruiterService';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function OPTIONS() {
  return corsOptions();
}

export async function POST(request: NextRequest) {
  try {
    const { profileId, fcmToken } = await request.json();
    if (!profileId || !fcmToken) {
      return response(
        {
          message: 'profileId and fcmToken are required',
          data: null,
          error: 'Profile Id and Fcm Token are required',
        },
        400,
      );
    }
    const fcmTokenDeletion = await supabasePromiseResolver({
      requestFunction: deleteFcmToken,
      requestBody: {
        profileId: profileId,
        fcmToken: fcmToken,
      },
    });
    if (!fcmTokenDeletion?.success) {
      return response(
        {
          message: 'Fcm Token Deletion failed',
          data: null,
          error: fcmTokenDeletion?.error,
        },
        400,
      );
    }

    return response(
      {
        message: 'Logout successful.',
        data: {
          ...fcmTokenDeletion.data,
        },
        error: null,
      },
      200,
    );
  } catch (error) {
    return response(
      {
        message: (error as Error)?.message || 'Internal Server Error',
        data: null,
        error,
      },
      500,
    );
  }
}
