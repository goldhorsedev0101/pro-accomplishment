import { Verification_Type_Enum } from '@/enum/verification-type.enum';

export type ForgetPasswordPayloadT = {
  type?: Verification_Type_Enum;
  email: string;
};
