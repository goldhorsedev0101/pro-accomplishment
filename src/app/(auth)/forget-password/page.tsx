// View
import ForgetPasswordView from '@/views/auth/Forget-Password';

// Types
import { Metadata } from 'next';
import { JSX } from 'react';

export const metadata: Metadata = { title: 'Forget Password - Accomplishment' };

const ForgetPasswordPage = (): JSX.Element => <ForgetPasswordView />;

export default ForgetPasswordPage;
