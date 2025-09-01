// View
import SignInView from '@/views/auth/Sign-In';

// Types
import { Metadata } from 'next';
import { JSX } from 'react';

export const metadata: Metadata = { title: 'Sign In - Accomplishment' };

const SignInPage = (): JSX.Element => <SignInView />;

export default SignInPage;
