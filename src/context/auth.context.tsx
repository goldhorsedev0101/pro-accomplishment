'use client';

// Enum
import { Verification_Type_Enum } from '@/enum/verification-type.enum';

// Type
import { AuthContextT } from '@/types/auth/auth-context';

// Context & Hook
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext<AuthContextT>({
  route: Verification_Type_Enum.SIGNUP,
  setEmail: () => {},
  setRoute: () => {},
  email: '',
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { SIGNUP } = Verification_Type_Enum;

  const [route, setRoute] = useState<Verification_Type_Enum>(SIGNUP);
  const [email, setEmail] = useState('');

  return (
    <AuthContext.Provider value={{ email, route, setEmail, setRoute }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export { AuthProvider, useAuth };
