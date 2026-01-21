'use client';

import { useEffect } from 'react';

/**
 * Hook to register Firebase Cloud Messaging service worker
 */
export const useRegisterServiceWorker = () => {
  useEffect(() => {
    const registerServiceWorker = async () => {
      if ('serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
          console.log('✅ Service Worker registered successfully:', registration);
        } catch (error) {
          console.error('❌ Service Worker registration failed:', error);
        }
      } else {
        console.warn('⚠️ Service Workers are not supported in this browser');
      }
    };

    registerServiceWorker();
  }, []);
};
