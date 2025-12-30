import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export const errorFn = ({ response }: AxiosError<{ error: string }>): string => {
  const error = typeof response?.data?.error === 'string' ? response?.data?.error : '';
  if (error) toast.error(error);
  return error;
};
