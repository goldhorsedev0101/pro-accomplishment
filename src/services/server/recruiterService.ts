import { supabase } from '@/lib/supabase/server';
import { ICustomError } from './authService';
import dayjs from 'dayjs';
export interface RecruiterProfile {
  recruiter_id: string;
  profile_picture?: string | null;
  profile_id: string;
  first_name: string;
  last_name: string;
  email: string;
  role?: string;
  phone_number?: string | null;
  iso2?: string | null;
  subscription?: string | null;
}

export const getRecruiterByProfileId = async ({ profileId }: { profileId: string }) => {
  const { data, error } = await supabase
    .from('recruiter')
    .select(
      `
    *,
    profile:profile_id (
      *,
      subscription:active_subscription_id (*)
    )
    `,
    )
    .eq('profile_id', profileId)
    .maybeSingle();

  let customError: ICustomError | null = error ? error : null;

  if (data) {
    if (data.profile?.is_deactivated || data.profile?.deleted_at) {
      customError = { message: 'User account is deactivated or deleted.' };
    }

    if (data.profile?.role !== 'recruiter') {
      customError = { message: 'Profile is not a recruiter.' };
    }
  }

  return {
    error: customError,
    data: customError ? null : data,
  };
};

export const getProfileById = async ({ profileId }: { profileId: string }) => {
  const { data, error } = await supabase.from('profile').select('*').eq('id', profileId).single();
  return { data, error };
};

export const getRecruiterProfile = async ({
  profileId,
}: {
  profileId: string;
}): Promise<{ data: RecruiterProfile | null; error: string | ICustomError | null }> => {
  const { data: recruiter, error: recruiterError } = await getRecruiterByProfileId({ profileId });
  if (recruiterError || !recruiter) {
    return { data: null, error: recruiterError || 'Recruiter not found' };
  }

  const subscription = recruiter?.profile?.subscription;

  if (subscription?.status === 'active' && subscription?.current_period_end) {
    const now = dayjs();
    const expiryDate = dayjs(subscription.current_period_end);

    if (expiryDate.isBefore(now)) {
      const { data: updatedSub, error: updateError } = await updateRecruiterSubscription({
        subscriptionId: subscription.id,
        status: 'expired',
        session: {},
        type: 'system.subscription.expired',
      });

      if (!updateError && updatedSub) {
        subscription.status = 'expired';
        subscription.auto_renew = false;
      }
    }
  }

  const flattened = {
    recruiter_id: recruiter.id,
    profile_picture: recruiter.profile_picture,
    profile_id: recruiter.profile.id,
    first_name: recruiter.profile.first_name,
    last_name: recruiter.profile.last_name,
    email: recruiter.profile.email,
    role: recruiter.profile.role,
    phone_number: recruiter.phone_number,
    iso2: recruiter.iso2,
    subscription,
  };

  return { data: flattened, error: null };
};
export const editRecruiterProfile = async ({
  profileId,
  firstName,
  lastName,
  phoneNumber,
  profileImage,
  iso2,
}: {
  profileId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  profileImage: string | null;
  iso2: string;
}) => {
  const { data: updateProfileData, error: updateProfileError } = await supabase
    .from('profile')
    .update({
      first_name: firstName,
      last_name: lastName,
      updated_at: new Date().toISOString(),
    })
    .eq('id', profileId)
    .select('*')
    .single();
  if (updateProfileError) {
    return { data: updateProfileData, error: updateProfileError };
  }

  const { data, error } = await supabase
    .from('recruiter')
    .update({
      phone_number: phoneNumber,
      iso2: iso2,
      profile_picture: profileImage,
    })
    .eq('profile_id', profileId)
    .select('*')
    .single();
  return { data, error };
};

export const recruiterSubscription = async ({ session }: { session: any }) => {
  const payload = JSON.parse(JSON.stringify(session));
  const { data, error } = await supabase.rpc('web_stripe_subscription_webhook_event', {
    session_data: payload,
  });

  return { data, error };
};

export const isSubscriptionValid = (subscription?: any): boolean => {
  if (!subscription) return false;

  const now = dayjs();
  const periodEnd = dayjs(subscription.current_period_end);

  const validStatus = ['active'].includes(subscription.status?.toLowerCase());

  const withinPeriod = now.isBefore(periodEnd);

  return validStatus && withinPeriod;
};

export const updateRecruiterSubscription = async ({
  subscriptionId,
  status,
  session,
  type,
}: {
  subscriptionId: string;
  status: string;
  session: any;
  type: string;
}) => {
  const payload = JSON.parse(JSON.stringify(session));

  const { data, error } = await supabase?.rpc('web_update_subscription_status', {
    p_subscription_id: subscriptionId,
    p_status: status,
    p_session: payload,
    p_type: type,
  });
  return {
    data,
    error,
  };
};
