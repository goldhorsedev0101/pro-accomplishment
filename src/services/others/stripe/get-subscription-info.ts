// Types

// Mutation
import { useQuery } from '@tanstack/react-query';

// Axios
import axios from 'axios';

// URL
import { URLS } from '@/services/base-url';

type IRes = {
  message: string;
  error: string | null;
  data: { redirection_url: string } | null;
};

const useGetSubscriptionInfoQuery = () => {
  const getSubscriptionInfoFn = async (): Promise<IRes> => {
    const { data } = await axios.get(URLS.GET_SUBSCRIPTION_INFO);
    return data;
  };

  return useQuery({ queryKey: ['get-subscription-info'], queryFn: getSubscriptionInfoFn });
};

export { useGetSubscriptionInfoQuery };
