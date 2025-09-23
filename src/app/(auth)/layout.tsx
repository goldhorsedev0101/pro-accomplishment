// Component
import AuthLayout from '@/components/layouts/auth-layout';

// Context
import { AuthProvider } from '@/context/auth.context';

// Type
import { JSX, ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <AuthProvider>
      <AuthLayout>{children}</AuthLayout>
    </AuthProvider>
  );
};

export default Layout;
