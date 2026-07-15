"use client";

import { toast } from "sonner";
import { Plug, Bot, Rocket, ShieldCheck, ArrowRight } from "lucide-react";

export default function HowItWorksOrganized() {
  const steps = [
    {
      id: "01",
      title: "Kickoff",
      sub: "Integrate your sources",
      desc: "Connect data from your EHR, clearinghouse, payer portals, and ERP. We handle mappings and HIPAA review.",
      duration: "1‑week average",
      Icon: Plug,
    },
    {
      id: "02",
      title: "Configure",
      sub: "Models + AI Agents",
      desc: "Stand up denial models, claim‑status and appeal‑drafting agents. Tune rules by payer and specialty.",
      duration: "3‑week average",
      Icon: Bot,
    },
    {
      id: "03",
      title: "Launch",
      sub: "Strategize + optimize",
      desc: "Weekly check‑ins and a dedicated Slack channel. Ongoing tuning for win‑rate and cycle‑time gains.",
      duration: "Ongoing",
      Icon: Rocket,
    },
  ];

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden py-20 md:py-28"
      style={{
        background:
          "radial-gradient(1200px 600px at 0% -10%, rgba(2,132,199,0.10), transparent 50%), radial-gradient(900px 500px at 100% 10%, rgba(79,70,229,0.10), transparent 50%)",
      }}
    >
      {/* Grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          maskImage:
            "radial-gradient(ellipse at center, black 72%, transparent 100%)",
        }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(120,120,120,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,120,120,0.10)_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      {/* Ambient accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-10 h-40 w-40 rounded-full bg-sky-400/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 top-10 h-44 w-44 rounded-full bg-fuchsia-400/20 blur-3xl"
      />

      <div className="container relative">
        {/* Top row: headline + CTA */}
        <div className="flex flex-col ">
          {/* Left copy */}
          <div className="flex flex-col">
            <div className="col-span-12 md:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-500" />
                Fast track to results
              </div>

              <h2 className="mt-3 text-balance text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl md:text-5xl">
                How Kyron Medical works
              </h2>

              <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                A guided onboarding built for revenue‑cycle teams. We connect
                your data, configure healthcare‑grade AI agents, and launch with
                ongoing optimization.
              </p>
            </div>

            {/* REQUIRED SNIPPET (kept intact) */}
            {/* <div
              className="mx-auto w-full pl-4 text-left md:w-1/3 md:pl-16"
              data-oid="275s-6s"
            >
              <h2
                className="mb-4 text-2xl font-bold md:text-4xl"
                data-oid="7ulpi-f"
              >
                Access an Interactive Demo of Kyron
              </h2>
              <p
                className="text-base text-muted-foreground md:text-lg"
                data-oid="-60w62c"
              >
                Experience Kyron&#39;s tailored solutions with our interactive
                demo.
              </p>

              <div className="mt-8" data-oid="rgzuan4">
                <button
                  onClick={() =>
                    toast.info("Prefer a live walkthrough?", {
                      description:
                        "We’ll reach out with scheduling options right after you submit.",
                    })
                  }
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                >
                  Book a live demo
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div> */}
            {/* END REQUIRED SNIPPET */}
          </div>

          {/* Right CTA column (wrapper ensures clean width) */}
        </div>

        {/* Timeline card */}
        <div className="mt-12 rounded-2xl border border-border/60 bg-background/70 p-5 shadow-sm backdrop-blur md:p-7">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <h3 className="text-lg font-semibold text-foreground">
              Onboarding guided by RCM experts
            </h3>
          </div>

          {/* Progress rail */}
          <div className="relative mt-6">
            <div className="mx-1 h-[2px] w-[calc(100%-0.5rem)] bg-border" />
            <div className="mt-[-7px] flex justify-between px-1">
              <span className="h-3 w-3 rounded-full border border-border bg-background ring-4 ring-background/50" />
              <span className="h-3 w-3 rounded-full border border-border bg-background ring-4 ring-background/50" />
              <span className="h-3 w-3 rounded-full border border-border bg-background ring-4 ring-background/50" />
            </div>
          </div>

          {/* Steps */}
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            {steps.map(({ id, title, sub, desc, duration, Icon }) => (
              <div key={id} className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-7 min-w-[28px] items-center justify-center rounded-md border border-border/60 bg-muted/40 text-[11px] font-semibold">
                    {id}
                  </span>
                  <span className="rounded-md border border-border/60 bg-muted/40 px-2 py-1 text-xs font-medium">
                    {title}
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-lg border border-border/60 bg-background p-2">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{sub}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {desc}
                    </p>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground">{duration}</div>
              </div>
            ))}
          </div>

          {/* Trust strip */}
          <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3 py-1 text-xs text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
            HIPAA‑compliant processing • Dedicated Slack support • Full audit
            trail
          </div>
          <div className="flex items-center justify-end align-middle">
            {/* <button
              onClick={() =>
                toast.success("We’ll help you get started in minutes.", {
                  description:
                    "A Kyron specialist will reach out after you submit.",
                })
              }
              className="inline-flex items-center justify-center rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_20px_-10px_rgba(0,0,0,0.35)] transition hover:scale-[1.02] hover:bg-blue-800 active:scale-[0.98]"
            >
              Book a demo
            </button> */}
            <button
              onClick={() => {
                toast.info("Prefer a live walkthrough?", {
                  description:
                    "We’ll reach out with scheduling options right after you submit.",
                });
                setTimeout(() => {
                  console.log("Redirecting to form...");
                  window.location.href =
                    "https://kyronmedical.com/contact";
                }, 1000);
              }}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              Book a live demo
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Layout fixes for the required snippet (kept separate and scoped) */}
      <style jsx global>{`
        /* Ensure the required block doesn't shrink to 1/3 width on md screens */
        #how-it-works [data-oid="275s-6s"] {
          width: 100% !important;
          padding-left: 0 !important;
        }
        @media (min-width: 768px) {
          #how-it-works [data-oid="275s-6s"] {
            width: 100% !important;
            padding-left: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
