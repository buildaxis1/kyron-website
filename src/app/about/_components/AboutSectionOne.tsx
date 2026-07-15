import GetStarted from "@/app/_components/ui/started-button";
import { Bot, Activity, FileText, ShieldCheck, LineChart } from "lucide-react";

const AboutSectionOne = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-muted/30 py-16 md:py-20 lg:py-28 pb-16 md:pb-20 lg:pb-0">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-gradient-to-br from-primary/10 to-blue-500/10 blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-gradient-to-tl from-purple-500/8 to-pink-500/8 blur-3xl animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-gradient-to-t from-cyan-500/8 to-transparent blur-3xl" />
      </div>

      {/* Animated grid pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.015]">
        <div className="h-full w-full bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="container relative">
        <div className="mx-auto mb-8 flex w-full flex-col items-start justify-center gap-8 lg:w-[80%] lg:flex-row lg:gap-10 lg:px-0 lg:-mb-24">
          {/* Left: narrative */}
          <div className="w-full px-4 lg:col-span-7 lg:px-0">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              About Kyron Medical
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Kyron Medical is transforming denial management with
              healthcare-grade AI. We integrate with your EHR and billing stack
              to proactively identify, triage, and resolve claim denials turning
              months of paperwork into minutes of resolution.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              By automating repetitive tasks, Kyron reduces administrative
              burden and accelerates reimbursements, so your team can focus on
              care. The result: faster payments, lower costs, and a calmer RCM
              workflow.
            </p>

            {/* Value bullets */}
            <ul
              className="mt-8 grid grid-cols-1 justify-items-center gap-4
               sm:grid-cols-2 sm:justify-items-start"
            >
              <li className="mx-auto flex max-w-sm items-start gap-3 rounded-xl border border-border/60 bg-background/70 p-4 sm:mx-0 sm:max-w-none">
                <div className="rounded-md border border-border/60 bg-muted/40 p-2">
                  <Bot className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">Cutting Edge AI Agents</p>
                  <p className="text-sm text-muted-foreground">
                    Automate every phone call to health insurance.
                  </p>
                </div>
              </li>

              <li className="mx-auto flex max-w-sm items-start gap-3 rounded-xl border border-border/60 bg-background/70 p-4 sm:mx-0 sm:max-w-none">
                <div className="rounded-md border border-border/60 bg-muted/40 p-2">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">Integrated analytics</p>
                  <p className="text-sm text-muted-foreground">
                    Real‑time visibility by payer, provider, and code.
                  </p>
                </div>
              </li>

              <li className="mx-auto flex max-w-sm items-start gap-3 rounded-xl border border-border/60 bg-background/70 p-4 sm:mx-0 sm:max-w-none">
                <div className="rounded-md border border-border/60 bg-muted/40 p-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">Audit trail</p>
                  <p className="text-sm text-muted-foreground">
                    Every step documented for compliance & QA.
                  </p>
                </div>
              </li>

              <li className="mx-auto flex max-w-sm items-start gap-3 rounded-xl border border-border/60 bg-background/70 p-4 sm:mx-0 sm:max-w-none">
                <div className="rounded-md border border-border/60 bg-muted/40 p-2">
                  <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">HIPAA‑compliant</p>
                  <p className="text-sm text-muted-foreground">
                    Security by design, from data to deployment.
                  </p>
                </div>
              </li>
            </ul>

            {/* small stat strip */}
            <div className="mt-6 inline-flex flex-wrap items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-2 text-xs text-muted-foreground sm:gap-3 sm:px-5">
              <LineChart className="h-4 w-4 shrink-0" />
              <span className="text-center sm:text-left">
                Built for revenue‑cycle teams • EHR & clearinghouse friendly • Fast, measurable time‑to‑value
              </span>
            </div>
          </div>

          {/* Right: CTA column */}
          <div className="w-full lg:col-span-5">
            <div className="mx-4 mb-12 rounded-2xl border border-border/60 bg-background/70 p-6 shadow-sm backdrop-blur sm:mx-0 sm:p-8 lg:sticky lg:top-24 lg:mb-0 lg:p-12">
              <h3 className="text-xl font-semibold sm:text-2xl">Get started</h3>
              <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                See Kyron in action with a guided interactive demo.
              </p>
              <div className="mt-6 flex justify-center sm:mt-8">
                <GetStarted />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionOne;
