'use client';

// Components
import BackButton from '@/components/common/back-button';
import Heading from '@/components/common/heading';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

// Constant
import Routes from '@/constants/routes';

// Mutation
import { useResendOTPMutation } from '@/services/auth/resend-otp-mutation';
import { useVerifyOTPMutation } from '@/services/auth/verify-email-mutation';

// Cookie
import { setCookie } from 'cookies-next';

// Formik
import { useFormik } from 'formik';

// Router
import { useRouter } from 'next/navigation';

// Types
import { JSX } from 'react';

// Enum
import { Verification_Type_Enum } from '@/enum/verification-type.enum';

// Hoot
import { useTimer } from 'react-timer-hook';

// Context
import { useAuth } from '@/context/auth.context';

const VerifyEmailView = (): JSX.Element => {
  const { RECOVERY } = Verification_Type_Enum;
  const { home, resetPassword } = Routes;
  const { push, refresh } = useRouter();
  const { email, route } = useAuth();

  const { mutateAsync: resendOTP, isPending: resendPending } = useResendOTPMutation();
  const { mutateAsync: verifyOTP, isPending } = useVerifyOTPMutation();

  const { handleSubmit, setFieldValue, values, resetForm } = useFormik({
    initialValues: { otp: '' },
    onSubmit: async ({ otp }) => {
      try {
        const { data } = await verifyOTP({ email, otp, type: route });

        const { access_token } = data?.session || {};

        if (route === RECOVERY) {
          setCookie('session', JSON.stringify(data?.session), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
          });

          push(resetPassword);
        } else {
          setCookie('accessToken', access_token);
          push(home);
          refresh();
        }
      } catch (error) {
        console.log('🚀 ~ VerifyEmailView ~ error:', error);
      }
    },
  });

  const totalSeconds = 30;
  const time = new Date();
  time.setSeconds(time.getSeconds() + totalSeconds);

  const { seconds, restart } = useTimer({ expiryTimestamp: time, interval: 1000 });

  const handleResend = async () => {
    try {
      const resendTime = new Date();
      resendTime.setSeconds(resendTime.getSeconds() + totalSeconds);
      resendOTP({ email, type: route });
      restart(resendTime);
      resetForm();
    } catch (error) {
      console.log('🚀 ~ handleResend ~ error:', error);
    }
  };

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
        <InputOTPGroup className="gap-x-3 justify-between w-full">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <InputOTPSlot
                key={index}
                index={index}
                className="sm:w-[63px] sm:h-[56px] rounded-md !border-[#DCE0E5]"
              />
            ))}
        </InputOTPGroup>
      </InputOTP>

      {seconds > 0 && <p className="text-primary text-sm font-medium text-center">00:{seconds}</p>}

      <Button type="submit" disabled={isPending}>
        Verify
      </Button>

      <div className="flex items-center gap-x-1 w-full justify-center -mt-4">
        <p className="font-normal">Didn&rsquo;t receive code?</p>
        <Button
          className="w-fit p-0 underline text-base font-semibold"
          disabled={seconds > 0 || resendPending}
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
