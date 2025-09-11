import { supabase } from '@/lib/supabase/server';

export const toggleFavoriteCandidate = async ({
  recruiterId,
  candidateId,
}: {
  recruiterId: string;
  candidateId: string;
}) => {
  const { data, error } = await supabase.rpc('toggle_favorite_candidate', {
    p_recruiter_id: recruiterId,
    p_candidate_id: candidateId,
  });
  return { data, error };
};

export const getFavoriteCandidates = async ({
  recruiterId,
  skip,
  take,
}: {
  recruiterId: string;
  skip: number;
  take: number;
}) => {
  const { data, error } = await supabase.rpc('get_favorite_candidates', {
    p_recruiter_id: recruiterId,
    p_skip: skip,
    p_take: take,
  });
  return { data, error };
};
