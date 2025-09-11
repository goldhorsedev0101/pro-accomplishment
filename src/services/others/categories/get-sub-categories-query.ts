// Types
import { GetSubCategoriesResponseT } from '@/types/others/categories/get-sub-categories/get-sub-categories-response';

// Mutation
import { useQuery } from '@tanstack/react-query';

// Axios
import axios from 'axios';

// URL
import { URLS } from '@/services/base-url';

// Categories
const useGetSubCategoriesQuery = ({ categoryId }: { categoryId: string }) => {
  const getSubCategoriesFn = async (): Promise<GetSubCategoriesResponseT> => {
    const { data } = await axios.get(URLS.GET_SUB_CATEGORIES, { params: { categoryId } });
    return data as GetSubCategoriesResponseT;
  };

  return useQuery({
    queryKey: ['get-sub-categories', categoryId],
    queryFn: getSubCategoriesFn,
    retry: false,
  });
};

export { useGetSubCategoriesQuery };
