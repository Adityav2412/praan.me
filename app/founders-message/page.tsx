'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FoundersMessageRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/founder');
  }, [router]);

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <p className="text-navy/50 text-sm font-body">Redirecting...</p>
    </div>
  );
}
