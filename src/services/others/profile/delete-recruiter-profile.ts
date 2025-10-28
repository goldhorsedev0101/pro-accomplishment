// Mutation
import { useMutation, useQueryClient } from '@tanstack/react-query';

// Axios
import axios from 'axios';

// Toast
import toast from 'react-hot-toast';

// URL
import { URLS } from '@/services/base-url';

// Util
import { errorFn } from '@/utils/error-fn';

const useDeleteProfileMutation = () => {
  const queryClient = useQueryClient();

  const deleteProfileFn = async (): Promise<{ message: string }> => {
    const { data } = await axios.delete(URLS.DELETE_RECRUITER_PROFILE);
    return data;
  };

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-profile'], type: 'all' });
      toast.success('Profile Deleted successfully');
    },
    mutationFn: deleteProfileFn,
    onError: errorFn,
  });
};

export { useDeleteProfileMutation };
