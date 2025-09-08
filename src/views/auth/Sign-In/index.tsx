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
import { JSX } from 'react';

const SignInView = (): JSX.Element => {
  const { push, refresh } = useRouter();
  const { forgetPassword, signUp, home } = Routes;
  const { mutateAsync, isPending } = useSignInMutation();

  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: SignInSchema,
    onSubmit: async () => {
      try {
        const { data } = await mutateAsync(values);
        setCookie('token', data.session.access_token);
        push(home);
        refresh();
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
          placeholder="johndo@example.com"
          onChange={handleChange}
          value={values['email']}
          label="Email"
          name="email"
          required
        />
        <Input
          error={touched.password ? errors.password : undefined}
          placeholder="ohndoe122&&*^Y"
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
