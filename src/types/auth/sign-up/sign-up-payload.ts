export type SignUpPayloadT = {
  confirmPassword: string;
  rolePosition: string;
  profileImage: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  password: string;
  company: string;
  email: string;
  iso2: string;
  fcmToken?: string;
};
