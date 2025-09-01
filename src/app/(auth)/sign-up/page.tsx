// View
import SignUpView from '@/views/auth/Sign-Up';

// Types
import { Metadata } from 'next';
import { JSX } from 'react';

export const metadata: Metadata = { title: 'Sign Up - Accomplishment' };

const SignUpPage = (): JSX.Element => <SignUpView />;

export default SignUpPage;
