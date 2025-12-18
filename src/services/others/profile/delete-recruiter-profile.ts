// Mutation
import { useMutation } from '@tanstack/react-query';

// Axios
import axios from 'axios';

// Toast

// URL
import { URLS } from '@/services/base-url';

// Util
import { errorFn } from '@/utils/error-fn';

const useDeleteProfileMutation = () => {
  const deleteProfileFn = async (): Promise<{ message: string }> => {
    const { data } = await axios.delete(URLS.DELETE_RECRUITER_PROFILE);
    return data;
  };

  return useMutation({
    // onSuccess: () => {
    //   const queryClient = useQueryClient();

    //   queryClient.invalidateQueries({ queryKey: ['get-profile'], refetchType: 'all' });
    //   toast.success('Profile Deleted successfully');
    // },
    mutationFn: deleteProfileFn,
    onError: errorFn,
  });
};

export { useDeleteProfileMutation };
