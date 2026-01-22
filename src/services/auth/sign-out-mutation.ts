// Types

// Mutation
import { useMutation } from '@tanstack/react-query';

// Axios
import axios from 'axios';

// Toast

// URL
import { URLS } from '../base-url';

// Util
import { errorFn } from '@/utils/error-fn';

type PayloadT = {
  profileId: string;
  fcmToken: string;
};

const useSignOutMutation = () => {
  const mutationFn = async (payload: PayloadT): Promise<null> => {
    await axios.post(URLS.SIGN_OUT, payload);
    return null;
  };

  return useMutation({
    onError: errorFn,
    mutationFn,
  });
};

export { useSignOutMutation };
