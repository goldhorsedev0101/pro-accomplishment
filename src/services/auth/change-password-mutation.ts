// Types
import { ResetPasswordResponseT } from '@/types/auth/reset-password/reset-password-response';

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

export type ChangePasswordPayloadT = {
  currentPassword: string;
  newPassword: string;
};

// Change
const useChangePasswordMutation = () => {
  const resetPasswordFn = async (
    payload: ChangePasswordPayloadT,
  ): Promise<ResetPasswordResponseT> => {
    const { data } = await axios.post(URLS.CHANGE_PASSWORD, payload);
    return data as ResetPasswordResponseT;
  };

  return useMutation({
    onSuccess: () => toast.success('Password Changed successfully'),
    mutationFn: resetPasswordFn,
    onError: errorFn,
  });
};

export { useChangePasswordMutation };
