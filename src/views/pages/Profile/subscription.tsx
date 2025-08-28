import check from '@/../public/icons/check.svg';
import Box from '@/components/common/box';
import Heading from '@/components/common/heading';
import BasicModal from '@/components/common/modals/basic-modal';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { plans } from '@/constants/plans';
import Image from 'next/image';

const Subscription = () => {
  return (
    <div className="space-y-6">
      <Box>
        <Heading text="Subscription" width="medium" size="31" />

        <p className="font-normal text-sm !text-neutral-grey-80">
          You’re subscribed -
          <span className="text-base font-medium text-neutral-grey-100"> $29/month</span>
        </p>

        <div className="flex flex-col gap-y-4">
          {plans.map((benefit, i) => (
            <div key={i} className={`flex items-center gap-x-3`}>
              <Image src={check} alt="check" width={24} height={24} />
              <p className="text-sm font-normal text-secondary">{benefit}</p>
            </div>
          ))}
        </div>
      </Box>

      <BasicModal
        trigger={{
          className: 'text-red font-medium text-base w-fit',
          child: 'Cancel Subscription',
        }}
        title={{
          title: 'Are you sure you want to Cancel Subscription?',
          className: 'text-center',
        }}
        footer={
          <DialogClose asChild>
            <Button variant={'destructive'} className="w-full bg-red h-14 rounded-xl">
              Cancel
            </Button>
          </DialogClose>
        }
      />
    </div>
  );
};

export default Subscription;
