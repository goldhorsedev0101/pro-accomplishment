/* eslint-disable no-undef */

self.addEventListener('notificationclick', (event) => {
  const targetUrl =
    event.notification?.url ||
    readAndReturnNotificationLink(event.notification?.data?.FCM_MSG?.data) ||
    '/';
  event.notification.close();
  event.waitUntil(clients.openWindow(targetUrl));
});

importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyC3I8FmvJ4hjS4N6VeDYoSu3pDvuQV5Vcc',
  authDomain: 'i-maccomplished.firebaseapp.com',
  projectId: 'i-maccomplished',
  storageBucket: 'i-maccomplished.firebasestorage.app',
  messagingSenderId: '764747362960',
  appId: '1:764747362960:web:596609f3ea1c35833c1e15',
  measurementId: 'G-56XSLZC4E5',
});

const paths = {
  app: {
    // -------------------------[ HOME ]-------------------------
    home: { viewById: ({ lang, id }) => `/home/${lang}/${id}` },
  },
};

function readAndReturnNotificationLink(data) {
  const redirectUrl = returnNotificationLink(data);
  if (data.notificationId) {
    return paths.app.project.notifications.readById({
      notificationId: data.notificationId,
      notiUrl: redirectUrl,
      projectId: data.projectId,
    });
  }

  return redirectUrl;
}

function returnNotificationLink(data) {
  switch (data.navigateTo) {
    case 'HomeView':
      return paths.app.home.viewById({
        lang: data.lang || 'en',
        id: data.id,
      });
    case 'CandidateProfile':
      // Navigate to candidate profile
      return `/home/en/${data.candidate_id}`;
    default:
      // If no navigateTo specified but candidate_id exists, go to profile
      if (data.candidate_id) {
        return `/home/en/${data.candidate_id}`;
      }
      return '';
  }
}

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || 'Notification';
  const body = payload.notification?.body || '';

  const notificationOptions = {
    body,
    icon: '/logo/LogoIcon.png',
    url: readAndReturnNotificationLink(payload.data),
  };

  self.registration.showNotification(title, notificationOptions);
});
