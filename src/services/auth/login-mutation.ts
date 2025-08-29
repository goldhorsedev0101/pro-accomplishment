import { SignInPayload } from '@/types/auth/sign-in/payload';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { URLS } from '../base-url';
import { SignInResponse } from './sign-in-responsive';

const useLoginMutation = () => {
  const loginFn = async (payload: SignInPayload): Promise<SignInResponse> => {
    const res: SignInResponse = await axios.post(URLS.LOGIN, payload);
    return res;
  };

  return useMutation({
    mutationFn: loginFn,
    onSuccess: () => toast.success('Login successful'),
    onError: () => toast.error('Login failed'),
  });
};

export { useLoginMutation };
