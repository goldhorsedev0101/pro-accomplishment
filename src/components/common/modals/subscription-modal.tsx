'use client';

// Components
import Image from 'next/image';
import BasicModal from './basic-modal';

// Types
import { Fragment, JSX } from 'react';

// Icons
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { useGetSubscriptionInfoQuery } from '@/services/others/stripe/get-subscription-info';
import { useRouter, useSearchParams } from 'next/navigation';
import checkIcon from 'public/icons/check.svg';
import subscriptionBadge from 'public/icons/subscription-badge.svg';

const SubscriptionModal = (): JSX.Element => {
  const isSuccess = useSearchParams().get('isSuccess');
  const { push } = useRouter();

  const { data } = useGetSubscriptionInfoQuery();
  const { redirection_url } = data?.data || { redirection_url: '' };

  const features = [
    'Unlimited access to student profiles',
    'Download structured accomplishment summaries',
    'Filter by GPA, leadership, extracurricular & more',
    'Scan QR codes to instantly view student summaries',
  ];

  if (isSuccess === 'true' || isSuccess === 'false') return <Fragment></Fragment>;

  return (
    <BasicModal
      isOpen={!!data?.data}
      showCloseButton={false}
      showCloseButton2={false}
      trigger={{ child: null }}
      footer={
        <div className="flex flex-col gap-y-5 w-full">
          <Image src={subscriptionBadge} alt="" className="self-center" height={116} width={116} />
          <h2 className="text-neutral-grey-90 font-medium text-25 text-center px-6">
            Subscription Plan
          </h2>
          <p className="text-gray text-center text-lg px-6">
            Upgrade to Pro for just <span className="font-semibold text-black">$29/month</span> and
            unlock full access to student profiles
          </p>

          <div className="flex flex-col gap-y-2">
            {features.map((feature, index) => (
              <p key={index} className="text-gray text-sm flex items-center gap-x-2">
                <Image src={checkIcon} alt="" width={24} height={24} />
                {feature}
              </p>
            ))}
          </div>

          <DialogClose asChild>
            <Button className="w-full h-14 rounded-xl" onClick={() => push(redirection_url)}>
              Subscribe
            </Button>
          </DialogClose>
        </div>
      }
    />
  );
};

export default SubscriptionModal;
