// Types
import { VerifyEmailPayloadT } from '@/types/auth/verify-email/verify-email-payload';
import { VerifyEmailResponseT } from '@/types/auth/verify-email/verify-email-response';

// Mutation
import { useMutation } from '@tanstack/react-query';

// Axios
import axios from 'axios';

// Toast
import toast from 'react-hot-toast';

// URL
import { URLS } from '../base-url';

const useVerifyEmailMutation = () => {
  const verifyEmailFn = async (payload: VerifyEmailPayloadT): Promise<VerifyEmailResponseT> => {
    const res: VerifyEmailResponseT = await axios.post(URLS.VERIFY_EMAIL, payload);
    return res;
  };

  return useMutation({
    mutationFn: verifyEmailFn,
    onSuccess: () => toast.success('Email verified successful'),
    onError: () => toast.error('Email verification failed'),
  });
};

export { useVerifyEmailMutation };
