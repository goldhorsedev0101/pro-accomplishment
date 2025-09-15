import { supabase } from '@/lib/supabase/server';

export const getCandidateFolio = async ({
  recruiterId,
  candidateId,
}: {
  recruiterId: string;
  candidateId: string;
}) => {
  const { data, error } = await supabase.rpc('web_get_candidate_folio', {
    p_recruiter_id: recruiterId,
    p_candidate_id: candidateId,
  });
  return { data, error };
};
