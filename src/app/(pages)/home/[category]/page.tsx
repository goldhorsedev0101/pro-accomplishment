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
  searchParams: Promise<{ name: string; isSub: string }>;
}): Promise<JSX.Element> => {
  const { category } = await params;
  const { name, isSub } = await searchParams;

  const isBool = isSub === 'true' ? true : false;

  return <CategoryView category={category} name={name} isSub={isBool} />;
};

export default CategoryPage;
