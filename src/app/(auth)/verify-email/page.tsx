import VerifyEmailView from '@/views/auth/Verify-Email';
import { JSX } from 'react';

const VerifyEmailPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ email: string | undefined; route: string | undefined }>;
}): Promise<JSX.Element> => {
  const { email, route } = await searchParams;
  return <VerifyEmailView email={email || 'alex@example.com'} route={route || 'register'} />;
};

export default VerifyEmailPage;
