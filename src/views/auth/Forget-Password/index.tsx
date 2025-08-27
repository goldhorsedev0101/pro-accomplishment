'use client';
import BackButton from '@/components/common/back-button';
import Heading from '@/components/common/heading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Routes from '@/constants/routes';
import { ForgetPasswordSchema } from '@/schemas/forget-password.schema';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';

const ForgetPasswordView = () => {
  const { push } = useRouter();
  const { verifyEmail } = Routes;

  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues: { email: '' },
    validationSchema: ForgetPasswordSchema,
    onSubmit: ({ email }) => push(verifyEmail + '?email=' + email + '&route=password'),
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

      <Button type="submit">Send</Button>
    </form>
  );
};

export default ForgetPasswordView;
