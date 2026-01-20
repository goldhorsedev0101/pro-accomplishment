import { corsOptions, response, supabasePromiseResolver } from '@/lib/supabase/helper';
import { authGuard } from '@/services/server/authGuard';
import { deleteRecruiterProfile, isSubscriptionValid } from '@/services/server/recruiterService';
import { NextRequest } from 'next/server';
import { stripe } from '../../../../lib/stripe';

export const runtime = 'edge';

export async function OPTIONS() {
  return corsOptions();
}

export async function DELETE(request: NextRequest) {
  try {
    const { recruiter, errorResponse } = await authGuard(request);
    if (errorResponse) return errorResponse;

    const subscription = recruiter?.subscription;
    if (isSubscriptionValid(subscription)) {
      await stripe.subscriptions.update(subscription?.transaction_id, {
        cancel_at_period_end: true,
        metadata: {
          profileId: recruiter?.profile_id,
          subscriptionId: subscription?.id,
          status: 'canceled',
          canceled_at: new Date().toISOString(),
        },
      });
    }

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
