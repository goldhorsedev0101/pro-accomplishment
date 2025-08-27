import CategoryView from '@/views/pages/Category';

const CategoryPage = async ({ params }: { params: { category: string } }) => {
  const { category } = await params;
  return <CategoryView category={category} />;
};

export default CategoryPage;
