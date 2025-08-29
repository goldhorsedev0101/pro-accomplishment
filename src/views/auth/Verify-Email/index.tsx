'use client';
import BackButton from '@/components/common/back-button';
import Heading from '@/components/common/heading';
import { useFormik } from 'formik';
import { FC } from 'react';

import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import Routes from '@/constants/routes';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useTimer } from 'react-timer-hook';

interface IProps {
  email: string;
  route: string;
}

const VerifyEmailView: FC<IProps> = ({ email, route }) => {
  const { push, refresh } = useRouter();
  const { home, resetPassword } = Routes;

  const { handleSubmit, setFieldValue, values } = useFormik({
    initialValues: { email, otp: '' },
    onSubmit: ({ otp }) => {
      if (otp !== '000000') {
        toast.error('Invalid OTP');
        return;
      }

      if (route === 'password') push(resetPassword);
      else {
        setCookie('token', 'lorem');
        push(home);
        refresh();
      }
    },
  });

  const time = new Date();
  time.setSeconds(time.getSeconds() + 30);

  const { seconds } = useTimer({ expiryTimestamp: time, interval: 1000 });

  const handleResend = () => {};

  return (
    <form className="flex flex-col gap-y-6" onSubmit={handleSubmit}>
      <BackButton />
      <div>
        <Heading text="Enter Verification Code" />
        <p className="font-medium text-base text-secondary">
          We&rsquo;ve sent a 6-digit code to <span className="text-primary">{email}</span> Enter it
          below to verify your email and continue.
        </p>
      </div>
      <InputOTP maxLength={6} onChange={(e) => setFieldValue('otp', e)} value={values.otp}>
        <InputOTPGroup className="gap-x-3">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <InputOTPSlot
                key={index}
                index={index}
                className="w-[63px] h-[56px] rounded-md !border-[#DCE0E5]"
              />
            ))}
        </InputOTPGroup>
      </InputOTP>

      {seconds > 0 && <p className="text-primary text-sm font-medium text-center">00:{seconds}</p>}

      <Button type="submit">Verify</Button>
      <div className="flex items-center gap-x-1 w-full justify-center -mt-4">
        <p className="font-normal">Didn&rsquo;t receive code?</p>
        <Button
          className="w-fit p-0 underline text-base font-semibold"
          disabled={seconds > 0}
          onClick={handleResend}
          variant={'link'}
          type="button"
        >
          Resend
        </Button>
      </div>
    </form>
  );
};

export default VerifyEmailView;
