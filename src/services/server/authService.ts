import { supabase } from '@/lib/supabase/server';
import { EmailOtpType } from '@supabase/supabase-js';

export interface ICustomError {
  message: string;
  code?: string;
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
    return {
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

export const uploadProfilePicture = async ({
  oldUrl,
  file,
}: {
  oldUrl?: string;
  file: File | string;
}) => {
  if (typeof file === 'string') return { error: null, data: file };

  const fileExtension = file.name.split('.').pop();
  const normalizedName = file.name.replace(/\s+/g, '_').replace(/\.[^/.]+$/, '');

  const fileName = `${normalizedName}___${file.size}___${Date.now()}.${fileExtension}`;
  const filePath = `${fileName}`;

  // ✅ Delete old file if exists
  if (oldUrl) {
    const existingFilePath = oldUrl.split('/').pop();
    if (existingFilePath) {
      const { error } = await deleteExistingImage(existingFilePath);
      if (error) return { error, data: null };
    }
  }

  const storageResponse = await supabase.storage.from('user-photos').upload(filePath, file, {
    contentType: file.type, // e.g. "image/png"
    upsert: true,
  });

  if (storageResponse?.error) {
    return { error: storageResponse.error, data: null };
  }

  const { data } = supabase.storage.from('user-photos').getPublicUrl(filePath);

  return { error: null, data };
};

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
}: {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  profileImage: string | null;
  phoneNumber: string;
}) => {
  const { data, error } = await supabase.rpc('web_create_profile_and_recruiter', {
    p_profile_id: userId,
    p_first_name: firstName,
    p_last_name: lastName,
    p_email: email,
    p_role: role,
    p_profile_picture: profileImage,
    p_phone_number: phoneNumber,
  });

  return { data, error };
};

export const isUserNotExist = async ({ email }: { email: string }) => {
  const { data, error } = await supabase
    .from('profile')
    .select('email')
    .eq('email', email)
    .maybeSingle();

  let customError: ICustomError | null = error ? error : null;

  if (data?.email && !customError) {
    customError = { message: 'User already exists.' };
  }
  return {
    error: customError,
    data: data ? data : { email },
  };
};

export const isUserExist = async ({ email }: { email: string }) => {
  const { data, error } = await supabase
    .from('profile')
    .select('id, email, role')
    .eq('email', email)
    .eq('role', 'recruiter')
    .maybeSingle();

  let customError: ICustomError | null = error ? error : null;

  if (!data && !customError) {
    customError = { message: 'User does not exist or is not a recruiter.' };
  }

  return {
    error: customError,
    data,
  };
};

export const deleteExistingImage = async (filePath: string) => {
  const { error, data } = await supabase.storage.from('user-photos').remove([filePath]);
  return { error, data };
};

export const getRecruiterProfile = async () => {
  const { data, error } = await supabase.rpc('web_get_recruiter_details');
  console.log(data, error);
  return { data, error };
};
