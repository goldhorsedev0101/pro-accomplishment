import StudentDetails from '@/views/pages/Student-Details';

const DetailsPage = async ({ params }: { params: { category: string; id: string } }) => {
  const { category, id } = await params;

  return <StudentDetails category={category} id={id} />;
};

export default DetailsPage;
