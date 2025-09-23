// Types
import { GetFavoriteCandidatePayloadT } from '@/types/others/candidate/get-favorite-candidate/get-favorite-candidate-payload';
import { GetFavoriteCandidateResponseT } from '@/types/others/candidate/get-favorite-candidate/get-favorite-candidate-response';

// Mutation
import { useQuery } from '@tanstack/react-query';

// Axios
import axios from 'axios';

// URL
import { URLS } from '@/services/base-url';

const useGetFavoriteCandidateQuery = (payload: GetFavoriteCandidatePayloadT) => {
  const getFavoriteCandidateFn = async (): Promise<GetFavoriteCandidateResponseT> => {
    const { data } = await axios.get(URLS.GET_FAVORITE_CANDIDATES, { params: payload });
    return data as GetFavoriteCandidateResponseT;
  };

  return useQuery({
    queryKey: ['get-favorite-candidates', payload],
    queryFn: getFavoriteCandidateFn,
  });
};

export { useGetFavoriteCandidateQuery };
