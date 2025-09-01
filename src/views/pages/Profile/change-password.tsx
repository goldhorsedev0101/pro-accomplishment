// Components
import Box from '@/components/common/box';
import Heading from '@/components/common/heading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Schema
import { ChangePasswordSchema } from '@/schemas/change-password.schema';

// Formik
import { useFormik } from 'formik';

// Type
import { JSX } from 'react';

// Toast
import toast from 'react-hot-toast';

const ChangePassword = (): JSX.Element => {
  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues: { oldPassword: '', newPassword: '', confirmPassword: '' },
    validationSchema: ChangePasswordSchema,
    onSubmit: () => {
      toast.success('Password changed successfully');
    },
  });

  return (
    <div className="space-y-6 flex flex-col items-end">
      <Box>
        <Heading text="Change Password" width="medium" size="31" />

        <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
          <Input
            error={touched.oldPassword ? errors.oldPassword : undefined}
            className="bg-neutral-grey-0 border-none h-14 placeholder:text-neutral-grey-50"
            placeholder="Enter Old Password"
            value={values['oldPassword']}
            onChange={handleChange}
            label="Old Password"
            name="oldPassword"
            type="password"
          />

          <Input
            error={touched.newPassword ? errors.newPassword : undefined}
            className="bg-neutral-grey-0 border-none h-14 placeholder:text-neutral-grey-50"
            placeholder="Enter New Password"
            value={values['newPassword']}
            onChange={handleChange}
            label="New Password"
            name="newPassword"
            type="password"
          />

          <Input
            error={touched.confirmPassword ? errors.confirmPassword : undefined}
            className="bg-neutral-grey-0 border-none h-14 placeholder:text-neutral-grey-50"
            placeholder="Enter Confirm New Password"
            value={values['confirmPassword']}
            label="Confirm New Password"
            onChange={handleChange}
            name="confirmPassword"
            type="password"
          />
        </form>
      </Box>

      <Button type="submit" onClick={() => handleSubmit()} className="self-end">
        Change Password
      </Button>
    </div>
  );
};

export default ChangePassword;
