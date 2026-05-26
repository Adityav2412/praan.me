'use client';

import { useState } from 'react';

import Image from 'next/image';

import { X } from 'lucide-react';

import {
  type Saviour,
  refreshSaviours,
  getSaviours,
} from '@/lib/storage';

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (
    saviour: Saviour
  ) => void;
}

const sourceOptions = [
  'X/Twitter',
  'Instagram',
  'WhatsApp',
  'Friend',
  'Website',
  'Other',
];

const stationOptions = [
  'Clay Matka',
  'Bowl',
  'Bird Bath',
  'Plate',
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
  const [formData, setFormData] =
    useState({
      name: '',
      colony: '',
      source: '',
      stationType: '',
    });

  const [errors, setErrors] =
    useState<
      Record<string, string>
    >({});

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } =
      e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validate = () => {
    const newErrors: Record<
      string,
      string
    > = {};

    if (!formData.name.trim()) {
      newErrors.name =
        'Name is required';
    }

    if (
      !formData.colony.trim()
    ) {
      newErrors.colony =
        'Colony is required';
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors)
        .length === 0
    );
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!validate()) return;

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const formBody =
        new FormData();

      formBody.append(
        'entry.1192801997',
        formData.name.trim()
      );

      formBody.append(
        'entry.1490393253',
        formData.stationType ||
          'Not specified'
      );

      formBody.append(
        'entry.1722117052',
        formData.colony.trim()
      );

      formBody.append(
        'entry.1326422342',
        formData.source ||
          'Not specified'
      );

      await fetch(
        'https://docs.google.com/forms/d/e/1FAIpQLSfWHgM8HhOXnO661ft5C-HIxdOYAmV2FnkhIDwSeb8Ud-eUVA/formResponse',
        {
          method: 'POST',
          mode: 'no-cors',
          body: formBody,
        }
      );

      // wait for Google Sheet update
      await new Promise(
        (resolve) =>
          setTimeout(
            resolve,
            2500
          )
      );

      // force fresh fetch
      await refreshSaviours();

      const latestSaviours =
        getSaviours();

      const latest =
        latestSaviours[
          latestSaviours.length -
            1
        ];

      if (!latest) {
        throw new Error(
          'Failed to fetch latest saviour'
        );
      }

      setFormData({
        name: '',
        colony: '',
        source: '',
        stationType: '',
      });

      onSuccess(latest);

      onClose();
    } catch (error) {
      console.error(error);

      alert(
        'Unable to connect right now. Please try again in a few seconds.'
      );
    } finally {
      setIsSubmitting(
        false
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-cream border-4 border-navy rounded-2xl shadow-2xl w-full max-w-md animate-slide-up overflow-hidden">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-cream-dark rounded-lg transition-colors z-10"
          aria-label="Close"
        >
          <X className="w-6 h-6 text-navy" />
        </button>

        <div className="p-8">

          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ww-QZ98dXoNzpWbA8gocF0kQv926CU5Le.png"
              alt="Water For Wings Logo"
              width={56}
              height={56}
              className="w-14 h-14"
            />

            <span className="text-xl font-extrabold text-navy">
              Water For Wings
            </span>
          </div>

          <h2 className="text-2xl font-extrabold text-navy text-center mb-2">
            Become a Saviour
          </h2>

          <p className="text-navy/70 text-center mb-6">
            Join the mission to
            save Delhi&apos;s
            birds
          </p>

          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-4"
          >

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-navy mb-1">
                Full Name{' '}
                <span className="text-red-500">
                  *
                </span>
              </label>

              <input
                type="text"
                name="name"
                value={
                  formData.name
                }
                onChange={
                  handleChange
                }
                placeholder="Enter your name"
                className={`w-full px-4 py-3 bg-cream-dark border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy-light transition-all ${
                  errors.name
                    ? 'border-red-500'
                    : 'border-transparent'
                }`}
              />

              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {
                    errors.name
                  }
                </p>
              )}
            </div>

            {/* Colony */}
            <div>
              <label className="block text-sm font-semibold text-navy mb-1">
                Colony / Area in
                Delhi{' '}
                <span className="text-red-500">
                  *
                </span>
              </label>

              <select
                name="colony"
                value={
                  formData.colony
                }
                onChange={
                  handleChange
                }
                className={`w-full px-4 py-3 bg-cream-dark border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy-light transition-all appearance-none cursor-pointer ${
                  errors.colony
                    ? 'border-red-500'
                    : 'border-transparent'
                }`}
              >
                <option value="">
                  Select your
                  area
                </option>

                {colonyOptions.map(
                  (area) => (
                    <option
                      key={
                        area
                      }
                      value={
                        area
                      }
                    >
                      {area}
                    </option>
                  )
                )}
              </select>

              {errors.colony && (
                <p className="text-red-500 text-sm mt-1">
                  {
                    errors.colony
                  }
                </p>
              )}
            </div>

            {/* Source */}
            <div>
              <label className="block text-sm font-semibold text-navy mb-1">
                How did you hear
                about us?
              </label>

              <select
                name="source"
                value={
                  formData.source
                }
                onChange={
                  handleChange
                }
                className="w-full px-4 py-3 bg-cream-dark border-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-navy-light transition-all appearance-none cursor-pointer"
              >
                <option value="">
                  Select an
                  option
                </option>

                {sourceOptions.map(
                  (opt) => (
                    <option
                      key={
                        opt
                      }
                      value={
                        opt
                      }
                    >
                      {opt}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Station Type */}
            <div>
              <label className="block text-sm font-semibold text-navy mb-1">
                Type of Water
                Station
              </label>

              <select
                name="stationType"
                value={
                  formData.stationType
                }
                onChange={
                  handleChange
                }
                className="w-full px-4 py-3 bg-cream-dark border-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-navy-light transition-all appearance-none cursor-pointer"
              >
                <option value="">
                  Select an
                  option
                </option>

                {stationOptions.map(
                  (opt) => (
                    <option
                      key={
                        opt
                      }
                      value={
                        opt
                      }
                    >
                      {opt}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={
                isSubmitting
              }
              className="w-full bg-navy text-cream py-4 px-6 rounded-xl font-bold text-lg hover:bg-navy-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6 flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-cream/40 border-t-cream rounded-full animate-spin" />

                  <span>
                    Saving your
                    mission...
                  </span>
                </>
              ) : (
                'Join the Mission 🐦'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
