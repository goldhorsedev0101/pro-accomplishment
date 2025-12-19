// Components
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

// Utils
import { cn } from '@/lib/utils';

// Types
import { FC, JSX, ReactNode } from 'react';

interface IProps {
  trigger: { className?: string; child: ReactNode };
  title?: { className?: string; title: string };
  setIsOpen?: (v: boolean) => void;
  showCloseButton2?: boolean;
  showCloseButton?: boolean;
  footer?: ReactNode;
  isOpen?: boolean;
}

const BasicModal: FC<IProps> = ({
  trigger,
  title,
  footer,
  isOpen,
  setIsOpen,
  showCloseButton2,
  showCloseButton,
}): JSX.Element => {
  return (
    <Dialog open={isOpen}>
      <DialogTrigger onClick={() => setIsOpen?.(!isOpen)} className={cn(trigger.className)}>
        {trigger.child}
      </DialogTrigger>
      <DialogContent
        showCloseButton={showCloseButton2}
        showCloseButton2={showCloseButton}
        className="bg-neutral-grey-0"
        onClick={() => setIsOpen?.(false)}
      >
        {title && (
          <DialogHeader>
            <DialogTitle
              className={cn(title.className, 'text-neutral-grey-90 font-medium text-25')}
            >
              {title.title}
            </DialogTitle>
          </DialogHeader>
        )}
        {footer && <DialogFooter className="w-full">{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};

export default BasicModal;
