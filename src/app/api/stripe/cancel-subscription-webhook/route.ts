import { NextRequest } from 'next/server';
import { stripe } from '@/lib/stripe';
import { response, supabasePromiseResolver } from '@/lib/supabase/helper';
import 'server-only';
import { updateRecruiterSubscription } from '@/services/server/recruiterService';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Relevant Stripe events for subscription cancelations
const relevantEvents = new Set([
  'customer.subscription.updated',
  'subscription_schedule.canceled',
  'subscription_schedule.aborted',
]);

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const sig = request.headers.get('stripe-signature') as string | null;

    const webhookSecret = process.env.STRIPE_CANCEL_WEBHOOK_SECRET;
    if (!webhookSecret) {
      return response(
        {
          message: 'Missing STRIPE_CANCEL_WEBHOOK_SECRET environment variable.',
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
      console.error('Invalid Stripe signature:', err.message);
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
      console.log(`Handling Stripe event: ${type}`);

      const metadata = session.metadata || {};
      const subscriptionId = metadata?.subscriptionId;
      const status = metadata?.status || session.status;

      if (!subscriptionId) {
        console.warn('Missing subscriptionId in metadata');
        return response(
          {
            message: 'Missing subscriptionId in metadata — cannot update DB.',
            data: null,
            error: 'Missing subscriptionId',
          },
          400,
        );
      }

      // Process the cancelation in Supabase via RPC
      const { data: updated, error } = await supabasePromiseResolver({
        requestFunction: updateRecruiterSubscription,
        requestBody: {
          subscriptionId,
          status,
          session,
          type,
        },
      });

      if (error) {
        console.error('Supabase update failed:', error);
        return response(
          {
            message: 'Failed to update subscription in database.',
            data: null,
            error,
          },
          500,
        );
      }

      return response(
        {
          message: 'Cancelation event processed successfully.',
          data: updated,
          error: null,
        },
        200,
      );
    }

    // For non-relevant events
    return response(
      {
        message: `Ignored event type: ${type}`,
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
