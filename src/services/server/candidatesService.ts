import { supabase } from '@/lib/supabase/server';
export interface ICustomError {
  message: string;
  code?: string;
}

export const candidateSignIn = async ({ email, password }: { email: string; password: string }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error?.code == 'email_not_confirmed') {
    return {
      data,
      error: 'The user’s email is not verified. Continue via the mobile app to proceed.',
    };
  }
  return { data, error };
};

export const getCandidateDetails = async ({ email }: { email: string }) => {
  const { data, error } = await supabase
    .from('profile')
    .select('id, is_deactivated, deleted_at')
    .eq('email', email)
    .in('role', ['candidate'])
    .maybeSingle();

  let customError: ICustomError | null = error ? error : null;

  if (!customError && data) {
    if (data.is_deactivated === true || data.deleted_at !== null) {
      customError = { message: 'User account is deactivated or deleted.' };
    }
  }
  return {
    error: customError,
    data: data ? data : { email },
  };
};

export const deleteCandidate = async () => {
  const { data, error } = await supabase.rpc('mob_delete_candidate_account');
  return { data, error };
};

export const getCandidates = async ({
  recruiterId,
  searchTerm,
  categoryId,
  subCategoryId,
  skip,
  take,
}: {
  recruiterId: string;
  searchTerm: string;
  categoryId: string;
  subCategoryId: string;
  skip: number;
  take: number;
}) => {
  const { data, error } = await supabase.rpc('web_get_candidates', {
    p_recruiter_id: recruiterId,
    p_search_term: searchTerm,
    p_category_id: categoryId,
    p_sub_category_id: subCategoryId,
    p_skip: skip,
    p_take: take,
  });

  return { data, error };
};
