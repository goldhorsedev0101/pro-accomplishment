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
import { useQueryClient } from '@tanstack/react-query';
import { FC, JSX, useState } from 'react';
import toast from 'react-hot-toast';
import FileUploader from '../file-uploader';
import PhoneNumberInput from '../phone-input';

interface IProps {
  profile_picture?: string;
  role_position?: string;
  phone_number?: string;
  first_name?: string;
  last_name?: string;
  company?: string;
  email?: string;
  iso2?: string;
}

const EditProfileModal: FC<IProps> = ({
  profile_picture = '',
  role_position = '',
  phone_number = '',
  first_name = '',
  last_name = '',
  company = '',
  email = '',
  iso2 = '',
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

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
    initialValues: {
      iso2,
      company,
      lastName: last_name,
      firstName: first_name,
      phoneNumber: phone_number,
      role_position,
      profileImage: profile_picture,
    },
    validationSchema: EditProfileSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      await mutateAsync(values, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['get-profile'], refetchType: 'all' });
          toast.success('Profile Edit successfully');
        },
      });
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
        <form
          onSubmit={handleSubmit}
          className="w-full flex-col flex gap-y-3 max-h-[50dvh] overflow-y-auto pr-3"
        >
          <div className="w-full flex items-center justify-center">
            <FileUploader
              setFieldValue={setFieldValue}
              value={values.profileImage}
              name="profileImage"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Input
              error={touched.firstName ? errors.firstName : undefined}
              placeholder="Enter first name"
              value={values.firstName}
              onChange={handleChange}
              className="bg-white"
              label="First Name"
              name="firstName"
            />

            <Input
              error={touched.lastName ? errors.lastName : undefined}
              placeholder="Enter last name"
              value={values.lastName}
              onChange={handleChange}
              className="bg-white"
              label="Last Name"
              name="lastName"
            />
          </div>

          <Input
            error={touched.company ? errors.company : undefined}
            placeholder="Enter company name"
            onChange={handleChange}
            value={values.company}
            className="bg-white"
            label="Company"
            name="company"
          />

          <Input
            error={touched.role_position ? errors.role_position : undefined}
            placeholder="Enter role position"
            value={values.role_position}
            onChange={handleChange}
            className="bg-white"
            label="Role Position"
            name="role_position"
          />

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
            <Button type="submit" className="w-full h-14 rounded-xl" disabled={!dirty || isPending}>
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
