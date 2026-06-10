import Link from 'next/link';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F4] px-6 py-20 sm:py-28">
      <div className="max-w-[720px] mx-auto">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#7A7468] hover:text-[#1A1A18] transition-colors mb-12"
        >
          ← Back to home
        </Link>

        {/* Title */}
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#1A1A18] mb-4">
          Terms of Use
        </h1>
        <p className="text-sm text-[#7A7468] mb-12">
          Last updated: June 2026
        </p>

        {/* Content */}
        <div className="space-y-10 text-[#1A1A18]/80 text-base leading-relaxed">
          {/* Section 1 */}
          <section>
            <h2 className="font-display text-xl font-semibold text-[#1A1A18] mb-3">
              Voluntary community initiative
            </h2>
            <p>
              Water For Wings is a voluntary, non-commercial community initiative operated
              under Praan. It is not a registered business or commercial service. Participation
              is entirely voluntary and free of cost.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="font-display text-xl font-semibold text-[#1A1A18] mb-3">
              Public display of information
            </h2>
            <p>
              By submitting the &quot;Become a Saviour&quot; form, you agree that your name and
              colony/location will be displayed publicly on the Saviours wall on this website.
              This information is visible to all visitors of praan.me.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="font-display text-xl font-semibold text-[#1A1A18] mb-3">
              Right to remove entries
            </h2>
            <p>
              Praan reserves the right to remove any entry from the Saviours wall at its
              discretion, including entries that contain inappropriate, offensive, or
              misleading information.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="font-display text-xl font-semibold text-[#1A1A18] mb-3">
              No warranties
            </h2>
            <p>
              This website and the Water For Wings initiative are provided &quot;as is&quot; without
              any warranties of any kind, express or implied. This is a goodwill initiative
              — we make no guarantees regarding uptime, data accuracy, or continuity of
              the platform.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="font-display text-xl font-semibold text-[#1A1A18] mb-3">
              Governing law
            </h2>
            <p>
              These terms are governed by and construed in accordance with the laws of India.
              Any disputes arising from use of this website shall be subject to the exclusive
              jurisdiction of courts in Delhi, India.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-[#1A1A18]/10">
          <p className="text-xs text-[#7A7468]">
            Praan · Water For Wings · A community initiative
          </p>
        </div>
      </div>
    </main>
  );
}
