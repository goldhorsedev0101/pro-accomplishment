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

export const getFavoriteCandidates = async ({ recruiterId }: { recruiterId: string }) => {
  const { data, error } = await supabase
    .from('favorite_candidate')
    .select('*')
    .eq('recruiter_id', recruiterId);
  return { data, error };
};
