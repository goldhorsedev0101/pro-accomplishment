// Types
import { ResetPasswordPayloadT } from '@/types/auth/reset-password/reset-password-payload';
import { ResetPasswordResponseT } from '@/types/auth/reset-password/reset-password-responsive';

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

const useResetPasswordMutation = () => {
  const resetPasswordFn = async (
    payload: ResetPasswordPayloadT,
  ): Promise<ResetPasswordResponseT> => {
    const { data } = await axios.post(URLS.RESET_PASSWORD, payload);
    return data as ResetPasswordResponseT;
  };

  return useMutation({
    onSuccess: () => toast.success('Password reset successfully'),
    mutationFn: resetPasswordFn,
    onError: getError,
  });
};

export { useResetPasswordMutation };
