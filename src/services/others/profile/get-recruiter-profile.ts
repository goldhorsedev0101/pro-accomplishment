// Types
import { GetProfileResponseT } from '@/types/others/profile/get-recruiter-profile/get-profile-response';

// Mutation
import { useQuery } from '@tanstack/react-query';

// Axios
import axios from 'axios';

// URL
import { URLS } from '@/services/base-url';

const useGetProfileQuery = () => {
  const getProfileFn = async (): Promise<GetProfileResponseT> => {
    const { data } = await axios.get(URLS.GET_RECRUITER_PROFILE);
    return data as GetProfileResponseT;
  };

  return useQuery({ queryKey: ['get-profile'], queryFn: getProfileFn });
};

export { useGetProfileQuery };
