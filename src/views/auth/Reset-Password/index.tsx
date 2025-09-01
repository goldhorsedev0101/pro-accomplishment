'use client';
import BackButton from '@/components/common/back-button';
import Heading from '@/components/common/heading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Routes from '@/constants/routes';
import { ResetPasswordSchema } from '@/schemas/reset-password.schema';
import { useResetPasswordMutation } from '@/services/auth/reset-password-mutation';
import { setCookie } from 'cookies-next';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';

const ResetPasswordView = () => {
  const { push, refresh } = useRouter();
  const { home } = Routes;

  const {
    //  mutateAsync,
    isPending,
  } = useResetPasswordMutation();

  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues: { confirmPassword: '', password: '' },
    validationSchema: ResetPasswordSchema,
    onSubmit: async () => {
      try {
        // const { token } = await mutateAsync(values);

        setCookie('token', 'lorem');
        push(home);
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

      <Button type="submit" disabled={isPending}>
        Save Password
      </Button>
    </form>
  );
};

export default ResetPasswordView;
