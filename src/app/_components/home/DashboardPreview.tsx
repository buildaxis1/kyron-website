"use client";

import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import {
  Plus,
  Filter,
  Download,
  Search,
  ChevronDown,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Bot,
  Activity,
  CalendarClock,
  UserRound,
} from "lucide-react";

type Row = {
  id: string;
  encId: string;
  first: string;
  last: string;
  physician: string;
  dos: string;
};

const tabs = [
  "Eligibility & Benefits",
  "Prior Authorization",
  "Claim Status",
  "Denial Appeals",
] as const;

const sampleData: Record<(typeof tabs)[number], Row[]> = {
  "Eligibility & Benefits": [
    {
      id: "1",
      encId: "enc_3idcz003",
      first: "Alex",
      last: "Chen",
      physician: "Dr. Palmer",
      dos: "2025-05-02 10:20",
    },
    {
      id: "2",
      encId: "enc_3idcu003",
      first: "Jamie",
      last: "Rivera",
      physician: "Dr. Torres",
      dos: "2025-05-06 14:15",
    },
    {
      id: "3",
      encId: "enc_3idcm003",
      first: "Taylor",
      last: "Nguyen",
      physician: "Dr. Moore",
      dos: "2025-05-09 09:00",
    },
  ],
  "Prior Authorization": [
    {
      id: "4",
      encId: "enc_pa104",
      first: "Jordan",
      last: "Brooks",
      physician: "Dr. Shah",
      dos: "2025-04-28 11:10",
    },
    {
      id: "5",
      encId: "enc_pa221",
      first: "Morgan",
      last: "Avery",
      physician: "Dr. Patel",
      dos: "2025-05-03 15:45",
    },
  ],
  "Claim Status": [
    {
      id: "6",
      encId: "enc_cs650",
      first: "Riley",
      last: "Park",
      physician: "Dr. Kim",
      dos: "2025-04-07 08:45",
    },
    {
      id: "7",
      encId: "enc_cs812",
      first: "Casey",
      last: "Lee",
      physician: "Dr. Brown",
      dos: "2025-05-01 13:00",
    },
    {
      id: "8",
      encId: "enc_cs913",
      first: "Avery",
      last: "Diaz",
      physician: "Dr. Baker",
      dos: "2025-05-08 16:10",
    },
  ],
  "Denial Appeals": [
    {
      id: "9",
      encId: "enc_da441",
      first: "Sloan",
      last: "Green",
      physician: "Dr. Carter",
      dos: "2025-04-18 12:25",
    },
    {
      id: "10",
      encId: "enc_da502",
      first: "Devon",
      last: "Jules",
      physician: "Dr. Ahmed",
      dos: "2025-05-10 10:05",
    },
  ],
};

