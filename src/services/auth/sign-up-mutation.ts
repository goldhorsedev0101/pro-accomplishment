// Types
import { SignUpPayloadT } from '@/types/auth/sign-up/sign-up-payload';
import { SignUpResponseT } from '@/types/auth/sign-up/sign-up-responsive';

// Mutation
import { useMutation } from '@tanstack/react-query';

// Axios
import axios from 'axios';

// Toast
import toast from 'react-hot-toast';

// URL
import { URLS } from '../base-url';

const useSignUpMutation = () => {
  const signUpFn = async (payload: SignUpPayloadT): Promise<SignUpResponseT> => {
    const res: SignUpResponseT = await axios.post(URLS.SIGN_UP, payload);
    return res;
  };

  return useMutation({
    mutationFn: signUpFn,
    onSuccess: () => toast.success('Sign up successfully'),
    onError: () => toast.error('Sign up failed'),
  });
};

export { useSignUpMutation };
