// View
import VerifyEmailView from '@/views/auth/Verify-Email';

// Enum
import { Verification_Type_Enum } from '@/enum/verification-type.enum';

// Types
import { Metadata } from 'next';
import { JSX } from 'react';

export const metadata: Metadata = { title: 'Verify Email - Accomplishment' };

const VerifyEmailPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ email: string | undefined; route: Verification_Type_Enum | undefined }>;
}): Promise<JSX.Element> => {
  const { email, route } = await searchParams;
  return (
    <VerifyEmailView
      email={email || 'alex@example.com'}
      route={route || Verification_Type_Enum.SIGNUP}
    />
  );
};

export default VerifyEmailPage;
