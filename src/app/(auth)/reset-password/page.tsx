// View
import ResetPasswordView from '@/views/auth/Reset-Password';

// Types
import { Metadata } from 'next';
import { JSX } from 'react';

export const metadata: Metadata = { title: 'Reset Password - Accomplishment' };

const ResetPasswordPage = (): JSX.Element => <ResetPasswordView />;

export default ResetPasswordPage;
