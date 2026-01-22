'use client';

import { fetchToken } from '@/config/firebase.config';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface FCMContextType {
  fcmToken: string | null;
  setFcmToken: (token: string | null) => void;
  refreshToken: () => Promise<void>;
  isLoading: boolean;
}

const FCMContext = createContext<FCMContextType>({
  fcmToken: null,
  setFcmToken: () => {},
  refreshToken: async () => {},
  isLoading: true,
});

export const FCMProvider = ({ children }: { children: ReactNode }) => {
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize FCM on mount
  useEffect(() => {
    initializeFCM();
  }, []);

  const initializeFCM = async () => {
    try {
      setIsLoading(true);

      if ('serviceWorker' in navigator) {
        await navigator.serviceWorker.register('/firebase-messaging-sw.js');
        await navigator.serviceWorker.ready;
      }

      const permission = await Notification.requestPermission();

      if (permission === 'granted') {
        const token = await fetchToken();

        if (token) {
          setFcmToken(token);
          localStorage.setItem('fcmToken', token);
        }
      }
    } catch (error) {
      console.error('❌ Error initializing FCM in Provider:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshToken = async () => {
    try {
      const token = await fetchToken();
      if (token) {
        setFcmToken(token);
        localStorage.setItem('fcmToken', token);
      }
    } catch (error) {
      console.error('❌ Error refreshing FCM token:', error);
    }
  };

  return (
    <FCMContext.Provider value={{ fcmToken, setFcmToken, refreshToken, isLoading }}>
      {children}
    </FCMContext.Provider>
  );
};

export const useFCM = () => {
  const context = useContext(FCMContext);
  if (!context) {
    throw new Error('useFCM must be used within FCMProvider');
  }
  return context;
};
