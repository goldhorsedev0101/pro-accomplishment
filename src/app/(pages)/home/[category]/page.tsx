// View
import CategoryView from '@/views/pages/Category';

// Types
import { IParams } from '@/types/params.type';
import { Metadata } from 'next';
import { JSX } from 'react';

export const metadata: Metadata = { title: 'Category - Accomplishment' };

const CategoryPage = async ({ params }: { params: Promise<IParams> }): Promise<JSX.Element> => {
  const { category } = await params;
  return <CategoryView category={category} />;
};

export default CategoryPage;