const DashboardPreview = () => {
  const [active, setActive] = useState<(typeof tabs)[number]>("Claim Status");

  // Simple 3D tilt for the preview card
  const ref = useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-40, 40], [8, -8]), {
    stiffness: 140,
    damping: 12,
    mass: 0.6,
  });
  const ry = useSpring(useTransform(mx, [-40, 40], [-8, 8]), {
    stiffness: 140,
    damping: 12,
    mass: 0.6,
  });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    mx.set(Math.max(-40, Math.min(40, x / 6)));
    my.set(Math.max(-40, Math.min(40, y / 6)));
  };

  const resetTilt = () => {
    mx.set(0);
    my.set(0);
  };

  const rows = sampleData[active];

  const headerBadge = useMemo(() => {
    switch (active) {
      case "Eligibility & Benefits":
        return { tone: "text-sky-600", bg: "bg-sky-500/10", label: "EB" };
      case "Prior Authorization":
        return {
          tone: "text-amber-600",
          bg: "bg-amber-500/10",
          label: "PA",
        };
      case "Claim Status":
        return { tone: "text-violet-600", bg: "bg-violet-500/10", label: "CS" };
      default:
        return {
          tone: "text-emerald-600",
          bg: "bg-emerald-500/10",
          label: "DA",
        };
    }
  }, [active]);

  return (
    <section
      id="denial-intelligence"
      className="relative overflow-hidden py-20 md:py-28"
      style={{
        background:
          "radial-gradient(1200px 600px at 0% -10%, rgba(2,132,199,0.10), transparent 50%), radial-gradient(900px 500px at 100% 10%, rgba(79,70,229,0.10), transparent 50%)",
      }}
    >
      {/* soft grid */}
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

      <div className="container relative">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-2 xl:gap-20">
          {/* Left copy */}
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              Denial Intelligence
            </div>

            <h2 className="text-balance text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl md:text-5xl">
              Every denial explained, appealed, and recovered.
            </h2>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Denial Intelligence turns vague payer denials into structured,
              actionable data. Voice AI calls payers to clarify denial reasons,
              analytics surface the patterns behind them, and AI agents draft
              appeals — all from one auditable dashboard.
            </p>

            <ul className="mt-6 grid grid-cols-1 gap-2 text-sm text-muted-foreground sm:grid-cols-2">
              <li className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Queue management with real‑time status
              </li>
              <li className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-sky-500" />
                HIPAA‑compliant audit trail
              </li>
              <li className="inline-flex items-center gap-2">
                <Activity className="h-4 w-4 text-violet-500" />
                Trends and recoveries at a glance
              </li>
              <li className="inline-flex items-center gap-2">
                <Bot className="h-4 w-4 text-amber-500" />
                AI agents for triage and appeals
              </li>
            </ul>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:items-start">
              <Link
                href="https://kyronmedical.com/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-[0_20px_25px_-5px_rgba(0,0,0,0.35),0_10px_10px_-5px_rgba(0,0,0,0.1)] transition hover:scale-[1.02] hover:bg-blue-800 active:scale-[0.98] sm:px-6 sm:text-base"
                onClick={() =>
                  toast.success("Demo request sent.", {
                    description:
                      "We’ll reach out with scheduling options shortly.",
                  })
                }
              >
                See Denial Intelligence live
                <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                onClick={() =>
                  toast.info("Sample CSV on the way!", {
                    description:
                      "We're preparing a small dataset you can test.",
                    action: {
                      label: "Notify me",
                      onClick: () =>
                        toast.success("You'll get an email when it's ready."),
                    },
                  })
                }
                href="/templates/EB_Template.xlsx"
                download
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background/70 px-5 py-3 text-sm font-semibold text-foreground backdrop-blur transition hover:scale-[1.02] hover:bg-accent active:scale-[0.98] sm:px-6 sm:text-base"
              >
                Download sample CSV
                <Download className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Right: interactive dashboard card */}
          <div className="relative">
            <div className="pointer-events-none absolute -left-10 -top-12 h-44 w-44 rounded-full bg-sky-400/30 blur-3xl" />
            <div className="pointer-events-none absolute -right-6 top-6 h-36 w-36 rounded-full bg-fuchsia-400/30 blur-3xl" />

            <motion.div
              ref={ref}
              onMouseMove={handleMove}
              onMouseLeave={resetTilt}
              style={{ perspective: 1200 }}
              className="relative"
            >
              <motion.div
                style={{ rotateX: rx, rotateY: ry }}
                className="relative isolate rounded-2xl border border-border/60 bg-background/70 p-4 shadow-2xl backdrop-blur-lg"
              >
                <div className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-[radial-gradient(600px_200px_at_50%_0%,rgba(59,130,246,0.15),transparent),radial-gradient(400px_200px_at_90%_10%,rgba(147,51,234,0.15),transparent)]" />

                {/* Top chrome */}
                <div className="flex items-center justify-between rounded-xl border border-border/50 bg-muted/40 px-3 py-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    <span className="font-medium">Organization Dashboard</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Showing
                    <span className="mx-1 rounded-md border border-border/60 bg-background/80 px-1.5 py-0.5">
                      10
                    </span>
                    per list
                  </div>
                </div>

                {/* Toolbar */}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <div className="relative flex flex-1 items-center">
                    <Search className="pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground" />
                    <input
                      placeholder="Search encounters…"
                      className="h-9 w-full rounded-lg border border-border/60 bg-background/70 pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
                      onFocus={() =>
                        toast.message("Tip", {
                          description:
                            "Search by Encounter ID, patient, or physician.",
                        })
                      }
                    />
                  </div>

                  <button
                    onClick={() =>
                      toast.info("Filter panel opening soon.", {
                        action: {
                          label: "Notify me",
                          onClick: () =>
                            toast.success("We’ll let you know at launch."),
                        },
                      })
                    }
                    className="inline-flex h-9 items-center gap-2 rounded-lg border border-border/60 bg-muted/40 px-3 text-sm"
                  >
                    <Filter className="h-4 w-4" />
                    Filters
                  </button>

                  <button
                    onClick={() =>
                      toast.success("New case created.", {
                        description: "Draft your appeal or assign to an agent.",
                      })
                    }
                    className="inline-flex h-9 items-center gap-2 rounded-lg bg-blue-700 px-3 text-sm font-semibold text-white hover:bg-blue-800"
                  >
                    <Plus className="h-4 w-4" />
                    New Case
                  </button>
                </div>

                {/* Tabs */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {tabs.map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        setActive(t);
                        toast.message("Switched workflow", {
                          description: t,
                        });
                      }}
                      className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                        active === t
                          ? "border-primary/40 bg-primary/10 text-primary"
                          : "border-border/60 bg-muted/40 text-muted-foreground hover:bg-muted/60"
                      }`}
                    >
                      <span
                        className={`rounded bg-white/70 px-1.5 py-0.5 text-[10px] font-semibold ${headerBadge.tone}`}
                      >
                        {t.split(" ")[0]}
                      </span>
                      <span className="hidden sm:block">{t}</span>
                    </button>
                  ))}
                </div>

                {/* Table */}
                <div className="mt-4 rounded-xl border border-border/60 bg-background/80">
                  {/* header row */}
                  <div className="grid grid-cols-6 items-center gap-2 border-b border-border/60 px-3 py-2 text-xs font-medium text-muted-foreground">
                    <span className="col-span-2 flex items-center gap-1">
                      <Bot className="h-3.5 w-3.5 text-emerald-500" />
                      Kyron AI Updates
                    </span>
                    <span className="col-span-2">
                      Encounter ID
                      <ChevronDown className="ml-1 inline h-3 w-3 opacity-70" />
                    </span>
                    <span className="hidden sm:block">Physician</span>
                    <span className="text-right">Date of Service</span>
                  </div>

                  <AnimatePresence initial={false} mode="popLayout">
                    {rows.map((r, i) => (
                      <motion.div
                        key={`${active}-${r.id}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{
                          delay: 0.05 + i * 0.05,
                          type: "spring",
                          stiffness: 140,
                          damping: 18,
                        }}
                        className="grid grid-cols-6 items-center gap-2 px-3 py-3 text-sm"
                      >
                        <div className="col-span-2 flex items-center gap-2">
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                          </span>
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">
                              {active === "Denial Appeals"
                                ? "Appeal drafted"
                                : active === "Prior Authorization"
                                  ? "PA verified"
                                  : active === "Eligibility & Benefits"
                                    ? "Eligibility checked"
                                    : "Status retrieved"}
                            </span>
                            <span className="text-[11px] text-muted-foreground/80">
                              <CalendarClock className="mr-1 inline h-3 w-3" />
                              Updated 2m ago
                            </span>
                          </div>
                        </div>

                        <div className="col-span-2">
                          <div className="font-medium">{r.encId}</div>
                          <div className="text-xs text-muted-foreground">
                            <UserRound className="mr-1 inline h-3 w-3" />
                            {r.first} {r.last}
                          </div>
                        </div>

                        <div className="hidden text-muted-foreground sm:block">
                          {r.physician}
                        </div>

                        <div className="text-right text-muted-foreground">
                          {r.dos}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Footer */}
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <div className="inline-flex items-center gap-2">
                    <span
                      className={`rounded px-2 py-0.5 ${headerBadge.bg} ${headerBadge.tone}`}
                    >
                      {headerBadge.label}
                    </span>
                    <span>Last sync 15s ago</span>
                  </div>
                  <button
                    onClick={() =>
                      toast.success("Agents deployed across workflows.")
                    }
                    className="inline-flex items-center gap-1 text-primary hover:underline"
                  >
                    Launch agents
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.div>

              {/* Helper bubble */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="absolute -left-6 -top-6 hidden rounded-full border border-border bg-background/90 px-3 py-1 text-xs shadow-md backdrop-blur md:block"
              >
                Try clicking tabs to switch workflows
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Demo video slot — recording to be embedded */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto mt-16 max-w-4xl"
        >
          <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-border/60 bg-background/70 shadow-lg backdrop-blur">
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <Sparkles className="h-12 w-12 text-violet-500/70" />
              <p className="text-sm font-medium">
                Product demo — insurance calling workflow, voice AI, Denial
                Intelligence dashboard &amp; analytics
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardPreview;
