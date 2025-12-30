import * as Yup from 'yup';

export const EditProfileSchema = Yup.object({
  firstName: Yup.string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters')
    .trim()
    .max(32, 'First name cannot exceed 32 characters'),

  lastName: Yup.string()
    .trim()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(32, 'Last name cannot exceed 32 characters'),
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
