// Types
import { GetCandidateFolioPayloadT } from '@/types/others/candidate/get-candidate-folio/get-candidate-folio-payload';
import { GetCandidateFolioResponseT } from '@/types/others/candidate/get-candidate-folio/get-candidate-folio-response';

// Mutation
import { useQuery } from '@tanstack/react-query';

// Axios
import axios from 'axios';

// URL
import { URLS } from '@/services/base-url';

const useGetCandidateFolioQuery = (payload: GetCandidateFolioPayloadT) => {
  const getCandidateFolioFn = async (): Promise<GetCandidateFolioResponseT> => {
    const { data } = await axios.get(URLS.GET_CANDIDATE_FOLIO, { params: payload });
    return data as GetCandidateFolioResponseT;
    // return dummyData as GetCandidateFolioResponseT;
  };

  return useQuery({ queryKey: ['get-candidate-folio', payload], queryFn: getCandidateFolioFn });
};

export { useGetCandidateFolioQuery };
