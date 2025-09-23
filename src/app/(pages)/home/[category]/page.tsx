// View
import CategoryView from '@/views/pages/Category';

// Types
import { IParams } from '@/types/params.type';
import { Metadata } from 'next';
import { JSX } from 'react';

export const metadata: Metadata = { title: 'Category - Accomplishment' };

const CategoryPage = async ({
  searchParams,
  params,
}: {
  params: Promise<IParams>;
  searchParams: Promise<{ name: string }>;
}): Promise<JSX.Element> => {
  const { category } = await params;
  const { name } = await searchParams;

  return <CategoryView category={category} name={name} />;
};

export default CategoryPage;
