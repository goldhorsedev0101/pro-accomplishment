import {
  corsOptions,
  getAccessToken,
  response,
  supabasePromiseResolver,
  verifyToken,
} from '@/lib/supabase/helper';
import { getRecruiterByProfileId } from '@/services/server/recruiterService';
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { subscription_type }: { subscription_type?: SubscriptionType } = body;

    const subscriptionType = Object.values(SubscriptionType).includes(
      subscription_type as SubscriptionType,
    )
      ? subscription_type
      : SubscriptionType.MONTHLY;

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
    const getRecruiterResponse = await supabasePromiseResolver({
      requestFunction: getRecruiterByProfileId,
      requestBody: { profileId },
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
    const origin =
      request.headers.get('origin') ||
      `${request.headers.get('x-forwarded-proto') || 'https'}://${request.headers.get('host')}`;

    const priceId =
      subscriptionType === SubscriptionType.MONTHLY
        ? process.env.STRIPE_RECRUITER_MONTHLY_SUBSCRIPTION
        : // Uncomment and add your annual plan env variable if needed
          // : process.env.STRIPE_RECRUITER_ANNUAL_SUBSCRIPTION
          process.env.STRIPE_RECRUITER_MONTHLY_SUBSCRIPTION;

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
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
      metadata: {
        profileId: profileId ?? '',
        type: subscriptionType || '',
      },
    });

    return response(
      {
        message: 'Redirecting to checkout page',
        data: session,
        error: 'Canceled',
      },
      404,
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
