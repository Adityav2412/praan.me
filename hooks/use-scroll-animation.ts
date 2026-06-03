'use client';

import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

/**
 * Hook for scroll-triggered animations.
 * Returns `hasMounted` to gate animation classes (prevents hydration mismatch).
 * On server and before mount, `hasMounted` is false so no animation classes are applied.
 * After mount, `hasMounted` becomes true and `isVisible` tracks intersection.
 */
export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const { threshold = 0.1, rootMargin = '0px 0px -50px 0px', once = true } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Mark as mounted after hydration
  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [hasMounted, threshold, rootMargin, once]);

  return { ref, hasMounted, isVisible };
}

/**
 * Hook for animated counter.
 * Only animates after mount and when visible to prevent hydration mismatch.
 * Returns 0 on server, animates to target on client when visible.
 */
export function useAnimatedCounter(
  targetValue: number | null,
  duration: number = 1200,
  isVisible: boolean = true,
  hasMounted: boolean = true
) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Don't run on server or before mount
    if (!hasMounted) return;
    
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (targetValue === null || !isVisible) return;
    
    if (prefersReducedMotion) {
      setCount(targetValue);
      return;
    }

    if (hasAnimated.current) {
      setCount(targetValue);
      return;
    }

    hasAnimated.current = true;
    const startTime = performance.now();
    const startValue = 0;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease-out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.round(startValue + (targetValue - startValue) * easeOut);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [targetValue, duration, isVisible, hasMounted]);

  return count;
}

// Stagger delay calculator
export function getStaggerDelay(index: number, baseDelay: number = 80): number {
  return index * baseDelay;
}
