'use client';

import BasicModal from '@/components/common/modals/basic-modal';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { listenNetworkStatus } from '@/utils/listen-network-status';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface IProps {
  children: React.ReactNode;
}

const ListenNetworkProvider = ({ children }: IProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  const { refresh } = router;
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const updateStatus = () => setIsOnline(navigator.onLine);

    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);

    updateStatus(); // initialize state

    return () => {
      window.removeEventListener('online', updateStatus);
      window.removeEventListener('offline', updateStatus);
    };
  }, []);

  if(isOnline){
    return <div className="">Please check your internet connection</div>;
  }


  return (
    <div>
      {children}

      <BasicModal
        isOpen={isOpen}
        setIsOpen={(e) => {
          setIsOpen(e);
          refresh();
        }}
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
              <Button onClick={refresh} className="w-full h-14 rounded-xl">
                Retry
              </Button>
            </DialogClose>
          </div>
        }
      />
    </div>
  );
};

export default ListenNetworkProvider;
