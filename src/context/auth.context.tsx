'use client';

import Routes from '@/constants/routes';
// Enum
import { Verification_Type_Enum } from '@/enum/verification-type.enum';

// Type
import { AuthContextT } from '@/types/auth/auth-context';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

// Context & Hook
import { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext<AuthContextT>({
  route: Verification_Type_Enum.SIGNUP,
  handleLogout: () => {},
  setEmail: () => {},
  setRoute: () => {},
  email: '',
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { SIGNUP } = Verification_Type_Enum;

  const [route, setRoute] = useState<Verification_Type_Enum>(SIGNUP);
  const [email, setEmail] = useState('');

  const { signIn } = Routes;
  const { push, refresh } = useRouter();

  const handleLogout = () => {
    deleteCookie('accessToken');
    push(signIn);
    refresh();
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ email, route, setEmail, setRoute, handleLogout }}>
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
