'use client';

import { useEffect, useState } from 'react';

export default function DailyReminder() {
  const [enabled, setEnabled] = useState(false);
  const [time, setTime] = useState('08:00');

  useEffect(() => {
    const saved = localStorage.getItem('dailyReminderEnabled');
    const savedTime = localStorage.getItem('dailyReminderTime');

    if (saved === 'true') {
      setEnabled(true);
    }

    if (savedTime) {
      setTime(savedTime);
    }
  }, []);

  const formatTime = (value: string) => {
    const [hours, minutes] = value.split(':');
    const hour = parseInt(hours, 10);
    const suffix = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;

    return `${formattedHour}:${minutes} ${suffix}`;
  };

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      alert('Notifications are not supported in this browser.');
      return;
    }

    const permission = await Notification.requestPermission();

    if (permission !== 'granted') {
      alert('Please allow notifications to enable reminders.');
      return;
    }

    localStorage.setItem('dailyReminderEnabled', 'true');
    localStorage.setItem('dailyReminderTime', time);
    setEnabled(true);

    new Notification('Uncle Ji! 🐦', {
      body: `Reminder set ho gaya ${formatTime(time)} ke liye — roz aayega!`,
      icon: '/bird-icon.png',
    });
  };

  const disableReminder = () => {
    localStorage.removeItem('dailyReminderEnabled');
    localStorage.removeItem('dailyReminderTime');
    setEnabled(false);
  };

  return (
    <section id="reminder" className="py-16 px-4 bg-cream-dark">
      <div className="max-w-4xl mx-auto">
        <div className="bg-cream rounded-2xl p-6 md:p-8 shadow-lg border border-navy/10">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-navy mb-2">
                Daily Bird Reminder 🐦
              </h2>
              <p className="text-navy/70 text-sm md:text-base leading-relaxed">
                Get a gentle daily reminder to refill water for birds.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="border border-navy/20 rounded-lg px-3 py-2 bg-white text-navy text-sm outline-none focus:ring-2 focus:ring-navy-light"
              />

              {enabled ? (
                <button
                  type="button"
                  onClick={disableReminder}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Disable
                </button>
              ) : (
                <button
                  type="button"
                  onClick={requestPermission}
                  className="bg-navy hover:bg-navy-dark text-cream px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Enable
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
