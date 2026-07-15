// app/10k/page.tsx
import type { Metadata } from "next";
import ReferralCTA from "./_components/ReferralCTA";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Earn Up To $10K — Kyron Medical Referral Program",
  description:
    "Refer a physician or practice to Kyron Medical and earn up to $10,000. " +
    "Read the official Terms & Conditions and submit your referral.",
  alternates: { canonical: "https://www.kyronmedical.com/10k" },
  openGraph: {
    title: "Earn Up To $10K — Kyron Medical",
    description:
      "Refer a physician or practice to Kyron Medical and earn up to $10,000.",
    url: "https://www.kyronmedical.com/10k",
    siteName: "Kyron Medical",
  },
};

export default function ReferralProgramPage() {
  return (
    <main className="relative overflow-hidden">
      {/* Soft background with subtle orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-sky-400/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-24 h-[340px] w-[340px] rounded-full bg-fuchsia-400/20 blur-3xl"
      />

      {/* Hero / CTA */}
      <section className="relative z-10 border-b border-border/60 bg-background/70 py-12 backdrop-blur md:py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-balance text-3xl font-extrabold tracking-[-0.02em] text-foreground sm:text-4xl">
              Kyron Medical Referral Commission Program
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Refer a doctor or practice and earn a one‑time commission of up to
              $10,000 when they become a paying client.
            </p>

            {/* Big, centered button at the very top as requested */}
            <div className="mt-8">
              <ReferralCTA />
            </div>

            <div className="mx-auto mt-6 h-px w-24 rounded bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          </div>
        </div>
      </section>

      {/* Terms & Conditions (rendered server-side for speed and SEO) */}
      <section className="relative z-10 py-10 md:py-14 lg:py-16">
        <div className="container">
          <article className="mx-auto max-w-3xl space-y-8 leading-relaxed">
            <header className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Effective Date: September 5, 2025
              </p>
              <h2 className="text-2xl font-bold tracking-[-0.01em] text-foreground">
                Terms & Conditions
              </h2>
            </header>

            <section className="rounded-xl border border-border/60 bg-muted/40 p-5">
              <h3 className="text-lg font-semibold">Plain English Summary</h3>
              <p className="mt-2 text-muted-foreground">
                If you refer a doctor or practice to Kyron Medical and they sign
                on as a new paying client, you can earn a one‑time commission of
                up to $10,000. Referrals must be submitted through our secure
                form, and only new, privately billed clients qualify (not
                Medicare, Medicaid, or other government program providers).
                Commissions are paid within 30 days of the client’s first
                payment. Referral income is taxable, and we’ll issue a 1099 if
                you earn $600 or more in a year. This summary is for
                convenience; the full Terms & Conditions below govern.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold">1. Eligibility</h3>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-muted-foreground">
                <li>
                  Open only to individuals who are U.S. residents and at least
                  18 years old.
                </li>
                <li>
                  Employees, officers, contractors, and agents of Kyron Medical,
                  and their immediate family members, are not eligible.
                </li>
                <li>
                  Participants must not be healthcare providers referring their
                  own patients.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold">
                2. What Qualifies as a Referral
              </h3>
              <p className="mt-2 text-muted-foreground">
                A “referral” is valid only if:
              </p>
              <ol className="mt-2 list-decimal space-y-2 pl-5 text-muted-foreground">
                <li>
                  It is submitted through Kyron Medical’s secure referral form
                  (no public postings).
                </li>
                <li>
                  The referred physician, medical group, or practice is not
                  already in contact with or a client of Kyron Medical.
                </li>
                <li>
                  The referred practice signs a services agreement with Kyron
                  Medical within two (2) months of first submission.
                </li>
                <li>
                  The referred practice makes its first payment under that
                  agreement.
                </li>
              </ol>
            </section>

            <section>
              <h3 className="text-lg font-semibold">3. Commission Structure</h3>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-muted-foreground">
                <li>
                  For each Qualified Referral, participants may earn a one‑time
                  commission of up to $10,000 per referral.
                </li>
                <li>
                  The commission amount is determined based on the size and
                  value of the client engagement, and calculated at 3% of net
                  collected payments actually collected by Kyron Medical from
                  the referred client, subject to the $10,000 cap.
                </li>
                <li>
                  Commissions will be paid to participants within 30 days after
                  Kyron Medical receives a client payment under the signed
                  services agreement.
                </li>
                <li>
                  No commission is owed if the referral fails to meet all
                  eligibility requirements described in these Terms.
                </li>
                <li>
                  No commissions will accrue or be paid on payments received
                  more than 6 months after the referred practice makes its first
                  payment to Kyron Medical.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold">
                4. Exclusions (Healthcare Compliance)
              </h3>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-muted-foreground">
                <li>This Program applies only to privately billed services.</li>
                <li>
                  Referrals involving physicians, practices, or patients who
                  participate in federal or state healthcare programs (including
                  Medicare, Medicaid, Tricare, VA, or similar) are ineligible.
                </li>
                <li>
                  Any attempt to claim commissions for ineligible referrals is
                  void and may result in disqualification.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold">
                5. State Law Restrictions
              </h3>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-muted-foreground">
                <li>
                  Certain states (including but not limited to California, New
                  York, and Texas) prohibit or restrict payments for medical
                  referrals under fee‑splitting or corporate practice of
                  medicine laws.
                </li>
                <li>
                  Commissions will not be paid where such payments are
                  prohibited by law and any referral submitted from a prohibited
                  state is automatically void.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold">6. Taxes</h3>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-muted-foreground">
                <li>All referral payments are taxable income.</li>
                <li>
                  Kyron Medical will issue IRS Form 1099‑NEC for payments of
                  $600 or more in a calendar year. Participants must provide a
                  valid IRS Form W‑9 to receive payment.
                </li>
                <li>
                  Participants are solely responsible for reporting and paying
                  any federal, state, or local taxes.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold">7. Privacy & Data Use</h3>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-muted-foreground">
                <li>
                  Referrals must be submitted via Kyron Medical’s secure form.
                </li>
                <li>
                  Do not share physician names, contact details, or personal
                  health information in public comments or posts.
                </li>
                <li>
                  Participants must not disclose Protected Health Information
                  (PHI). Only provide non‑sensitive contact details via the
                  secure referral form.
                </li>
                <li>
                  Referral information is handled in accordance with Kyron
                  Medical’s Privacy Policy, available at
                  kyronmedical.com/privacy.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold">
                8. Independent Contractor Status
              </h3>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-muted-foreground">
                <li>
                  Participants are independent contractors, not employees or
                  agents of Kyron Medical.
                </li>
                <li>
                  Participation does not create an employment, partnership,
                  joint venture, franchise, or agency relationship with Kyron
                  Medical.
                </li>
                <li>
                  Participation does not entitle you to benefits, ongoing
                  compensation, or reimbursement.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold">
                9. Program Changes & Termination
              </h3>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-muted-foreground">
                <li>
                  Kyron Medical may modify, suspend, or terminate the Program at
                  any time.
                </li>
                <li>
                  Notice of changes will be provided via the Program webpage or
                  by email.
                </li>
                <li>
                  Referrals submitted before termination will be honored if
                  eligibility requirements are met.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold">
                10. Limitation of Liability
              </h3>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-muted-foreground">
                <li>
                  Kyron Medical’s total liability under this Program is limited
                  to the amount of commission owed for qualified referrals.
                </li>
                <li>
                  To the maximum extent permitted by law, Kyron Medical shall
                  not be liable for any indirect, incidental, or consequential
                  damages.
                </li>
                <li>
                  Kyron Medical is not responsible for lost, late, or incomplete
                  submissions.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold">
                11. Governing Law; Dispute Resolution
              </h3>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-muted-foreground">
                <li>
                  Terms are governed by the laws of the State of Delaware,
                  without regard to conflict‑of‑law rules.
                </li>
                <li>
                  Any disputes will be resolved exclusively by binding
                  arbitration administered by the American Arbitration
                  Association (AAA) in accordance with its Commercial
                  Arbitration Rules. The place of arbitration will be
                  Wilmington, Delaware. Judgment on the award rendered by the
                  arbitrator(s) may be entered in any court having jurisdiction
                  thereof.
                </li>
                <li>
                  Each participant waives any right to a jury trial in
                  connection with any dispute arising under or related to this
                  Program.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold">12. Miscellaneous</h3>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-muted-foreground">
                <li>
                  Comments on LinkedIn posts may be used for engagement
                  purposes, but referrals must be submitted through the secure
                  referral form to qualify. Do not share physician names or
                  personal details in comments.
                </li>
                <li>
                  Kyron Medical reserves the right to audit referral submissions
                  and withhold or claw back payments in cases of suspected
                  fraud, misrepresentation, or regulatory inquiry.
                </li>
                <li>
                  Provisions relating to taxes, audit, claw back,
                  confidentiality, limitation of liability, governing law, and
                  dispute resolution will survive termination of the Program.
                </li>
                <li>
                  Participants may not represent themselves as agents or
                  employees of Kyron Medical, use Kyron branding without
                  permission, or make representations about Kyron’s services to
                  prospective clients. Participants may not make statements
                  about commissions to others or publicly market the Program
                  without prior written approval from Kyron Medical.
                </li>
              </ul>
            </section>

            {/* Bottom CTA for convenience */}
            <div className="flex justify-center pt-4">
              <ReferralCTA size="sm" />
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
