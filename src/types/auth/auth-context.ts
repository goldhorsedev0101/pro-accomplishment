// Enum
import { Verification_Type_Enum } from '@/enum/verification-type.enum';

// Types
import { Dispatch, SetStateAction } from 'react';

export type AuthContextT = {
  setRoute: Dispatch<SetStateAction<Verification_Type_Enum>>;
  setEmail: Dispatch<SetStateAction<string>>;
  route: Verification_Type_Enum;
  handleLogout: () => void;
  email: string;
};
