'use client';
import BackButton from '@/components/common/back-button';
import Heading from '@/components/common/heading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Routes from '@/constants/routes';
import { ResetPasswordSchema } from '@/schemas/reset-password.schema';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';

const ResetPasswordView = () => {
  const { push } = useRouter();
  const { home } = Routes;

  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues: { confirmPassword: '', password: '' },
    validationSchema: ResetPasswordSchema,
    onSubmit: () => push(home),
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

      <Button type="submit">Save Password</Button>
    </form>
  );
};

export default ResetPasswordView;
