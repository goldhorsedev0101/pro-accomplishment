// Types
import { SignInPayloadT } from '@/types/auth/sign-in/sign-in-payload';
import { SignInResponseT } from '@/types/auth/sign-in/sign-in-response';

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

const useSignInMutation = () => {
  const signInFn = async (payload: SignInPayloadT): Promise<SignInResponseT> => {
    const { data } = await axios.post(URLS.SIGN_IN, payload);
    return data as SignInResponseT;
  };

  return useMutation({
    onSuccess: ({ data }) => {
      const msg =
        data.code === 'verification_email_resend'
          ? 'Verification email has been sent'
          : 'Login successful';
      toast.success(msg);
    },
    mutationFn: signInFn,
    onError: errorFn,
  });
};

export { useSignInMutation };
