import { supabase } from '@/lib/supabase/server';

export const getRecruiterByProfileId = async ({ profileId }: { profileId: string }) => {
  const { data, error } = await supabase
    .from('recruiter')
    .select('*')
    .eq('profile_id', profileId)
    .single();
  return { data, error };
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
  const { data: profile, error: profileError } = await getProfileById({ profileId });
  if (profileError || !profile) {
    return { data: null, error: profileError || 'Profile not found' };
  }
  const flattened = {
    recruiter_id: recruiter.id,
    profile_picture: recruiter.profile_picture,
    profile_id: profile.id,
    first_name: profile.first_name,
    last_name: profile.last_name,
    email: profile.email,
    role: profile.role,
  };
  return { data: flattened, error: null };
};

export const editRecruiterProfile = async ({
  profileId,
  firstName,
  lastName,
  phoneNumber,
}: {
  profileId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
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
    })
    .eq('profile_id', profileId)
    .select('*')
    .single();
  return { data, error };
};
