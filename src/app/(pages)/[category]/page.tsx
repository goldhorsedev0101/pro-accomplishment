import CategoryView from '@/views/pages/Category';

const CategoryPage = ({ params }: { params: { category: string } }) => (
  <CategoryView category={params.category} />
);

export default CategoryPage;
