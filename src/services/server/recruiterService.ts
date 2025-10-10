import { supabase } from '@/lib/supabase/server';
import { ICustomError } from './authService';

export const getRecruiterByProfileId = async ({ profileId }: { profileId: string }) => {
  const { data, error } = await supabase
    .from('recruiter')
    .select(
      `
      *,
      profile:profile_id (
        *
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

export const getRecruiterProfile = async ({ profileId }: { profileId: string }) => {
  const { data: recruiter, error: recruiterError } = await getRecruiterByProfileId({ profileId });
  if (recruiterError || !recruiter) {
    return { data: null, error: recruiterError || 'Recruiter not found' };
  }

  const flattened = {
    recruiter_id: recruiter.id,
    profile_picture: recruiter.profile_picture,
    profile_id: recruiter?.profile.id,
    first_name: recruiter?.profile.first_name,
    last_name: recruiter?.profile.last_name,
    email: recruiter?.profile.email,
    role: recruiter?.profile.role,
    phone_number: recruiter?.phone_number,
    iso2: recruiter?.iso2,
  };
  return { data: flattened, error: null };
};

export const editRecruiterProfile = async ({
  profileId,
  firstName,
  lastName,
  phoneNumber,
  iso2,
}: {
  profileId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
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

  console.log('returned', JSON.stringify({ data, error }, null, 2));
  return { data, error };
};
