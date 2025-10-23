export const listenNetworkStatus = (
  onOnline: () => Promise<void>,
  onOffline: () => Promise<void>,
) => {
  // Initial check
  if (!navigator.onLine) {
    onOffline();
  }

  window.addEventListener('online', onOnline);
  window.addEventListener('offline', onOffline);

  // Cleanup function
  return () => {
    window.removeEventListener('online', onOnline);
    window.removeEventListener('offline', onOffline);
  };
};
