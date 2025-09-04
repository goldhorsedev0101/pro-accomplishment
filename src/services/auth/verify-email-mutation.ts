// Types
import { VerifyOtpPayloadT } from '@/types/auth/verify-otp/verify-otp-payload';
import { VerifyOtpResponseT } from '@/types/auth/verify-otp/verify-otp-response';

// Mutation
import { useMutation } from '@tanstack/react-query';

// Axios
import axios from 'axios';

// Toast
import toast from 'react-hot-toast';

// URL
import { URLS } from '../base-url';

// Util
import { getError } from '@/utils/get-error';

const useVerifyOTPMutation = () => {
  const verifyOTPFn = async (payload: VerifyOtpPayloadT): Promise<VerifyOtpResponseT> => {
    const { data } = await axios.post(URLS.VERIFY_OTP, payload);
    return data as VerifyOtpResponseT;
  };

  return useMutation({
    onSuccess: () => toast.success('OTP verified successful'),
    mutationFn: verifyOTPFn,
    onError: getError,
  });
};

export { useVerifyOTPMutation };
