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

const useResendOTPMutation = () => {
  const resendOTPFn = async (payload: ForgetPasswordPayloadT): Promise<ForgetPasswordResponseT> => {
    const { data } = await axios.post(URLS.RESEND_OTP, payload);
    return data as ForgetPasswordResponseT;
  };

  return useMutation({
    onSuccess: () => toast.success('OTP sent successfully'),
    mutationFn: resendOTPFn,
    onError: errorFn,
  });
};

export { useResendOTPMutation };
