// Types
import { EditProfilePayloadT } from '@/types/others/profile/edit-recruiter-profile/edit-profile-payload';
import { EditProfileResponseT } from '@/types/others/profile/edit-recruiter-profile/edit-profile-response';

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

const useEditProfileMutation = () => {
  const queryClient = useQueryClient();

  const editProfileFn = async (payload: EditProfilePayloadT): Promise<EditProfileResponseT> => {
    const { data } = await axios.put(URLS.EDIT_RECRUITER_PROFILE, payload);
    return data as EditProfileResponseT;
  };

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-profile'] });
      toast.success('Profile updated successfully');
    },
    mutationFn: editProfileFn,
    onError: errorFn,
  });
};

export { useEditProfileMutation };
