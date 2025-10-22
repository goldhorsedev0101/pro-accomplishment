'use client';

// Components
import BackButton from '@/components/common/back-button';
import Heading from '@/components/common/heading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Routes
import Routes from '@/constants/routes';

// Schema
import { ResetPasswordSchema } from '@/schemas/reset-password.schema';

// Mutation
import { useResetPasswordMutation } from '@/services/auth/reset-password-mutation';

// Formik
import { useFormik } from 'formik';

// Router
import { useRouter } from 'next/navigation';

// Type
import { JSX } from 'react';

const ResetPasswordView = (): JSX.Element => {
  const { push, refresh } = useRouter();
  const { signIn } = Routes;

  const { mutateAsync, isPending } = useResetPasswordMutation();

  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues: { confirmPassword: '', newPassword: '' },
    validationSchema: ResetPasswordSchema,
    onSubmit: async ({ confirmPassword, newPassword }) => {
      const conPass = confirmPassword.trimEnd().trimStart();
      const newPass = newPassword.trimEnd().trimStart();

      try {
        await mutateAsync({ confirmPassword: conPass, newPassword: newPass });
        push(signIn);
        refresh();
      } catch (error) {
        console.log('🚀 ~ ResetPasswordView ~ error:', error);
      }
    },
  });

  return (
    <form className="flex flex-col gap-y-6" onSubmit={handleSubmit}>
      <BackButton />

      <Heading text="Create New Password" />

      <Input
        error={touched.newPassword ? errors.newPassword : undefined}
        placeholder="Enter New Password"
        value={values['newPassword']}
        onChange={handleChange}
        name="newPassword"
        label="Password"
        type="password"
        required
      />

      <Input
        error={touched.confirmPassword ? errors.confirmPassword : undefined}
        placeholder="Enter Confirm Password"
        value={values['confirmPassword']}
        label="Confirm Password"
        onChange={handleChange}
        name="confirmPassword"
        type="password"
        required
      />

      <Button type="submit" disabled={isPending}>
        Save Password
      </Button>
    </form>
  );
};

export default ResetPasswordView;
