// Types
import { SignInPayloadT } from '@/types/auth/sign-in/sign-in-payload';
import { SignInResponseT } from '@/types/auth/sign-in/sign-in-responsive';

// Mutation
import { useMutation } from '@tanstack/react-query';

// Axios
import axios from 'axios';

// Toast
import toast from 'react-hot-toast';

// URL
import { URLS } from '../base-url';

// Util
import { errorFn } from '@/utils/error-fn';

const useSignInMutation = () => {
  const signInFn = async (payload: SignInPayloadT): Promise<SignInResponseT> => {
    const { data } = await axios.post(URLS.SIGN_IN, payload);
    return data as SignInResponseT;
  };

  return useMutation({
    onSuccess: () => toast.success('Login successful'),
    mutationFn: signInFn,
    onError: errorFn,
  });
};

export { useSignInMutation };
