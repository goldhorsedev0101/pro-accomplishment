// Types
import { SignUpPayloadT } from '@/types/auth/sign-up/sign-up-payload';
import { SignUpResponseT } from '@/types/auth/sign-up/sign-up-response';

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

const useSignUpMutation = () => {
  const signUpFn = async (payload: SignUpPayloadT): Promise<SignUpResponseT> => {
    const { data } = await axios.post(URLS.SIGN_UP, payload);
    return data as SignUpResponseT;
  };

  return useMutation({
    onSuccess: ({ message }) => toast.success(message),
    mutationFn: signUpFn,
    onError: errorFn,
  });
};

export { useSignUpMutation };
