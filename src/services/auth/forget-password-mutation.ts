// Types
import { ForgetPasswordPayloadT } from '@/types/auth/forget-password/forget-password-payload';
import { ForgetPasswordResponseT } from '@/types/auth/forget-password/forget-password-response';

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

const useForgetPasswordMutation = () => {
  const forgetPasswordFn = async (
    payload: ForgetPasswordPayloadT,
  ): Promise<ForgetPasswordResponseT> => {
    const { data } = await axios.post(URLS.FORGET_PASSWORD, payload);
    return data as ForgetPasswordResponseT;
  };

  return useMutation({
    onSuccess: () => toast.success('OTP send successfully'),
    mutationFn: forgetPasswordFn,
    onError: errorFn,
  });
};

export { useForgetPasswordMutation };
