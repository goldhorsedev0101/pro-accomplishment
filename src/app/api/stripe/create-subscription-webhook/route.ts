import { NextRequest } from 'next/server';
import { stripe } from '@/lib/stripe';
import { response, supabasePromiseResolver } from '@/lib/supabase/helper';
import 'server-only';
import { recruiterSubscription } from '@/services/server/recruiterService';

export const config = {
  api: {
    bodyParser: false,
  },
};
const relevantEvents = new Set([
  'checkout.session.async_payment_failed',
  'checkout.session.async_payment_succeeded',
  'checkout.session.completed',
  'checkout.session.expired',
]);

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const sig = request.headers.get('stripe-signature') as string | null;

    const webhookSecret = process.env.STRIPE_CREATE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      return response(
        {
          message: 'Missing STRIPE_CREATE_WEBHOOK_SECRET environment variable.',
          data: null,
          error: 'Server misconfiguration',
        },
        500,
      );
    }

    let event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, sig!, webhookSecret);
    } catch (err: any) {
      console.error(' Invalid Stripe signature:', err.message);
      return response(
        {
          message: 'Webhook signature verification failed.',
          data: null,
          error: err.message,
        },
        400,
      );
    }

    const { type, data } = event;
    const session = data.object as any;

    if (relevantEvents.has(type)) {
      switch (type) {
        case 'checkout.session.completed':
        case 'checkout.session.async_payment_succeeded':
        case 'checkout.session.async_payment_failed':
        case 'checkout.session.expired': {
          const { data, error } = await supabasePromiseResolver({
            requestFunction: recruiterSubscription,
            requestBody: {
              session: session,
            },
          });

          if (error) {
            return response(
              {
                message: 'Subscription processing failed.',
                data: null,
                error,
              },
              500,
            );
          }

          return response(
            {
              message: 'Stripe event processed successfully.',
              data,
              error: null,
            },
            200,
          );
        }
      }
    }

    return response(
      {
        message: `Webhook event '${type}' handled successfully.`,
        data: { type, id: session.id },
        error: null,
      },
      200,
    );
  } catch (error) {
    console.error('⚠️ Webhook handler error:', error);
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
