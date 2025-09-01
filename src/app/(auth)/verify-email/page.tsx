// View
import VerifyEmailView from '@/views/auth/Verify-Email';

// Types
import { Metadata } from 'next';
import { JSX } from 'react';

export const metadata: Metadata = { title: 'Verify Email - Accomplishment' };

const VerifyEmailPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ email: string | undefined; route: string | undefined }>;
}): Promise<JSX.Element> => {
  const { email, route } = await searchParams;
  return <VerifyEmailView email={email || 'alex@example.com'} route={route || 'register'} />;
};

export default VerifyEmailPage;
