'use client';

interface ImpactCounterProps {
  saviourCount: number | null;
}

export default function ImpactCounter({
  saviourCount,
}: ImpactCounterProps) {
  const count = saviourCount ?? 0;
  const estimatedBirds = count * 25;

  return (
    <section
      id="impact"
      className="py-16 px-4 bg-cream"
    >
      <div className="max-w-4xl mx-auto">

        <h2 className="text-4xl font-extrabold text-navy text-center mb-10">
          💧 Estimated Birds Helped
        </h2>

        <div className="bg-cream-dark rounded-2xl p-8 md:p-10 shadow-lg border border-navy/10 text-center">

          {saviourCount === null ? (
            <div className="space-y-4 mb-8">
              <div className="h-12 w-56 max-w-full mx-auto bg-navy/10 rounded-xl animate-pulse" />

              <div className="h-6 w-64 max-w-full mx-auto bg-navy/10 rounded animate-pulse" />
            </div>
          ) : (
            <>
              <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy mb-4">
                ≈ {estimatedBirds}+ Birds Helped
              </p>

              <p className="text-lg md:text-xl font-semibold text-navy/80 mb-8">
                🐦 {saviourCount} Saviours Across Delhi
              </p>
            </>
          )}

          <p className="text-navy/70 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Every water bowl can help dozens of birds stay
            hydrated during Delhi&apos;s extreme summer heat.
          </p>
        </div>
      </div>
    </section>
  );
}
