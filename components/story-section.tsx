'use client';

import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

interface StorySectionProps {
  heading: string;
  text: string;
  imagePosition: 'left' | 'right';
  imageSrc?: string;
  id?: string;
}

export default function StorySection({
  heading,
  text,
  imagePosition,
  imageSrc,
  id,
}: StorySectionProps) {
  const { ref: sectionRef, hasMounted, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const imageBlock = imageSrc ? (
    <div className="relative h-[240px] sm:h-[280px] w-full rounded-xl overflow-hidden">
      <Image
        src={imageSrc}
        alt=""
        fill
        sizes="(min-width: 1024px) 50vw, 90vw"
        className="object-cover"
      />
    </div>
  ) : (
    <div className="flex items-center justify-center h-[240px] sm:h-[280px] w-full rounded-xl bg-[var(--bg-surface)]">
      <svg
        className="w-16 h-16 text-[var(--text-muted)] opacity-40"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
        />
      </svg>
    </div>
  );

  const textBlock = (
    <div className="flex flex-col justify-center">
      <h2 className="font-display text-3xl sm:text-4xl text-[var(--text-primary)] mb-4">
        {heading}
      </h2>
      <p className="font-body text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
        {text}
      </p>
    </div>
  );

  return (
    <section id={id} className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[var(--bg-base)]">
      <div
        ref={sectionRef}
        className={`max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
          hasMounted ? `motion-reveal ${isVisible ? 'is-visible' : ''}` : ''
        }`}
      >
        {imagePosition === 'left' ? (
          <>
            {imageBlock}
            {textBlock}
          </>
        ) : (
          <>
            {textBlock}
            {imageBlock}
          </>
        )}
      </div>
    </section>
  );
}
