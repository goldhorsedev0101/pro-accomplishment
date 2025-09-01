// Components
import Navbar from '@/components/common/navbar';

// Type
import { JSX, ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <div className="flex flex-col overflow-y-auto min-h-screen gap-y-12">
      <Navbar />
      <div className="px-6 sm:px-10 md:px-20 pb-20">{children}</div>
    </div>
  );
};

export default Layout;
