'use client';
import BackButton from '@/components/common/back-button';
import Heading from '@/components/common/heading';
import { useFormik } from 'formik';
import { FC } from 'react';

import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import Routes from '@/constants/routes';
import { useRouter } from 'next/navigation';

interface IProps {
  email: string;
  route: string;
}

const VerifyEmailView: FC<IProps> = ({ email, route }) => {
  const { push } = useRouter();
  const { home, resetPassword } = Routes;

  const { handleSubmit, setFieldValue, values } = useFormik({
    initialValues: { email, otp: '' },
    onSubmit: () => push(route === 'password' ? resetPassword : home),
  });

  const handleResend = () => {};

  return (
    <form className="flex flex-col gap-y-6" onSubmit={handleSubmit}>
      <BackButton />
      <div>
        <Heading text="Enter Verification Code" />
        <p className="font-medium text-base text-secondary">
          We&rsquo;ve sent a 6-digit code to <span className="text-primary">alex@example.com</span>{' '}
          Enter it below to verify your email and continue.
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

      <Button type="submit">Verify</Button>

      <div className="flex items-center gap-x-1 w-full justify-center -mt-4">
        <p className="font-normal">Didn&rsquo;t receive code?</p>
        <Button
          className="w-fit p-0 underline text-base font-semibold"
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
