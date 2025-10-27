'use server';
import { response, supabasePromiseResolver } from '@/lib/supabase/helper';
import { supabase } from '@/lib/supabase/server';
import { EmailOtpType } from '@supabase/supabase-js';
import { error } from 'console';
import { cookies } from 'next/headers';

export interface ICustomError {
  message: string;
  code?: string;
}

interface IUserLookup {
  id: string;
  email: string;
  role: string;
  is_deactivated: boolean;
  deleted_at: string | null;
}

export const signUp = async ({ email, password }: { email: string; password: string }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};

export const verifyOtp = async ({
  email,
  token,
  type,
}: {
  email: string;
  token: string;
  type: EmailOtpType;
}) => {
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type,
  });
  if (data?.session?.access_token && data?.session?.refresh_token) {
    await supabase.auth.setSession({
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
    });
  }
  return { data, error };
};

export const resendOtp = async ({ email, type }: { email: string; type: any }) => {
  const { error, data } = await supabase.auth.resend({
    type,
    email,
  });

  return { error, data };
};

export const resetPassword = async ({ email }: { email: string }) => {
  const { error, data } = await supabase.auth.resetPasswordForEmail(email);
  return { error, data };
};

export const signIn = async ({ email, password }: { email: string; password: string }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error?.code == 'email_not_confirmed') {
    const resendOtpResponse = await supabasePromiseResolver({
      requestFunction: resendOtp,
      requestBody: {
        email: email,
        type: 'signup',
      },
    });

    if (!resendOtpResponse?.success) {
      return {
        message: 'OTP send failed',
        data: { code: 'verification_email_resend_failed' },
        error: null,
      };
    }

    return {
      message: 'OTP send successfully',
      data: { code: 'verification_email_resend' },
      error: null,
    };
  }
  return { data, error };
};

// export const signInWithIdToken = async ({ values }: { values: any }) => {
//   const { data, error } = await supabase.auth.signInWithIdToken({ ...values });
//   return { data, error };
// };

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    return { data: null, error };
  }

  return { data: { success: true }, error: null };
};

export const getSession = async () => {
  const session = await supabase.auth.getSession();
  return session;
};

// export const uploadProfilePicture = async ({
//   oldUrl,
//   file,
// }: {
//   oldUrl?: string;
//   file: File | string;
// }) => {
//   if (typeof file === 'string') return { error: null, data: file };

//   const fileExtension = file.name.split('.').pop();
//   const normalizedName = file.name.replace(/\s+/g, '_').replace(/\.[^/.]+$/, '');

//   const fileName = `${normalizedName}___${file.size}___${Date.now()}.${fileExtension}`;
//   const filePath = `${fileName}`;

//   // ✅ Delete old file if exists
//   if (oldUrl) {
//     const existingFilePath = oldUrl.split('/').pop();
//     if (existingFilePath) {
//       const { error } = await deleteExistingImage(existingFilePath);
//       if (error) return { error, data: null };
//     }
//   }

//   const storageResponse = await supabase.storage.from('user-photos').upload(filePath, file, {
//     contentType: file.type,
//     upsert: true,
//   });

//   if (storageResponse?.error) {
//     return { error: storageResponse.error, data: null };
//   }

//   const { data } = supabase.storage.from('user-photos').getPublicUrl(filePath);

//   return { error: null, data };
// };

// export const updateProfile = async ({ values }: any) => {
//   const { error, data } = await supabase
//     .from('profiles')
//     .update({ ...values })
//     .eq('id', values?.id)
//     .select();
//   return { error, data };
// };

export const updatePassword = async ({ password }: { email: string; password: string }) => {
  const { error, data } = await supabase.auth.updateUser({
    password,
  });
  if (error) {
    return { error, data: null };
  }
  return {
    error: null,
    data,
  };
};

export const createProfile = async ({
  userId,
  firstName,
  lastName,
  email,
  role,
  profileImage,
  phoneNumber,
  iso2,
}: {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  profileImage: string | null;
  phoneNumber: string;
  iso2: string;
}) => {
  const { data, error } = await supabase.rpc('web_create_profile_and_recruiter', {
    p_profile_id: userId,
    p_first_name: firstName,
    p_last_name: lastName,
    p_email: email,
    p_role: role,
    p_profile_picture: profileImage,
    p_phone_number: phoneNumber,
    p_iso2: iso2,
  });

  return { data, error };
};

export const isUserNotExist = async ({ email }: { email: string }) => {
  const { data, error } = await supabase
    .from('profile')
    .select('id, email, role, is_deactivated, deleted_at')
    .eq('email', email)
    .eq('role', 'recruiter')
    .maybeSingle();

  let customError: ICustomError | null = error ? error : null;

  if (data?.email && !customError) {
    customError = { message: 'User already exists.' };
  }

  if (!customError && data) {
    if (data.is_deactivated === true || data.deleted_at !== null) {
      customError = { message: 'User account is deactivated or deleted.' };
    }
  }
  console.log('here', data, customError, email);

  return {
    error: customError,
    data: data ? data : { email },
  };
};

export const getRecruiterProfileByEmail = async ({
  email,
}: {
  email: string;
}): Promise<{ data: IUserLookup | null; error: ICustomError | null }> => {
  const { data, error } = await supabase
    .from('profile')
    .select('id, email, role, is_deactivated, deleted_at')
    .eq('email', email)
    .eq('role', 'recruiter')
    .maybeSingle();

  let customError: ICustomError | null = error ? error : null;

  if (data) {
    if (data.is_deactivated || data.deleted_at) {
      customError = { message: 'User account is deactivated or deleted.' };
    }
  } else {
    customError = { message: 'User not found' };
  }
  return {
    error: customError,
    data: customError ? null : data,
  };
};

export const deleteExistingImage = async (filePath: string) => {
  const { error, data } = await supabase.storage.from('user-photos').remove([filePath]);
  return { error, data };
};

export const getRecruiterProfile = async () => {
  const { data, error } = await supabase.rpc('web_get_recruiter_details');
  return { data, error };
};

export const restoreSupabaseSession = async () => {
  const cookieStore = await cookies();
  const cookieSession = cookieStore.get('session');

  if (!cookieSession) {
    return {
      data: null,
      error: response(
        {
          message: 'Auth Session not found',
          data: null,
          error: 'Auth Session not found',
        },
        404,
      ),
    };
  }

  const session = JSON.parse(cookieSession.value);
  await supabase.auth.setSession(session);

  return { data: true, error: null };
};
