'use client';

// Components
import BackButton from '@/components/common/back-button';
import FileUploader from '@/components/common/file-uploader';
import Heading from '@/components/common/heading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Constant
import Routes from '@/constants/routes';

// Schema
import { SignUpSchema } from '@/schemas/sign-up.schema';

// Mutation
import { useSignUpMutation } from '@/services/auth/sign-up-mutation';

// Type
import { SignUpPayloadT } from '@/types/auth/sign-up/sign-up-payload';
import { JSX } from 'react';

// Formik
import { useFormik } from 'formik';

// Enum
import { Verification_Type_Enum } from '@/enum/verification-type.enum';

// Router
import { useRouter } from 'next/navigation';

// Context
import PhoneNumberInput from '@/components/common/phone-input';
import { useAuth } from '@/context/auth.context';

const initialValues: SignUpPayloadT = {
  confirmPassword: '',
  profileImage: '',
  phoneNumber: '',
  firstName: '',
  lastName: '',
  password: '',
  email: '',
  iso2: 'us',
};

const SignUpView = (): JSX.Element => {
  const { mutateAsync, isPending } = useSignUpMutation();
  const { SIGNUP } = Verification_Type_Enum;
  const { setEmail, setRoute } = useAuth();
  const { signIn, verifyEmail } = Routes;
  const { push } = useRouter();

  const { handleChange, handleSubmit, values, errors, touched, setFieldValue } = useFormik({
    initialValues,
    validationSchema: SignUpSchema,

    onSubmit: async ({ phoneNumber, ...value }) => {
      try {
        await mutateAsync({ ...value, phoneNumber: '+' + phoneNumber });
        setEmail(value.email);
        push(verifyEmail);
        setRoute(SIGNUP);
      } catch (error) {
        console.log('🚀 ~ SignUpView ~ error:', error);
      }
    },
  });

  return (
    <form className="flex flex-col gap-y-6" onSubmit={handleSubmit}>
      <BackButton />
      <Heading text="Sign up" />

      <div className="flex w-full flex-col gap-y-3">
        <div className="flex flex-col items-center gap-y-1">
          <FileUploader
            value={values['profileImage']}
            setFieldValue={setFieldValue}
            name="profileImage"
          />

          {touched.profileImage && errors.profileImage && (
            <span className="text-destructive text-sm font-normal">{errors.profileImage}</span>
          )}
        </div>

        <div className="flex items-center gap-x-3 w-full">
          <Input
            error={touched.firstName ? errors.firstName : undefined}
            value={values['firstName']}
            onChange={handleChange}
            placeholder="James"
            label="First Name"
            name="firstName"
          />
          <Input
            error={touched.lastName ? errors.lastName : undefined}
            value={values['lastName']}
            onChange={handleChange}
            placeholder="Shawn"
            label="Last Name"
            name="lastName"
          />
        </div>

        <Input
          error={touched.email ? errors.email : undefined}
          placeholder="johndo@example.com"
          onChange={handleChange}
          value={values['email']}
          label="Email"
          name="email"
        />

        <PhoneNumberInput
          name="phoneNumber"
          label="Phone Number"
          value={values['phoneNumber']}
          setFieldValue={setFieldValue}
          iso2={values['iso2']}
          setIso2={(e) => setFieldValue('iso2', e)}
        />

        <Input
          error={touched.password ? errors.password : undefined}
          placeholder="ohndoe122&&*^Y"
          value={values['password']}
          onChange={handleChange}
          label="Password"
          type="password"
          name="password"
        />
        <Input
          error={touched.confirmPassword ? errors.confirmPassword : undefined}
          value={values['confirmPassword']}
          placeholder="***********"
          label="Confirm Password"
          onChange={handleChange}
          name="confirmPassword"
          type="password"
        />
        {/* <CustomPhoneInput /> */}
      </div>

      <Button type="submit" disabled={isPending}>
        Sign up
      </Button>

      <div className="flex items-center gap-x-1 w-full justify-center -mt-4">
        <p className="font-normal">Already have an account?</p>
        <Button
          onClick={() => push(signIn)}
          className="w-fit p-0 underline text-base font-semibold"
          variant={'link'}
          type="button"
        >
          Sign in
        </Button>
      </div>
    </form>
  );
};

export default SignUpView;
