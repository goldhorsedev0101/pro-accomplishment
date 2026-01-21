'use client';

// Components
import Heading from '@/components/common/heading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Constants
import Routes from '@/constants/routes';

// Schema
import { SignInSchema } from '@/schemas/sign-in.schema';

// Mutation
import { useSignInMutation } from '@/services/auth/sign-in-mutation';

// Cookies
import { setCookie } from 'cookies-next';

// Formik
import { useFormik } from 'formik';

// Router
import { useRouter } from 'next/navigation';

// Types
import { useAuth } from '@/context/auth.context';
import { JSX, useState, useEffect } from 'react';

// Firebase
import { fetchToken } from '@/config/firebase.config';

const SignInView = (): JSX.Element => {
  const { setEmail } = useAuth();
  const { push, refresh } = useRouter();
  const { forgetPassword, signUp, home, verifyEmail } = Routes;
  const { mutateAsync, isPending } = useSignInMutation();

  // FCM Token state
  const [fcmToken, setFcmToken] = useState<string | null>(null);

  // Initialize FCM on component mount
  useEffect(() => {
    const initializeFCM = async () => {
      try {
        // Step 1: Register service worker
        if ('serviceWorker' in navigator) {
          await navigator.serviceWorker.register('/firebase-messaging-sw.js');
          await navigator.serviceWorker.ready;
          console.log('✅ Service Worker ready for login page');
        }

        // Step 2: Request notification permission
        const permission = await Notification.requestPermission();

        if (permission === 'granted') {
          // Step 3: Fetch FCM token
          const token = await fetchToken();
          if (token) {
            setFcmToken(token);
            console.log('✅ FCM token ready for login:', token);
          }
        }
      } catch (error) {
        console.error('❌ Error initializing FCM on login page:', error);
      }
    };

    initializeFCM();
  }, []);

  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: SignInSchema,
    onSubmit: async ({ email, password }) => {
      const pass = password.trimEnd().trimStart();

      try {
        const payload = {
          email: email.toLocaleLowerCase().trim(),
          password: pass,
          ...(fcmToken && { fcm_token: fcmToken }),
        };

        console.log('📤 Login payload:', { ...payload, password: '***' });

        const { data } = await mutateAsync(payload);
        const code = data?.code;

        if (code == 'verification_email_resend') {
          push(verifyEmail);
          setEmail(email);
        } else {
          setCookie('accessToken', data?.session?.access_token);
          push(home);
          refresh();
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <form className="flex flex-col gap-y-6" onSubmit={handleSubmit}>
      <Heading text="Sign In" />

      <div className="flex w-full flex-col gap-y-3">
        <Input
          error={touched.email ? errors.email : undefined}
          placeholder="Enter Email"
          onChange={handleChange}
          value={values['email']}
          label="Email"
          name="email"
          required
        />
        <Input
          error={touched.password ? errors.password : undefined}
          placeholder="Enter Password"
          value={values['password']}
          onChange={handleChange}
          label="Password"
          type="password"
          name="password"
          required
        />
        <Button
          className="flex w-fit self-end justify-end underline p-0 text-base font-normal"
          onClick={() => push(forgetPassword)}
          variant={'link'}
          type="button"
        >
          Forgot Password?
        </Button>
      </div>

      <Button type="submit" disabled={isPending}>
        Sign In
      </Button>

      <div className="flex items-center gap-x-1 w-full justify-center -mt-4">
        <p className="font-normal">Don&apos;t have an account?</p>
        <Button
          onClick={() => push(signUp)}
          className="w-fit p-0 underline text-base font-semibold"
          variant={'link'}
          type="button"
        >
          Sign Up
        </Button>
      </div>
    </form>
  );
};

export default SignInView;
