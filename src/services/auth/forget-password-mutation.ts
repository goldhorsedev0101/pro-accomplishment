// Types
import { ForgetPasswordPayloadT } from '@/types/auth/forget-password/forget-password-payload';
import { ForgetPasswordResponseT } from '@/types/auth/forget-password/forget-password-responsive';

// Mutation
import { useMutation } from '@tanstack/react-query';

// Axios
import axios from 'axios';

// Toast
import toast from 'react-hot-toast';

// URL
import { URLS } from '../base-url';

const useForgetPasswordMutation = () => {
  const forgetPasswordFn = async (
    payload: ForgetPasswordPayloadT,
  ): Promise<ForgetPasswordResponseT> => {
    const res: ForgetPasswordResponseT = await axios.post(URLS.FORGET_PASSWORD, payload);
    return res;
  };

  return useMutation({
    mutationFn: forgetPasswordFn,
    onSuccess: () => toast.success('OTP send successfully'),
    onError: () => toast.error('OTP send failed'),
  });
};

export { useForgetPasswordMutation };
