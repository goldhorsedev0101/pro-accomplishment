import VerifyEmailView from '@/views/auth/Verify-Email';
import { JSX } from 'react';

const VerifyEmailPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ email: string | undefined }>;
}): Promise<JSX.Element> => {
  const { email } = await searchParams;
  return <VerifyEmailView email={email || 'alex@example.com'} />;
};

export default VerifyEmailPage;
