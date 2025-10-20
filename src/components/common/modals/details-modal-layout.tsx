'use client';

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';
import Box from '../box';
import Heading from '../heading';

interface IProps {
  title: string;
  trigger: React.ReactNode;
  children: React.ReactNode;
  isHeader?: boolean;
}

const DetailsModalLayout = ({ trigger, children, title, isHeader }: IProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Box className="!gap-y-4 !border-none !p-0">
      {isHeader && (
        <Heading className="!text-lg !text-neutral-grey-60 break-all" text={title} width="medium" />
      )}

      <Dialog onOpenChange={setIsOpen} open={isOpen}>
        <DialogTrigger className="outline-none"> {trigger}</DialogTrigger>
        <DialogContent
          className="!bg-[#E9EDEE] max-h-[70dvh] max-w-[764px] w-full overflow-y-auto outline-none rounded-[20px] !p-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          onInteractOutside={(e) => e.preventDefault()}
          onClick={() => setIsOpen(false)}
        >
          <DialogTitle className="hidden">Details</DialogTitle>
          {children}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default DetailsModalLayout;
