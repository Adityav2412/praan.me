'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

import {
  type Saviour,
  refreshSaviours,
} from '@/lib/storage';

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (saviour: Saviour) => void;
}

const sourceOptions = [
  'X/Twitter',
  'Instagram',
  'WhatsApp',
  'Friend',
  'Website',
  'Other',
];

const colonyOptions = [
  'Dwarka',
  'Rohini',
  'Janakpuri',
  'Uttam Nagar',
  'Palam',
  'Saket',
  'Pitampura',
  'Laxmi Nagar',
  'Karol Bagh',
  'Vasant Kunj',
  'Rajouri Garden',
  'Punjabi Bagh',
  'Mayur Vihar',
  'Paschim Vihar',
  'Tilak Nagar',
  'Other',
];

export default function FormModal({
  isOpen,
  onClose,
  onSuccess,
}: FormModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    colony: '',
    source: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitPhase, setSubmitPhase] = useState<'idle' | 'submitting' | 'loading'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.colony.trim()) newErrors.colony = 'Colony is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmitPhase('submitting');

    try {
      await fetch(
        'https://script.google.com/macros/s/AKfycbw-e7Emeb0SbS58XDJYLa60g6DS6YXsMGJ69VgH00HupqsJRFKryKZxoH2o1QBc3aI/exec',
        {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name.trim(),
            colony: formData.colony.trim(),
            source: formData.source || 'Not specified',
          }),
        }
      );

      setSubmitPhase('loading');
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const latestData = await refreshSaviours();
      const latest = latestData[latestData.length - 1];
      if (!latest) throw new Error('No saviour found');

      onSuccess(latest);
      setFormData({ name: '', colony: '', source: '' });
      setSubmitPhase('idle');
      onClose();
    } catch (error) {
      console.error(error);
      setSubmitPhase('idle');
      alert('Unable to submit right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal — full screen on mobile, floating card on desktop */}
      <div className="relative bg-[#FAF8F4] w-full h-full sm:h-auto sm:max-w-md sm:rounded-2xl sm:shadow-2xl animate-slide-up overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-[#F2EEE6] rounded-lg transition-colors z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-[#1C1209]" />
        </button>

        <div className="p-8 pt-12 sm:pt-8">
          {/* Logo — praan-navbar.svg + Water for Wings text */}
          <div className="flex flex-col items-center mb-8">
            <Image
              src="/praan-navbar.svg"
              alt="Praan"
              width={100}
              height={28}
              className="h-7 w-auto mb-2"
            />
            <span className="text-xs text-[#7A7468] font-medium">
              Water for Wings
            </span>
          </div>

          <h2 className="text-2xl font-bold text-[#1C1209] text-center mb-1 font-display">
            Become a Saviour
          </h2>

          <p className="text-[#7A7468] text-sm text-center mb-8">
            Join the mission to save Delhi&apos;s birds
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A7468] mb-2">
                Full Name <span className="text-[#8B4513]">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className={`w-full py-3 px-0 bg-transparent border-0 border-b-2 focus:outline-none focus:ring-0 text-[#1C1209] placeholder:text-[#7A7468]/50 transition-colors ${
                  errors.name
                    ? 'border-red-500'
                    : 'border-[#1C1209]/15 focus:border-[#8B4513]'
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* Colony */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A7468] mb-2">
                Colony / Area <span className="text-[#8B4513]">*</span>
              </label>
              <select
                name="colony"
                value={formData.colony}
                onChange={handleChange}
                className={`w-full py-3 px-0 bg-transparent border-0 border-b-2 focus:outline-none focus:ring-0 text-[#1C1209] appearance-none cursor-pointer transition-colors ${
                  errors.colony
                    ? 'border-red-500'
                    : 'border-[#1C1209]/15 focus:border-[#8B4513]'
                }`}
              >
                <option value="">Select your area</option>
                {colonyOptions.map((area) => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
              {errors.colony && (
                <p className="text-red-500 text-xs mt-1">{errors.colony}</p>
              )}
            </div>

            {/* Source */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A7468] mb-2">
                How did you hear about us?
              </label>
              <select
                name="source"
                value={formData.source}
                onChange={handleChange}
                className="w-full py-3 px-0 bg-transparent border-0 border-b-2 border-[#1C1209]/15 focus:border-[#8B4513] focus:outline-none focus:ring-0 text-[#1C1209] appearance-none cursor-pointer transition-colors"
              >
                <option value="">Select an option</option>
                {sourceOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Submit — dark pill */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#1C1209] text-white py-4 px-6 rounded-full font-semibold text-base hover:bg-[#2a1f12] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-8 flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  <span>{submitPhase === 'loading' ? 'Almost ready...' : 'Saving your mission...'}</span>
                </>
              ) : (
                'Join the Mission'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
