'use client';

import BasicModal from '@/components/common/modals/basic-modal';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';

interface IProps {
  children: React.ReactNode;
}

async function isInternetConnectionWorking() {
  if (!navigator.onLine) return false;

  const headers = new Headers();
  headers.append('cache-control', 'no-cache');
  headers.append('pragma', 'no-cache');

  try {
    await fetch(window.location.origin, { method: 'HEAD', headers, cache: 'no-store' });
    return true;
  } catch (error) {
    if (error instanceof TypeError) return false;
    throw error;
  }
}

const ListenNetworkProvider = ({ children }: IProps) => {
  const [isOffline, setIsOffline] = useState<boolean>(false);

  const { refresh } = useRouter();
  useEffect(() => {
    const checkConnection = async () => {
      const isConnected = await isInternetConnectionWorking();
      setIsOffline(!isConnected);
    };

    checkConnection();

    window.addEventListener('online', checkConnection);
    window.addEventListener('offline', checkConnection);

    return () => {
      window.removeEventListener('online', checkConnection);
      window.removeEventListener('offline', checkConnection);
    };
  }, []);

  if (isOffline) {
    return (
      <div className="h-full w-full">
        <BasicModal
          isOpen={true}
          setIsOpen={refresh}
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

  return <Fragment>{children}</Fragment>;
};

export default ListenNetworkProvider;
