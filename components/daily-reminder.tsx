'use client';

import { useState, useEffect, useRef } from 'react';
import { Bell, BellOff } from 'lucide-react';

const STORAGE_KEY = 'waterforwings_reminder';
const SW_PATH = '/reminder-sw.js';

export default function DailyReminder() {
  const [time, setTime] = useState('07:00');
  const [isSet, setIsSet] = useState(false);
  const [error, setError] = useState('');
  const [nextRing, setNextRing] = useState('');
  const [swSupported, setSwSupported] = useState(true);
  const swRef = useRef<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if (!('serviceWorker' in navigator)) {
      setSwSupported(false);
      return;
    }

    // Register SW
    navigator.serviceWorker.register(SW_PATH).then((reg) => {
      swRef.current = reg;

      // Restore saved reminder
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && Notification.permission === 'granted') {
        setTime(saved);
        setIsSet(true);
        updateNextRing(saved);
        sendToSW(reg, { type: 'SET_REMINDER', time: saved });
      }
    }).catch(() => setSwSupported(false));
  }, []);

  // Countdown ticker
  useEffect(() => {
    if (!isSet) return;
    const tick = setInterval(() => updateNextRing(time), 60_000);
    return () => clearInterval(tick);
  }, [isSet, time]);

  const sendToSW = (reg: ServiceWorkerRegistration, msg: object) => {
    const worker = reg.active || reg.installing || reg.waiting;
    worker?.postMessage(msg);
  };

  const requestPermission = async (): Promise<boolean> => {
    if (!('Notification' in window)) {
      setError('Tumhara browser notifications support nahi karta');
      return false;
    }
    if (Notification.permission === 'granted') return true;
    if (Notification.permission !== 'denied') {
      const perm = await Notification.requestPermission();
      if (perm === 'granted') return true;
    }
    setError('Notifications blocked hain — browser settings mein allow karo');
    return false;
  };

  const handleSetReminder = async () => {
    setError('');
    const ok = await requestPermission();
    if (!ok) return;

    localStorage.setItem(STORAGE_KEY, time);
    setIsSet(true);
    updateNextRing(time);

    if (swRef.current) {
      sendToSW(swRef.current, { type: 'SET_REMINDER', time });
    }

    // Confirmation notification
    new Notification('Uncle Ji! 🐦', {
      body: `Reminder set ho gaya ${formatTime(time)} ke liye — roz aayega!`,
      icon: '/bird-icon.png',
    });
  };

  const handleCancel = () => {
    localStorage.removeItem(STORAGE_KEY);
    setIsSet(false);
    setNextRing('');
    if (swRef.current) {
      sendToSW(swRef.current, { type: 'CANCEL_REMINDER' });
    }
  };

  const updateNextRing = (reminderTime: string) => {
    const now = new Date();
    const [h, m] = reminderTime.split(':').map(Number);
    const next = new Date();
    next.setHours(h, m, 0, 0);
    if (next <= now) next.setDate(next.getDate() + 1);
    const diff = next.getTime() - now.getTime();
    const hrs = Math.floor(diff / 3_600_000);
    const mins = Math.floor((diff % 3_600_000) / 60_000);
    setNextRing(`Agli reminder ${hrs}h ${mins}m mein`);
  };

  const formatTime = (val: string) => {
    const [h, m] = val.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hr = h % 12 || 12;
    return `${hr}:${String(m).padStart(2, '0')} ${ampm}`;
  };

  return (
    <section id="reminder" className="py-16 px-4 bg-cream-dark">
      <div className="max-w-xl mx-auto text-center">
        <div className="bg-cream rounded-2xl p-8 shadow-lg">

          {/* Icon */}
          {isSet
            ? <Bell className="w-12 h-12 text-navy mx-auto mb-4 animate-bounce" />
            : <BellOff className="w-12 h-12 text-navy/40 mx-auto mb-4" />
          }

          <h2 className="text-3xl font-extrabold text-navy mb-2">
            Remind Me to Refill 🐦
          </h2>
          <p className="text-navy/70 mb-6">
            Want us to remind you to refill the water station?
          </p>

          {!swSupported && (
            <p className="text-amber-600 text-sm bg-amber-50 rounded-xl p-3 mb-4">
              ⚠️ Tumhara browser background notifications support nahi karta.
              Tab khuli rehni chahiye reminder ke liye.
            </p>
          )}

          {isSet ? (
            <div className="bg-navy/10 rounded-xl p-6">
              <span className="text-4xl mb-2 block">✅</span>
              <p className="text-navy font-semibold text-lg">
                Roz {formatTime(time)} pe reminder aayega!
              </p>
              {nextRing && (
                <p className="text-navy/50 text-sm mt-2">🕐 {nextRing}</p>
              )}
              <div className="flex justify-center gap-6 mt-5">
                <button
                  onClick={() => { setIsSet(false); setNextRing(''); }}
                  className="text-navy/60 underline text-sm"
                >
                  Time badlo
                </button>
                <button
                  onClick={handleCancel}
                  className="text-red-400 underline text-sm"
                >
                  Cancel karo
                </button>
              </div>
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
                className="bg-navy text-cream px-8 py-4 rounded-xl font-bold text-lg hover:bg-navy-dark transition-colors w-full"
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
