'use client';

// Components
import BackButton from '@/components/common/back-button';
import Heading from '@/components/common/heading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Routes
import Routes from '@/constants/routes';

// Enum
import { Verification_Type_Enum } from '@/enum/verification-type.enum';

// Schema
import { ForgetPasswordSchema } from '@/schemas/forget-password.schema';

// Mutation
import { useForgetPasswordMutation } from '@/services/auth/forget-password-mutation';

// Formik
import { useFormik } from 'formik';

// Router
import { useRouter } from 'next/navigation';

// Type
import { JSX } from 'react';

const ForgetPasswordView = (): JSX.Element => {
  const { push } = useRouter();
  const { verifyEmail } = Routes;
  const { isPending, mutateAsync } = useForgetPasswordMutation();

  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues: { email: '' },
    validationSchema: ForgetPasswordSchema,
    onSubmit: async ({ email }) => {
      try {
        await mutateAsync({ email });
        push(verifyEmail + '?email=' + email + `&route=${Verification_Type_Enum.RECOVERY}`);
      } catch (error) {
        console.log('🚀 ~ ForgetPasswordView ~ error:', error);
      }
    },
  });

  return (
    <form className="flex flex-col gap-y-6" onSubmit={handleSubmit}>
      <BackButton />

      <div>
        <Heading text="Forget Password" />
        <p className="font-medium text-base text-secondary">Enter your registered email address</p>
      </div>

      <Input
        error={touched.email ? errors.email : undefined}
        placeholder="johndo@example.com"
        value={values['email']}
        onChange={handleChange}
        label="Email"
        name="email"
        required
      />

      <Button type="submit" disabled={isPending}>
        Send
      </Button>
    </form>
  );
};

export default ForgetPasswordView;
