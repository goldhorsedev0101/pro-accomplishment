// Types

// Mutation
import { useMutation, useQueryClient } from '@tanstack/react-query';

// Axios
import axios from 'axios';

// Toast
import { URLS } from '@/services/base-url';

// Util
import { errorFn } from '@/utils/error-fn';

export interface IRes {
  data: { pending: boolean };
  message: string;
  error: any;
}

const useCancelSubscriptionMutation = () => {
  const queryClient = useQueryClient();

  const cancelSubscriptionFn = async (): Promise<IRes> => {
    const { data } = await axios.post(URLS.CANCEL_SUBSCRIPTION);
    return data;
  };

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-profile'] });
      queryClient.invalidateQueries({ queryKey: ['get-subscription-info'] });
    },
    mutationFn: cancelSubscriptionFn,
    onError: errorFn,
  });
};

export { useCancelSubscriptionMutation };
