import { supabase } from '@/lib/supabase/server';
export interface ICustomError {
  message: string;
  code?: string;
}

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
