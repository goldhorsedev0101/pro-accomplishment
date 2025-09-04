import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export const getError = ({ response }: AxiosError<{ error: string }>): string => {
  const error = response?.data?.error as string;
  toast.error(error);
  return error;
};
