'use client';

import { messaging } from '@/config/firebase.config';
import { onMessage } from 'firebase/messaging';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

/**
 * Hook to handle foreground FCM messages (when app is open and focused)
 */
export const useFCMForegroundMessages = () => {
  useEffect(() => {
    const setupForegroundMessaging = async () => {
      try {
        const fcmMessaging = await messaging();

        if (fcmMessaging) {
          // Listen for foreground messages
          const unsubscribe = onMessage(fcmMessaging, (payload) => {
            console.log('📨 Foreground message received:', payload);

            const { notification, data } = payload;

            if (notification) {
              const { title, body } = notification;

              // Show toast notification
              toast.success(`${title}: ${body}`, {
                duration: 5000,
              });

              console.log('✅ Toast notification shown');
            }
          });

          console.log('✅ Foreground message handler registered');

          // Cleanup on unmount
          return () => {
            unsubscribe;
          };
        }
      } catch (error) {
        console.error('❌ Error setting up foreground messaging:', error);
      }
    };

    setupForegroundMessaging();
  }, []);
};
