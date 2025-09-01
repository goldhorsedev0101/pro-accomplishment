import { SignUpPayloadT } from '@/types/auth/sign-up/sign-up-payload';
import { SignUpResponseT } from '@/types/auth/sign-up/sign-up-responsive';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
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
