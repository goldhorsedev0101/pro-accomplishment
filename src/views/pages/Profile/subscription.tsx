// Icons
import check from 'public/icons/check.svg';

// Components
import Box from '@/components/common/box';
import Heading from '@/components/common/heading';
import Loader from '@/components/common/loader';

// Constant
import { plans } from '@/constants/plans';

// Tag
import Image from 'next/image';

// Types
import DeleteModal from '@/components/common/modals/delete-modal';
import { useCancelSubscriptionMutation } from '@/services/others/stripe/cancel-subscription';
import { useGetSubscriptionInfoQuery } from '@/services/others/stripe/get-subscription-info';
import { GetProfileResponseT } from '@/types/others/profile/get-recruiter-profile/get-profile-response';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { FC, JSX } from 'react';

interface IProps {
  subscription?: GetProfileResponseT['data']['subscription'];
}

const Subscription: FC<IProps> = ({ subscription }): JSX.Element => {
  const { status } = subscription || {};
  const { push } = useRouter();

  const { data, isLoading } = useGetSubscriptionInfoQuery();
  const { redirection_url } = data?.data || { redirection_url: '' };

  const { mutateAsync } = useCancelSubscriptionMutation();

  const handleCancelSubscription = async () => {
    try {
      await mutateAsync();
    } catch (error) {
      console.log('🚀 ~ handleCancelSubscription ~ error:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Box>
        <Heading text="Subscription" width="medium" size="31" />

        <p className="font-normal text-sm !text-neutral-grey-80">
          You’re subscribed -
          <span className="text-base font-medium text-neutral-grey-100"> $19.99/month</span>
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

      {status !== 'canceled' ? (
        <DeleteModal
          btnText="Cancel"
          triggerText="Cancel Subscription"
          onClick={handleCancelSubscription}
          title="Are you sure you want to Cancel Subscription?"
        />
      ) : (
        <p className="text-sm font-medium text-neutral-grey-100">
          Cancellation scheduled for {dayjs(subscription?.current_period_end).format('MM-DD-YYYY')}.
          <br />
          {redirection_url && (
            <span
              className="text-primary text-base font-medium cursor-pointer"
              onClick={() => push(redirection_url)}
            >
              {' '}
              Subscribe
            </span>
          )}
        </p>
      )}
    </div>
  );
};

export default Subscription;
