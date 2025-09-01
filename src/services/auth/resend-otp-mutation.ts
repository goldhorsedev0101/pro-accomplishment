import { ForgetPasswordPayloadT } from '@/types/auth/forget-password/forget-password-payload';
import { ForgetPasswordResponseT } from '@/types/auth/forget-password/forget-password-responsive';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { URLS } from '../base-url';

const useResendOTPMutation = () => {
  const resendOTPFn = async (payload: ForgetPasswordPayloadT): Promise<ForgetPasswordResponseT> => {
    const res: ForgetPasswordResponseT = await axios.post(URLS.RESEND_OTP, payload);
    return res;
  };

  return useMutation({
    mutationFn: resendOTPFn,
    onSuccess: () => toast.success('OTP sent successfully'),
    onError: () => toast.error('Failed to send OTP'),
  });
};

export { useResendOTPMutation };
