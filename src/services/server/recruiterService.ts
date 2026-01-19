import { supabase } from '@/lib/supabase/server';
import { deleteExistingImage, ICustomError } from './authService';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
export type TSubscriptionStatus = 'active' | 'canceled' | 'expired' | 'trialing'; // extend if needed
export type TSubscriptionType = 'monthly_plan'; // extend if needed

export interface ISubscription {
  id: string; // uuid
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
  status: TSubscriptionStatus;
  product_type: TSubscriptionType;
  platform?: 'stripe' | 'apple' | 'google' | null;
  profile_id: string; // uuid
  apple_subscription_log_id?: string | null;
  google_subscription_log_id?: string | null;
  stripe_subscription_log_id?: string | null;
  start_date?: string | null; // ISO timestamp
  current_period_end?: string | null; // ISO timestamp
  cancel_at_period_end?: boolean | null;
  last_renewal_at?: string | null; // ISO timestamp
  transaction_date: number; // epoch or numeric
  transaction_id?: string | null;
  renewal_count?: number | null;
  auto_renew?: boolean | null;
  has_acknowledged: boolean;
}
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
  role_position?: string | null;
  company?: string | null;
  subscription?: ISubscription | null;
}

interface IUserLookup {
  id: string;
  email: string;
  role: string;
  is_deactivated: boolean;
  deleted_at: string | null;
  subscription?: ISubscription | null;
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

export const getRecruiterProfileByEmail = async ({
  email,
}: {
  email: string;
}): Promise<{ data: IUserLookup | null; error: ICustomError | null }> => {
  // Fetch recruiter profile
  const { data: profile, error } = await supabase
    .from('profile')
    .select(
      `
    id,
    email,
    role,
    is_deactivated,
    deleted_at,
    active_subscription_id,
    subscription:active_subscription_id(*)
    `,
    )
    .eq('email', email)
    .maybeSingle<IUserLookup>();

  let customError: ICustomError | null = error ? error : null;

  if (profile) {
    if (profile?.is_deactivated || profile?.deleted_at) {
      customError = { message: 'User account is deactivated or deleted.' };
    }
    if (profile?.role == 'candidate') {
      customError = { message: 'This user exists as a Student.' };
    }
  } else {
    customError = { message: 'User not found' };
  }

  if (!profile || customError) {
    return { data: null, error: customError };
  }

  const subscription = profile?.subscription || null;

  if (subscription) {
    if (
      (subscription?.status === 'active' || subscription?.status === 'canceled') &&
      subscription?.cancel_at_period_end
    ) {
      const now = dayjs().utc();
      const expiryDate = dayjs.utc(subscription?.current_period_end);

      if (expiryDate.isBefore(now)) {
        // Mark subscription as expired
        const { data: updatedSub, error: updateError } = await updateRecruiterSubscription({
          subscriptionId: subscription?.id,
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
  }
  return {
    data: { ...profile, subscription },
    error: null,
  };
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

  if (
    (subscription?.status === 'active' || subscription?.status === 'canceled') &&
    subscription?.cancel_at_period_end
  ) {
    const now = dayjs()?.utc();
    const expiryDate = dayjs.utc(subscription.current_period_end);

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
    role_position: recruiter.role_position,
    company: recruiter.company,
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
  company,
  rolePosition,
}: {
  profileId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  profileImage: string | null;
  company: string;
  rolePosition: string;
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
      company: company,
      role_position: rolePosition,
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
  console.log(
    '\n${new Date().toLocaleTimeString()} \n ~ updateRecruiterSubscription ~  data, error:',
    data,
    error,
  );
  return {
    data,
    error,
  };
};

export const deleteRecruiterProfile = async ({ profileId }: { profileId: string }) => {
  const { data, error } = await supabase?.rpc('web_delete_recruiter', {
    p_profile_id: profileId,
  });
  return {
    data,
    error,
  };
};

export const uploadProfilePicture = async ({
  oldUrl,
  file,
}: {
  oldUrl?: string;
  file: File | string;
}) => {
  console.log('🚀 [uploadProfilePicture] Start:', { oldUrl, fileType: typeof file });

  // ✅ If already a string (i.e. existing URL), skip upload
  if (typeof file === 'string') {
    console.log('ℹ️ [uploadProfilePicture] File is already a string URL, skipping upload:', file);
    return { error: null, data: file };
  }

  const fileExtension = file.name.split('.').pop();
  const normalizedName = file.name.replace(/\s+/g, '_').replace(/\.[^/.]+$/, '');
  const fileName = `${normalizedName}___${file.size}___${Date.now()}.${fileExtension}`;
  const filePath = `${fileName}`;

  console.log('🧩 [uploadProfilePicture] Prepared file details:', {
    fileName,
    fileExtension,
    fileSize: file.size,
    fileType: file.type,
  });

  // ✅ Delete old file if exists
  if (oldUrl) {
    console.log('🗑️ [uploadProfilePicture] Attempting to delete old file:', oldUrl);
    const existingFilePath = oldUrl.split('/').pop();
    if (existingFilePath) {
      const { error } = await deleteExistingImage(existingFilePath);
      if (error) {
        console.error('❌ [uploadProfilePicture] Error deleting old file:', error);
        return { error, data: null };
      }
      console.log('✅ [uploadProfilePicture] Old file deleted successfully');
    } else {
      console.warn('⚠️ [uploadProfilePicture] Could not extract file path from oldUrl');
    }
  }

  console.log('⬆️ [uploadProfilePicture] Uploading new file to Supabase:', filePath);

  const storageResponse = await supabase.storage.from('user-photos').upload(filePath, file, {
    contentType: file.type,
    upsert: true,
  });

  if (storageResponse?.error) {
    console.error('❌ [uploadProfilePicture] Upload failed:', storageResponse.error);
    return { error: storageResponse.error, data: null };
  }

  console.log('✅ [uploadProfilePicture] File uploaded successfully:', storageResponse.data);

  const { data } = supabase.storage.from('user-photos').getPublicUrl(filePath);
  console.log('🌐 [uploadProfilePicture] Public URL generated:', data.publicUrl);

  console.log('🏁 [uploadProfilePicture] Upload process completed');
  return { error: null, data };
};
