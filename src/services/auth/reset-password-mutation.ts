import { ResetPasswordPayloadT } from '@/types/auth/reset-password/reset-password-payload';
import { ResetPasswordResponseT } from '@/types/auth/reset-password/reset-password-responsive';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { URLS } from '../base-url';

const useResetPasswordMutation = () => {
  const resetPasswordFn = async (
    payload: ResetPasswordPayloadT,
  ): Promise<ResetPasswordResponseT> => {
    const res: ResetPasswordResponseT = await axios.post(URLS.RESET_PASSWORD, payload);
    return res;
  };

  return useMutation({
    mutationFn: resetPasswordFn,
    onSuccess: () => toast.success('Password reset successfully'),
    onError: () => toast.error('Password reset failed'),
  });
};

export { useResetPasswordMutation };
