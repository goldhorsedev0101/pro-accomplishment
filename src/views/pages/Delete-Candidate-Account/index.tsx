'use client';

import Heading from '@/components/common/heading';
import LogoutModal from '@/components/common/modals/logout-modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SignInSchema } from '@/schemas/sign-in.schema';
import { useDeleteCandidateMutation } from '@/services/auth/delete-candidate-mutation';
import { getCookie } from 'cookies-next';
import { useFormik } from 'formik';
import { Fragment, useEffect, useState } from 'react';

const DeleteCandidateAccount = () => {
  const [view, setView] = useState<boolean>(false);
  const [hasToken, setHasToken] = useState<boolean>(false);

  const { mutateAsync } = useDeleteCandidateMutation();

  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: SignInSchema,
    onSubmit: async ({ email, password }) => {
      const pass = password.trimEnd().trimStart();
      const e = email.toLocaleLowerCase().trim();
      try {
        await mutateAsync({ email: e, password: pass }, { onSuccess: () => setView(true) });
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    const cookie = getCookie('accessToken');
    if (cookie) setHasToken(true);
  }, []);

  return (
    <div className="h-[75dvh] flex items-center flex-col justify-center w-full gap-y-6">
      {view ? (
        <Fragment>
          <h1 className="text-heading text-3xl font-semibold">
            Your Account has been deleted Successfully
          </h1>

          <Button className="w-fit" onClick={() => setView(false)}>
            Back
          </Button>
        </Fragment>
      ) : (
        <form className="flex flex-col gap-y-6 w-full max-w-[500px]" onSubmit={handleSubmit}>
          <Heading text="Delete Account" />

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
          </div>

          <Button type="submit" variant={'destructive'} disabled={false}>
            Delete Account
          </Button>
        </form>
      )}

      <LogoutModal isOpen={hasToken} setIsOpen={setHasToken} />
    </div>
  );
};

export default DeleteCandidateAccount;
