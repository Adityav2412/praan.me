'use client';

import { useState } from 'react';
import { Bell } from 'lucide-react';

export default function DailyReminder() {
  const [time, setTime] = useState('07:00');
  const [isSet, setIsSet] = useState(false);
  const [error, setError] = useState('');

  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      setError('Your browser does not support notifications');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }

    setError('Please enable notifications in your browser settings');
    return false;
  };

  const handleSetReminder = async () => {
    setError('');
    const hasPermission = await requestNotificationPermission();

    if (hasPermission) {
      // Store reminder time in localStorage
      localStorage.setItem('waterforwings_reminder', time);
      setIsSet(true);

      // Show confirmation notification
      new Notification('Water For Wings 🐦', {
        body: `Daily reminder set for ${time}. Thank you for helping birds!`,
        icon: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ww-QZ98dXoNzpWbA8gocF0kQv926CU5Le.png',
      });
    }
  };

  return (
    <section id="reminder" className="py-16 px-4 bg-cream-dark">
      <div className="max-w-xl mx-auto text-center">
        <div className="bg-cream rounded-2xl p-8 shadow-lg">
          <Bell className="w-12 h-12 text-navy mx-auto mb-4" />
          <h2 className="text-3xl font-extrabold text-navy mb-2">
            Remind Me to Refill 🐦
          </h2>
          <p className="text-navy/70 mb-6">
            Want us to remind you to refill the water station?
          </p>

          {isSet ? (
            <div className="bg-navy/10 rounded-xl p-6">
              <span className="text-4xl mb-2 block">✅</span>
              <p className="text-navy font-medium">
                Reminder set for {time} daily!
              </p>
              <button
                onClick={() => setIsSet(false)}
                className="mt-4 text-navy/60 underline text-sm"
              >
                Change time
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-center gap-4 mb-6">
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="px-4 py-3 bg-cream-dark border-2 border-navy/20 rounded-xl text-navy font-medium text-lg focus:outline-none focus:ring-2 focus:ring-navy-light"
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm mb-4">{error}</p>
              )}

              <button
                onClick={handleSetReminder}
                className="bg-navy text-cream px-8 py-4 rounded-xl font-bold text-lg hover:bg-navy-dark transition-colors"
              >
                Set Daily Reminder
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
