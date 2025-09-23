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

// Context
import { useAuth } from '@/context/auth.context';

const ForgetPasswordView = (): JSX.Element => {
  const { isPending, mutateAsync } = useForgetPasswordMutation();
  const { RECOVERY } = Verification_Type_Enum;
  const { setEmail, setRoute } = useAuth();
  const { verifyEmail } = Routes;
  const { push } = useRouter();

  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    validationSchema: ForgetPasswordSchema,
    initialValues: { email: '' },
    onSubmit: async ({ email }) => {
      try {
        await mutateAsync({ email });
        setRoute(RECOVERY);
        push(verifyEmail);
        setEmail(email);
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
