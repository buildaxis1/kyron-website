import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  BarChart3,
  FileCheck2,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About | Kyron Medical",
  description:
    "Kyron Medical is transforming denial management with healthcare-grade AI that integrates with your EHR and billing stack.",
};

const highlights = [
  {
    icon: <Bot className="h-5 w-5 text-[#577DE8]" />,
    title: "Cutting Edge AI Agents",
    body: "Automate every phone call to health insurance.",
  },
  {
    icon: <BarChart3 className="h-5 w-5 text-[#577DE8]" />,
    title: "Integrated analytics",
    body: "Real‑time visibility by payer, provider, and code.",
  },
  {
    icon: <FileCheck2 className="h-5 w-5 text-[#577DE8]" />,
    title: "Audit trail",
    body: "Every step documented for compliance & QA.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5 text-[#577DE8]" />,
    title: "HIPAA‑compliant",
    body: "Security by design, from data to deployment.",
  },
];

export default function AboutPage() {
  return (
    <main
      className="relative overflow-hidden py-20 md:py-28"
      style={{
        background:
          "radial-gradient(1200px 600px at 0% -10%, rgba(2,132,199,0.10), transparent 50%), radial-gradient(900px 500px at 100% 10%, rgba(79,70,229,0.10), transparent 50%)",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          maskImage:
            "radial-gradient(ellipse at center, black 72%, transparent 100%)",
        }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(120,120,120,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,120,120,0.10)_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <div className="container relative">
        <div className="mx-auto max-w-5xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-500" />
            Our mission
          </div>
          <h1 className="mt-4 text-balance text-4xl font-bold tracking-[-0.02em] text-foreground sm:text-5xl">
            About Kyron Medical
          </h1>
          <div className="mt-6 max-w-3xl space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>
              Kyron Medical is transforming denial management with
              healthcare‑grade AI. We integrate with your EHR and billing stack
              to proactively identify, triage, and resolve claim denials
              turning months of paperwork into minutes of resolution.
            </p>
            <p>
              By automating repetitive tasks, Kyron reduces administrative
              burden and accelerates reimbursements, so your team can focus on
              care. The result: faster payments, lower costs, and a calmer RCM
              workflow.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {highlights.map((h) => (
              <div
                key={h.title}
                className="flex items-start gap-4 rounded-2xl border border-border/60 bg-background/70 p-5 shadow-sm backdrop-blur transition hover:shadow-md"
              >
                <div className="mt-0.5 rounded-xl border border-border/60 bg-background p-2.5">
                  {h.icon}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">
                    {h.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{h.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
            <span>Built for revenue‑cycle teams</span>
            <span className="text-border">•</span>
            <span>EHR &amp; clearinghouse friendly</span>
            <span className="text-border">•</span>
            <span>Fast, measurable time‑to‑value</span>
          </div>

          <div className="mt-12 rounded-2xl border border-border/60 bg-background/70 p-8 shadow-sm backdrop-blur">
            <h2 className="text-2xl font-bold text-foreground">Get started</h2>
            <p className="mt-2 text-muted-foreground">
              See Kyron in action with a guided interactive demo.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-[0_20px_25px_-10px_rgba(0,0,0,0.35)] transition hover:scale-[1.02] hover:bg-blue-800 active:scale-[0.98]"
            >
              Request a Demo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
