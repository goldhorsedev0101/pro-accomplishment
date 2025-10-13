'use client';

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
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
        <DialogTrigger className="outline-none"> {trigger}</DialogTrigger>
        <DialogContent
          className="!bg-[#E9EDEE] max-h-[70dvh] max-w-[764px] w-full overflow-y-auto outline-none rounded-[20px] !p-3"
          onInteractOutside={(e) => e.preventDefault()}
          onClick={() => setIsOpen(false)}
        >
          <DialogTitle className="hidden">Details</DialogTitle>
          {children}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default DetailsModalLayout;
