import Link from 'next/link';

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="text-sm text-[#7A7468] mb-12">
          Last updated: June 2026
        </p>

        {/* Content */}
        <div className="space-y-10 text-[#1A1A18]/80 text-base leading-relaxed">
          {/* Section 1 */}
          <section>
            <h2 className="font-display text-xl font-semibold text-[#1A1A18] mb-3">
              What data we collect
            </h2>
            <p>
              When you submit the &quot;Become a Saviour&quot; form, we collect:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-[#7A7468]">
              <li>Your name</li>
              <li>Colony / location in Delhi</li>
              <li>Bowl station details (type of container)</li>
              <li>How you heard about us (optional)</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="font-display text-xl font-semibold text-[#1A1A18] mb-3">
              How we use your data
            </h2>
            <p>
              Your name and location are displayed on the public Saviours wall on our website.
              This data is used solely to track Water For Wings initiative progress and to
              inspire others to participate.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="font-display text-xl font-semibold text-[#1A1A18] mb-3">
              Data storage
            </h2>
            <p>
              All submitted data is stored in Google Sheets, a third-party service provided
              by Google LLC. We do not maintain a separate database. Data is accessed via
              Google Apps Script for display on this website.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="font-display text-xl font-semibold text-[#1A1A18] mb-3">
              Your rights
            </h2>
            <p>
              You have the right to request removal of your data at any time. To do so,
              please email us at{' '}
              <a href="mailto:akshay@praan.me" className="text-[#5C7A5A] underline underline-offset-2">
                akshay@praan.me
              </a>{' '}
              with your name and we will remove your entry within 48 hours.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="font-display text-xl font-semibold text-[#1A1A18] mb-3">
              No cookies, no tracking, no ads
            </h2>
            <p>
              This website does not use cookies for tracking purposes, does not serve
              advertisements, and does not share your data with any third party for
              marketing. We use Microsoft Clarity for anonymous page analytics and
              Vercel Analytics for performance monitoring only.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="font-display text-xl font-semibold text-[#1A1A18] mb-3">
              Governing law
            </h2>
            <p>
              This privacy policy is governed by the laws of India, including the
              Information Technology Act, 2000 and the Digital Personal Data Protection
              Act, 2023 (DPDP Act). Any disputes shall be subject to the jurisdiction
              of courts in Delhi, India.
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
