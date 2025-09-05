import { Verification_Type_Enum } from '@/enum/verification-type.enum';

export type VerifyOtpPayloadT = {
  type: Verification_Type_Enum;
  email: string;
  otp: string;
};
