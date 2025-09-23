// Types
import { ToggleFavoritePayloadT } from '@/types/others/toggle-favorite-candidate/toggle-favorite-payload';
import { ToggleFavoriteResponseT } from '@/types/others/toggle-favorite-candidate/toggle-favorite-response';

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

const useToggleFavoriteCandidateMutation = () => {
  const queryClient = useQueryClient();

  const toggleFn = async (payload: ToggleFavoritePayloadT): Promise<ToggleFavoriteResponseT> => {
    const { data } = await axios.post(URLS.TOGGLE_FAVORITE_CANDIDATE, payload);
    return data as ToggleFavoriteResponseT;
  };

  return useMutation({
    onSuccess: ({ data: { is_favorited } }) => {
      toast.success(
        is_favorited ? 'Candidate added to favorites' : 'Candidate removed from favorites',
      );

      queryClient.invalidateQueries({ queryKey: ['get-favorite-candidates'] });
    },
    mutationFn: toggleFn,
    onError: errorFn,
  });
};

export { useToggleFavoriteCandidateMutation };
