// Types

// Mutation
import { useMutation } from '@tanstack/react-query';

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
  const cancelSubscriptionFn = async (): Promise<IRes> => {
    const { data } = await axios.post(URLS.CANCEL_SUBSCRIPTION);
    return data;
  };

  return useMutation({
    mutationFn: cancelSubscriptionFn,
    onError: errorFn,
  });
};

export { useCancelSubscriptionMutation };
