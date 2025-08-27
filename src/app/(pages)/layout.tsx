import Navbar from '@/components/common/navbar';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col overflow-y-auto min-h-screen gap-y-12">
      <Navbar />
      <div className="px-6 sm:px-10 md:px-20 pb-20">{children}</div>
    </div>
  );
};

export default Layout;
