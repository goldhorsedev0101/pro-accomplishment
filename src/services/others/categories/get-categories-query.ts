// Types
import { GetCategoriesResponseT } from '@/types/others/categories/get-categories/get-categories-response';

// Mutation
import { useQuery } from '@tanstack/react-query';

// Axios
import axios from 'axios';

// URL
import { Categories } from '@/constants/catehories';
import { URLS } from '@/services/base-url';

// Categories
const useGetCategoriesQuery = () => {
  const getCategoriesFn = async (): Promise<GetCategoriesResponseT> => {
    const { data } = await axios.get(URLS.GET_CATEGORIES);
    return data as GetCategoriesResponseT;
  };

  return useQuery({
    initialData: { data: Categories, error: null, message: '' },
    queryKey: ['get-categories'],
    queryFn: getCategoriesFn,
  });
};

export { useGetCategoriesQuery };
