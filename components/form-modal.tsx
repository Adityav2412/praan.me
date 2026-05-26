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
      // submit form
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

      // FORCE fresh sync
      await refreshSaviours();

      const latestSaviours =
        getSaviours();

      // latest entry
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

      <div
        className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-cream border-4 border-navy rounded-2xl shadow-2xl w-full max-w-md animate-slide-up overflow-hidden">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-cream-dark rounded-lg transition-colors z-10"
          aria-label="Close"
        >
          <X className="w-6 h-6 text-navy" />
        </button>

        <div className="p-8">

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
            Join the mission to save Delhi&apos;s birds
          </p>

          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-4"
          >
            {/* KEEP ALL YOUR EXISTING INPUTS SAME */}
