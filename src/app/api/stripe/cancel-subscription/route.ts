import {
  corsOptions,
  getAccessToken,
  response,
  supabasePromiseResolver,
  verifyToken,
} from '@/lib/supabase/helper';
import {
  getRecruiterProfile,
  isSubscriptionValid,
  updateRecruiterSubscription,
} from '@/services/server/recruiterService';
import { NextRequest } from 'next/server';
import 'server-only';
import { stripe } from '../../../../lib/stripe';
import { error } from 'console';
export async function OPTIONS() {
  return corsOptions();
}

export async function GET(request: NextRequest) {
  try {
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
    const profileId = tokenCheckResponse?.id;
    const recruiterProfileResponse = await supabasePromiseResolver({
      requestFunction: getRecruiterProfile,
      requestBody: { profileId },
    });

    if (!recruiterProfileResponse?.success) {
      return response(
        {
          message: 'Recruiter not found',
          data: null,
          error: recruiterProfileResponse?.error || 'Recruiter not found.',
        },
        404,
      );
    }

    const subscription = recruiterProfileResponse?.data?.subscription;
    if (!isSubscriptionValid(subscription)) {
      return response(
        {
          message: 'No active subscription found',
          data: null,
          error: 'No active subscription found',
        },
        404,
      );
    }

    const canceled = await stripe.subscriptions.update(subscription.transaction_id, {
      cancel_at_period_end: true,
      metadata: {
        profileId: profileId!,
        subscriptionId: subscription?.id,
        status: 'canceled',
        canceled_at: new Date().toISOString(),
      },
    });

    return response(
      {
        message: 'Cancellation requested. Waiting for Stripe confirmation.',
        data: { pending: true },
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
