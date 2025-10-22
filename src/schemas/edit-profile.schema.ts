import * as Yup from 'yup';

export const EditProfileSchema = Yup.object({
  firstName: Yup.string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(32, 'First name cannot exceed 32 characters'),
  lastName: Yup.string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(32, 'Last name cannot exceed 32 characters'),
});
