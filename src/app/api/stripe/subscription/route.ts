import {
  corsOptions,
  getAccessToken,
  response,
  supabasePromiseResolver,
  verifyToken,
} from '@/lib/supabase/helper';
import { getRecruiterProfile, isSubscriptionValid } from '@/services/server/recruiterService';
import { NextRequest } from 'next/server';
import 'server-only';
import { stripe } from '../../../../lib/stripe';

export enum SubscriptionType {
  MONTHLY = 'monthly_plan',
  // ANNUALLY = 'annual_plan',
}

export async function OPTIONS() {
  return corsOptions();
}

export async function GET(request: NextRequest) {
  try {
    const subscriptionType = SubscriptionType.MONTHLY;

    // const subscriptionType = Object.values(SubscriptionType).includes(
    //   subscription_type as SubscriptionType,
    // )
    //   ? subscription_type
    //   : SubscriptionType.MONTHLY;

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
    if (isSubscriptionValid(subscription)) {
      return response(
        {
          message:
            'You currently have an active subscription. Please wait until it expires before purchasing another.',
          data: null,
          error: 'Already Subscribed',
        },
        200,
      );
    }

    const origin =
      request.headers.get('origin') ||
      `${request.headers.get('x-forwarded-proto') || 'https'}://${request.headers.get('host')}`;

    const priceId =
      subscriptionType === SubscriptionType.MONTHLY
        ? process.env.STRIPE_RECRUITER_MONTHLY_SUBSCRIPTION
        : process.env.STRIPE_RECRUITER_MONTHLY_SUBSCRIPTION;

    if (!priceId) {
      return response(
        {
          message: 'Stripe price ID not configured.',
          data: null,
          error: 'Stripe price ID not configured.',
        },
        500,
      );
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId ?? '',
          quantity: 1,
        },
      ],
      mode: 'subscription',
      currency: 'usd',
      success_url: `${origin}/home?isSuccess=true`,
      cancel_url: `${origin}/home?isSuccess=false`,
      metadata: {
        profileId: profileId ?? '',
        type: subscriptionType || '',
      },
    });

    return response(
      {
        message: 'Redirecting to checkout page',
        data: { redirection_url: session?.url },
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
