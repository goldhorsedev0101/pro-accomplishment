// Types
import { GetCandidatePayloadT } from '@/types/others/candidate/get-candidate/get-candidate-payload';
import { GetCandidateResponseT } from '@/types/others/candidate/get-candidate/get-candidate-response';

// Mutation
import { useQuery } from '@tanstack/react-query';

// Axios
import axios from 'axios';

// URL
import { URLS } from '@/services/base-url';

const useGetCandidateQuery = (payload: GetCandidatePayloadT) => {
  const getCandidateFn = async (): Promise<GetCandidateResponseT> => {
    const { data } = await axios.get(URLS.GET_CANDIDATES, { params: payload });
    return data as GetCandidateResponseT;
  };

  return useQuery({ queryKey: ['get-candidate'], queryFn: getCandidateFn });
};

export { useGetCandidateQuery };
