import { parsePhoneNumberFromString } from 'libphonenumber-js';
import * as Yup from 'yup';

export const SignUpSchema = Yup.object({
  firstName: Yup.string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(32, 'First name cannot exceed 32 characters')
    .matches(/^[a-zA-Z\s]+$/, 'First name can only contain letters and spaces'),
  lastName: Yup.string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(32, 'Last name cannot exceed 32 characters')
    .matches(/^[a-zA-Z\s]+$/, 'Last name can only contain letters and spaces'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required')
    .test(
      'no-only-special-chars-before-at',
      'Email username cannot contain only special characters',
      (value) => {
        if (!value) return false;
        const [localPart] = value.split('@');
        return /[a-zA-Z0-9]/.test(localPart);
      },
    )
    .trim(),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\W]{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    ),
  confirmPassword: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
  profileImage: Yup.string().required('Profile is required'),
  phoneNumber: Yup.string()
    .required('Phone number is required')
    .test('is-valid-phone', 'Invalid phone number', (value) => {
      if (!value) return false;
      const phoneNumber = parsePhoneNumberFromString(`+${value}`);
      return phoneNumber?.isValid() || false;
    }),
  company: Yup.string()
    .required('Company name is required')
    .min(3, 'Company name must be at least 3 characters')
    .max(50, 'Company name cannot exceed 50 characters')
    .trim()
    .matches(/[a-zA-Z]/, 'Company name cannot consist of only numbers or special characters'),
  rolePosition: Yup.string()
    .required('Role position is required')
    .min(3, 'Role position must be at least 3 characters')
    .max(50, 'Role position cannot exceed 50 characters')
    .trim()
    .matches(/^[a-zA-Z\s]+$/, 'Field can only contain letters and spaces'),
});
