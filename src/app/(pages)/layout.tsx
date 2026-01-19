// Components
import SubscriptionModal from '@/components/common/modals/subscription-modal';
import Navbar from '@/components/common/navbar';

// Type
import { JSX, ReactNode, Suspense } from 'react';

const Layout = async ({ children }: { children: ReactNode }): Promise<JSX.Element> => {
  return (
    <div className="flex flex-col min-h-screen gap-y-12">
      <Navbar />
      <div className="px-6 sm:px-10 md:px-20 pb-20">{children}</div>
      <Suspense>
        <SubscriptionModal />
      </Suspense>
    </div>
  );
};

export default Layout;
