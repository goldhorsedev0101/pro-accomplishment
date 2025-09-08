import * as Yup from 'yup';

export const ResetPasswordSchema = Yup.object({
  newPassword: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    ),
  confirmPassword: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
});
