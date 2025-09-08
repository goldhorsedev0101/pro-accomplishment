// View
import VerifyEmailView from '@/views/auth/Verify-Email';

// Types
import { Metadata } from 'next';
import { JSX } from 'react';

export const metadata: Metadata = { title: 'Verify Email - Accomplishment' };

const VerifyEmailPage = (): JSX.Element => <VerifyEmailView />;

export default VerifyEmailPage;
