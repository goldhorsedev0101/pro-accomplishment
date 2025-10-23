'use client';

import BasicModal from '@/components/common/modals/basic-modal';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { listenNetworkStatus } from '@/utils/listen-network-status';
// import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface IProps {
  children: React.ReactNode;
}

const ListenNetworkProvider = ({ children }: IProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const queryClient = useQueryClient();
  const router = useRouter();

  const { refresh } = router;

  useEffect(() => {
    const unsubscribe = listenNetworkStatus(
      async () => {
        setIsOpen(false);
        // refresh();
        // queryClient.invalidateQueries();
      },
      () => setIsOpen(true),
    );
    return unsubscribe;
  }, []);

  if (isOpen) {
    return (
      <div className="h-full w-full">
        <BasicModal
          isOpen={isOpen}
          setIsOpen={(e) => {
            // setIsOpen(e);
            // refresh();
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
  }
  return <div>{children}</div>;
};

export default ListenNetworkProvider;
