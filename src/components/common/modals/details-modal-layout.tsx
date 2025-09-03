import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

const DetailsModalLayout = () => {
  return (
    <Dialog>
      <DialogTrigger>lorem</DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className="bg-neutral-grey-0"
        showCloseButton={false}
      >
        <p className="absolute top-0">lorem</p>
        <DialogHeader>
          <DialogTitle className={cn('text-neutral-grey-90 font-medium text-25')}></DialogTitle>
        </DialogHeader>
        <DialogFooter className="w-full"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsModalLayout;
