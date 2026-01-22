'use client';

import { messaging } from '@/config/firebase.config';
import { onMessage } from 'firebase/messaging';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

import { X } from 'lucide-react';

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
            const { notification, data } = payload;

            if (notification) {
              const { title, body } = notification;

              // Show custom toast notification
              toast.custom(
                (t) => (
                  <div
                    className={`${
                      t.visible ? 'animate-in fade-in zoom-in' : 'animate-out fade-out zoom-out'
                    } max-w-sm w-full bg-white shadow-2xl rounded-2xl pointer-events-auto flex flex-col p-5 border border-gray-100 relative z-[9999]`}
                    style={{ fontFamily: 'var(--font-quicksand)' }}
                  >
                    {/* Close Button */}
                    <button
                      onClick={() => toast.dismiss(t.id)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1"
                    >
                      <X size={18} />
                    </button>

                    {/* Content */}
                    <div className="flex flex-col gap-1 pr-6">
                      <h3 className="text-[18px] font-bold text-[#171A1F] leading-tight">
                        {title}
                      </h3>
                      <p className="text-[14px] text-[#51595A] font-medium leading-relaxed">
                        {body}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-5">
                      <button
                        onClick={() => {
                          if (data?.candidate_id) {
                            router.push(`/home/en/${data.candidate_id}`);
                          }
                          toast.dismiss(t.id);
                        }}
                        className="flex-1 bg-[#49909D] text-white py-2.5 px-4 rounded-xl font-bold text-[14px] hover:opacity-90 transition-opacity active:scale-95 duration-200"
                      >
                        View Folio
                      </button>
                      <button
                        onClick={() => toast.dismiss(t.id)}
                        className="flex-1 bg-white text-[#171A1F] py-2.5 px-4 rounded-xl font-bold text-[14px] border border-gray-200 hover:bg-gray-50 transition-colors active:scale-95 duration-200"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                ),
                {
                  position: 'bottom-right',
                  duration: 8000,
                },
              );
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
