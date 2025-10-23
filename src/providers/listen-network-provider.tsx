'use client';

import BasicModal from '@/components/common/modals/basic-modal';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { listenNetworkStatus } from '@/utils/listen-network-status';
import { useEffect, useState } from 'react';

interface IProps {
  children: React.ReactNode;
}

const ListenNetworkProvider = ({ children }: IProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(!navigator.onLine);

  useEffect(() => {
    // Listen to online/offline changes
    const unsubscribe = listenNetworkStatus(
      () => setIsOpen(false),
      () => setIsOpen(true),
    );

    // Handle browser "back/forward" navigation restoring state
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setIsOpen(!navigator.onLine);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      unsubscribe();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  if (isOpen) {
    return (
      <div className="h-full w-full">
        <BasicModal
          isOpen={isOpen}
          setIsOpen={() => {}}
          trigger={{ child: null }}
          title={{
            title: 'Please check your internet connection',
            className: 'text-center',
          }}
          footer={
            <div className="flex flex-col gap-y-3 w-full">
              <p className="text-neutral-grey-100 font-medium text-center select-none">
                Click retry once you are back online
              </p>
              <DialogClose asChild>
                <Button onClick={() => window.location.reload()} className="w-full h-14 rounded-xl">
                  Retry
                </Button>
              </DialogClose>
            </div>
          }
        />
      </div>
    );
  }

  return <>{children}</>;
};

export default ListenNetworkProvider;
