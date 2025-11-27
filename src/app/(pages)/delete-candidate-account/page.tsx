// View
import DeleteCandidateAccount from '@/views/pages/Delete-Candidate-Account';

// Types
import { Metadata } from 'next';
import { JSX } from 'react';

export const metadata: Metadata = { title: 'Delete Account' };

const Page = (): JSX.Element => <DeleteCandidateAccount />;

export default Page;
