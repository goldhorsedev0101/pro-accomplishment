// import { supabase } from '@/lib/supabase/server';

// export interface ICustomError {
//   message: string;
//   code?: string;
// }

// export const signUp = async ({ email, password }: any) => {
//   const { data, error } = await supabase.auth.signUp({
//     email,
//     password,
//   });
//   return { data, error };
// };

// export const verifyOtp = async ({ email, token, type }: any) => {
//   const { data, error } = await supabase.auth.verifyOtp({
//     email,
//     token,
//     type,
//   });
//   return { data, error };
// };

// export const resendOtp = async ({ email, type }: any) => {
//   const { error, data } = await supabase.auth.resend({
//     type,
//     email,
//   });

//   return { error, data };
// };

// export const resetPassword = async ({ email }: { email: string }) => {
//   const { error, data } = await supabase.auth.resetPasswordForEmail(email);
//   return { error, data };
// };

// export const signIn = async ({ email, password }: any) => {
//   const { data, error } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   });
//   if (error?.code == 'email_not_confirmed') {
//     return {
//       data: { code: 'verification_email_resend' },
//       error: null,
//     };
//   }
//   return { data, error };
// };

// export const signInWithIdToken = async ({ values }: { values: any }) => {
//   const { data, error } = await supabase.auth.signInWithIdToken({ ...values });
//   return { data, error };
// };

// export const signOut = async () => {
//   const { error } = await supabase.auth.signOut();
//   if (error) {
//     return { data: null, error };
//   }

//   return { data: { success: true }, error: null };
// };

// export const getSession = async () => {
//   const session = await supabase.auth.getSession();
//   return session;
// };

// export const uploadProfilePicture = async ({ file }: any) => {
//   const fileExtension = file?.path?.split('.')?.slice(-1)[0];

//   // Get filename without extension and normalize it
//   const normalizedName = file?.filename?.replace(/\s+/g, '_');

//   // Final filename: normalizedName___timestamp.extension
//   const fileName = `${normalizedName}___${file?.size}___${Date.now()}.${fileExtension}`;
//   const filePath = `${fileName}`;

//   // if (avatarUrl) {
//   //   const existingFilePath = avatarUrl.split("/").pop();
//   //   const { error, data } = await deleteExistingImage(existingFilePath);
//   //   if (error) {
//   //     return { error, data };
//   //   }
//   // }

//   const storageResponse = await supabase.storage.from('user-photos').upload(filePath, file.data, {
//     contentType: `image/${fileExtension}`,
//     upsert: true,
//   });

//   if (storageResponse?.error) {
//     return { error: storageResponse?.error, data: null };
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

// export const updatePassword = async ({ password }: { email: string; password: string }) => {
//   const { error, data } = await supabase.auth.updateUser({
//     password,
//   });
//   if (error) {
//     return { error, data: null };
//   }
//   return {
//     error: null,
//     data,
//   };
// };

// export const createProfile = async ({
//   userId,
//   firstName,
//   lastName,
//   email,
//   role,
// }: {
//   userId: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   role: string;
// }) => {
//   const { data, error } = await supabase.rpc('create_profile_and_recruiter', {
//     p_profile_id: userId,
//     p_first_name: firstName,
//     p_last_name: lastName,
//     p_email: email,
//     p_role: role,
//   });

//   return { data, error };
// };

// export const isUserNotExist = async ({ email }: any) => {
//   const { data, error } = await supabase
//     .from('profile')
//     .select('email')
//     .eq('email', email)
//     .maybeSingle();

//   let customError: ICustomError | null = error ? error : null;

//   if (data?.email && !customError) {
//     customError = { message: 'User already exists.' };
//   }
//   return {
//     error: customError,
//     data: data ? data : { email },
//   };
// };

// export const isUserExist = async ({ email }: any) => {
//   const { data, error } = await supabase
//     .from('profile')
//     .select('email')
//     .eq('email', email)
//     .maybeSingle();

//   let customError = error ? error : null;

//   if (!data && !customError) {
//     let customError: ICustomError | null = error ? error : null;
//   }
//   return {
//     error: customError,
//     data,
//   };
// };

// export const deleteExistingImage = async (filePath: string) => {
//   const { error, data } = await supabase.storage.from('profile_pictures').remove([filePath]);
//   return { error, data };
// };
