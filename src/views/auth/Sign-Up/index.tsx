'use client';

// Components
import BackButton from '@/components/common/back-button';
import FileUploader from '@/components/common/file-uploader';
import Heading from '@/components/common/heading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Constant
import Routes from '@/constants/routes';

// Schema
import { SignUpSchema } from '@/schemas/sign-up.schema';

// Mutation
import { useSignUpMutation } from '@/services/auth/sign-up-mutation';

// Type
import { SignUpPayloadT } from '@/types/auth/sign-up/sign-up-payload';
import { JSX } from 'react';

// Formik
import { useFormik } from 'formik';

// Router
import { useRouter } from 'next/navigation';

const initialValues: SignUpPayloadT = {
  confirmPassword: '',
  profile: 'lorem',
  firstName: '',
  lastName: '',
  password: '',
  email: '',
};

const SignUpView = (): JSX.Element => {
  const { push } = useRouter();
  const { signIn, verifyEmail } = Routes;
  const {
    //  mutateAsync,
    isPending,
  } = useSignUpMutation();

  const { handleChange, handleSubmit, values, errors, touched, setFieldValue } = useFormik({
    initialValues,
    validationSchema: SignUpSchema,
    onSubmit: async (value) => {
      try {
        // await mutateAsync(value);
        push(verifyEmail + '?email=' + value.email + '&route=register');
      } catch (error) {
        console.log('🚀 ~ SignUpView ~ error:', error);
      }
    },
  });

  return (
    <form className="flex flex-col gap-y-6" onSubmit={handleSubmit}>
      <BackButton />
      <Heading text="Sign up" />

      <div className="flex w-full flex-col gap-y-3">
        <FileUploader name="profile" setFieldValue={setFieldValue} value={values['profile']} />

        <div className="flex items-center gap-x-3 w-full">
          <Input
            error={touched.firstName ? errors.firstName : undefined}
            value={values['firstName']}
            onChange={handleChange}
            placeholder="James"
            label="First Name"
            name="firstName"
            required
          />
          <Input
            error={touched.lastName ? errors.lastName : undefined}
            value={values['lastName']}
            onChange={handleChange}
            placeholder="Shawn"
            label="Last Name"
            name="lastName"
            required
          />
        </div>

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

        <Input
          error={touched.confirmPassword ? errors.confirmPassword : undefined}
          value={values['confirmPassword']}
          placeholder="***********"
          label="Confirm Password"
          onChange={handleChange}
          name="confirmPassword"
          type="password"
          required
        />
      </div>

      <Button type="submit" disabled={isPending}>
        Sign up
      </Button>

      <div className="flex items-center gap-x-1 w-full justify-center -mt-4">
        <p className="font-normal">Already have an account?</p>
        <Button
          onClick={() => push(signIn)}
          className="w-fit p-0 underline text-base font-semibold"
          variant={'link'}
          type="button"
        >
          Sign in
        </Button>
      </div>
    </form>
  );
};

export default SignUpView;
