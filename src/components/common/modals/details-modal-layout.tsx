'use client';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Fragment, useState } from 'react';

interface IProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
}

const DetailsModalLayout = ({ trigger, children }: IProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Fragment>
      <Dialog onOpenChange={setIsOpen} open={isOpen}>
        <DialogTrigger>{trigger}</DialogTrigger>
        <DialogContent
          className="bg-neutral-grey-0 max-h-[836px] max-w-[764px] w-full overflow-y-auto"
          onInteractOutside={(e) => e.preventDefault()}
          onClick={() => setIsOpen(false)}
          showCloseButton={false}
        >
          {children}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default DetailsModalLayout;
