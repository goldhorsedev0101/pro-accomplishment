'use client';

// Icons
import edit from 'public/icons/edit.svg';

// Components
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import BasicModal from './basic-modal';

// Schemas
import { EditProfileSchema } from '@/schemas/edit-profile.schema';

// Formik
import { useFormik } from 'formik';

// Types
import { useEditProfileMutation } from '@/services/others/profile/edit-recruiter-profile';
import { FC, JSX, useState } from 'react';
import PhoneNumberInput from '../phone-input';

interface IProps {
  phone_number?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  iso2?: string;
}

const EditProfileModal: FC<IProps> = ({
  phone_number = '',
  first_name = '',
  last_name = '',
  email = '',
  iso2 = '',
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { mutateAsync, isPending } = useEditProfileMutation();

  const {
    touched,
    errors,
    values,
    handleChange,
    handleSubmit,
    resetForm,
    setFieldValue,
    dirty,
    isValid,
  } = useFormik({
    initialValues: { phoneNumber: phone_number, firstName: first_name, lastName: last_name },
    validationSchema: EditProfileSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      await mutateAsync(values);
      setIsOpen(false);
      resetForm();
    },
  });

  return (
    <BasicModal
      trigger={{
        child: <Image src={edit} alt="edit" width={24} height={24} className="cursor-pointer" />,
      }}
      footer={
        <form onSubmit={handleSubmit} className="w-full flex-col flex gap-y-6">
          <div className="flex items-center gap-x-3">
            <Input
              error={touched.firstName ? errors.firstName : undefined}
              value={values.firstName}
              onChange={handleChange}
              className="bg-white"
              label="First Name"
              placeholder="Jane"
              name="firstName"
            />

            <Input
              error={touched.lastName ? errors.lastName : undefined}
              value={values.lastName}
              onChange={handleChange}
              className="bg-white"
              placeholder="Cooper"
              label="Last Name"
              name="lastName"
            />
          </div>

          <Input value={email} disabled label="Email Address" />

          <PhoneNumberInput
            required
            iso2={iso2}
            name="phoneNumber"
            label="Phone Number"
            value={values['phoneNumber']}
            setFieldValue={setFieldValue}
            setIso2={(e) => setFieldValue('iso2', e)}
          />

          <DialogClose asChild>
            <Button
              className="w-full h-14 rounded-xl"
              type="submit"
              disabled={!dirty || !isValid || isPending}
            >
              Save Changes
            </Button>
          </DialogClose>
        </form>
      }
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={{ title: 'Edit Profile' }}
    />
  );
};

export default EditProfileModal;
