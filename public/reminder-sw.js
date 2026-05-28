// Service Worker — Water For Wings Daily Reminder
// Place this file in: public/reminder-sw.js

const NOTIF_TAG = 'waterforwings-refill';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

// Listen for messages from the main app
self.addEventListener('message', (event) => {
  const { type, time } = event.data;

  if (type === 'SET_REMINDER') {
    // Clear any existing alarm
    clearAlarm();
    // Schedule the daily alarm
    scheduleAlarm(time);
  }

  if (type === 'CANCEL_REMINDER') {
    clearAlarm();
  }
});

let alarmInterval = null;

function scheduleAlarm(reminderTime) {
  // Check every 30 seconds
  alarmInterval = setInterval(() => {
    const now = new Date();
    const [h, m] = reminderTime.split(':').map(Number);

    if (
      now.getHours() === h &&
      now.getMinutes() === m &&
      now.getSeconds() < 31
    ) {
      fireNotification();
    }
  }, 30_000);

  // Store in SW scope so it survives
  self.reminderTime = reminderTime;
}

function clearAlarm() {
  if (alarmInterval) {
    clearInterval(alarmInterval);
    alarmInterval = null;
  }
}

function fireNotification() {
  self.registration.showNotification('Uncle Ji! 🐦', {
    body: 'Paani pila dijiye... mera gala sukh raha hai',
    icon: '/bird-icon.png',
    badge: '/bird-icon.png',
    tag: NOTIF_TAG,           // prevents duplicate popups
    requireInteraction: true, // stays until dismissed
    vibrate: [200, 100, 200], // buzz on mobile
    actions: [
      { action: 'done', title: '✅ Refill kar diya!' },
      { action: 'snooze', title: '⏰ 10 min baad remind karo' },
    ],
  });
}

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'snooze') {
    // Snooze for 10 minutes
    setTimeout(() => fireNotification(), 10 * 60 * 1000);
    return;
  }

  // Open/focus the site on click
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((clients) => {
      if (clients.length > 0) {
        clients[0].focus();
      } else {
        self.clients.openWindow('/');
      }
    })
  );
});
