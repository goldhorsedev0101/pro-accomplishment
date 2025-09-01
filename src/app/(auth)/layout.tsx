// Component
import AuthLayout from '@/components/layouts/auth-layout';

// Type
import { JSX, ReactNode } from 'react';

const layout = ({ children }: { children: ReactNode }): JSX.Element => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default layout;
