'use client';

// Components
import Image from 'next/image';
import BasicModal from './basic-modal';

// Types
import { JSX, useEffect, useState } from 'react';

// Icons
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { useAuth } from '@/context/auth.context';
import { useGetProfileQuery } from '@/services/others/profile/get-recruiter-profile';
import { useGetSubscriptionInfoQuery } from '@/services/others/stripe/get-subscription-info';
import { useRouter, useSearchParams } from 'next/navigation';
import checkIcon from 'public/icons/check.svg';
import subscriptionBadge from 'public/icons/subscription-badge.svg';
import tickCircleIcon from 'public/icons/tick-circle.svg';

const features = [
  'Unlimited access to recruit profiles',
  'Download structured accomplishment folios',
  'Filter by GPA, leadership, extracurricular & more',
  'Scan QR codes to instantly view recruit folios',
];

const SubscriptionModal = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isSuccess = useSearchParams().get('isSuccess') === 'true';
  const { push } = useRouter();
  const { handleLogout } = useAuth();

  const { data } = useGetSubscriptionInfoQuery();
  const { redirection_url } = data?.data || { redirection_url: '' };

  const { data: profile } = useGetProfileQuery();
  const { subscription } = profile?.data || {};

  const handleDone = () => {
    setIsOpen(false);
    push('/home');
  };

  useEffect(() => {
    if (subscription === undefined) return;
    if (subscription == null || subscription?.status === 'expired') setIsOpen(true);
    if (isSuccess) setIsOpen(true);
  }, [profile]);

  return (
    <BasicModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      showCloseButton={false}
      showCloseButton2={false}
      footer={
        <div className="flex flex-col gap-y-5 w-full">
          <Image
            src={isSuccess ? tickCircleIcon : subscriptionBadge}
            alt=""
            className="self-center"
            height={116}
            width={116}
          />
          <h2 className="text-neutral-grey-90 font-medium text-25 text-center px-6">
            {isSuccess ? 'Subscribed Successfully' : 'Subscription Plan'}
          </h2>

          {isSuccess ? (
            <p className="text-gray text-center text-lg px-6">
              You have been subscribed successfully
            </p>
          ) : (
            <p className="text-gray text-center text-lg px-6">
              Upgrade to Pro for just <span className="font-semibold text-black">$19.99/month</span>{' '}
              and unlock full access to Recruit profiles
            </p>
          )}

          {!isSuccess && (
            <div className="flex flex-col gap-y-2">
              {features.map((feature, index) => (
                <p key={index} className="text-gray text-sm flex items-center gap-x-2">
                  <Image src={checkIcon} alt="" width={24} height={24} />
                  {feature}
                </p>
              ))}
            </div>
          )}

          <div className={`grid ${isSuccess ? 'grid-cols-1' : 'grid-cols-2'} items-center gap-x-6`}>
            <DialogClose asChild>
              <Button
                className="h-14 rounded-xl w-full"
                onClick={() => (!isSuccess ? push(redirection_url) : handleDone())}
              >
                {isSuccess ? 'Done' : 'Subscribe'}
              </Button>
            </DialogClose>

            {!isSuccess && (
              <Button
                variant={'outline'}
                onClick={() => handleLogout()}
                className="h-14 rounded-xl w-full"
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      }
    />
  );
};

export default SubscriptionModal;
