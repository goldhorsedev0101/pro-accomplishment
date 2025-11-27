// Types
import { SignInPayloadT } from '@/types/auth/sign-in/sign-in-payload';

// Mutation
import { useMutation } from '@tanstack/react-query';

// Axios
import axios from 'axios';

// Toast

// URL
import { URLS } from '../base-url';

// Util
import { errorFn } from '@/utils/error-fn';

const useDeleteCandidateMutation = () => {
  const signInFn = async (payload: SignInPayloadT): Promise<null> => {
    await axios.post(URLS.DELETE_CANDIDATE, payload);
    return null;
  };

  return useMutation({
    mutationFn: signInFn,
    onError: errorFn,
  });
};

export { useDeleteCandidateMutation };
