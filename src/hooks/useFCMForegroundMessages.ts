'use client';

import { messaging } from '@/config/firebase.config';
import { onMessage } from 'firebase/messaging';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

/**
 * Hook to handle foreground FCM messages (when app is open and focused)
 */
export const useFCMForegroundMessages = () => {
  const router = useRouter();

  useEffect(() => {
    const setupForegroundMessaging = async () => {
      try {
        const fcmMessaging = await messaging();

        if (fcmMessaging) {
          // Listen for foreground messages
          const unsubscribe = onMessage(fcmMessaging, (payload) => {
            const { notification } = payload;

            if (notification) {
              const { title, body } = notification;

              // Show toast notification
              toast.success(`${title}\n${body}\n\nClick to view profile...`, {
                position: 'bottom-right',
                duration: 5000,
                style: {
                  cursor: 'pointer',
                },
              });
            }
          });

          // Cleanup on unmount
          return () => {
            unsubscribe();
          };
        }
      } catch (error) {
        console.error('❌ Error setting up foreground messaging hook:', error);
      }
    };

    setupForegroundMessaging();
  }, [router]);
};
