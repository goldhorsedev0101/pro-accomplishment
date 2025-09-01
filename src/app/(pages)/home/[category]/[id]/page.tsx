// View
import StudentDetails from '@/views/pages/Student-Details';

// Types
import { IParams } from '@/types/params.type';
import { Metadata } from 'next';
import { JSX } from 'react';

export const metadata: Metadata = { title: 'Student Details - Accomplishment' };

const DetailsPage = async ({ params }: { params: Promise<IParams> }): Promise<JSX.Element> => {
  const { category, id } = await params;
  return <StudentDetails category={category} id={id} />;
};

export default DetailsPage;
