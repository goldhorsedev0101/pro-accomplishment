// Types
import { UploadPayloadT } from '@/types/others/upload/upload-payload';
import { UploadResponseT } from '@/types/others/upload/upload-responsive';

// Mutation
import { useMutation } from '@tanstack/react-query';

// Axios
import axios from 'axios';

// Toast
import toast from 'react-hot-toast';

// URL
import { errorFn } from '@/utils/error-fn';

// Util
import { URLS } from '../base-url';

const useUploadMutation = () => {
  const uploadFn = async (payload: UploadPayloadT): Promise<UploadResponseT> => {
    const { data } = await axios.post(URLS.IMAGE_UPLOADER, payload);
    return data as UploadResponseT;
  };

  return useMutation({
    onSuccess: () => toast.success('Image uploaded successful'),
    mutationFn: uploadFn,
    onError: errorFn,
  });
};

export { useUploadMutation };
