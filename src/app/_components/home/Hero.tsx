"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Bot,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  PlayCircle,
  Activity,
  LineChart,
  FileCheck2,
  Calendar,
  Filter,
  Download,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

type Props = {
  className?: string;
};

const Hero: React.FC<Props> = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = resolvedTheme === "dark";

  if (!mounted) {
    return (
      <section
        id="home"
        className="relative z-10 overflow-hidden pb-16 pt-[120px] md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
      >
        <div className="container">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="h-6 w-28 animate-pulse rounded bg-muted" />
              <div className="h-16 w-4/5 animate-pulse rounded bg-muted" />
              <div className="h-6 w-2/3 animate-pulse rounded bg-muted" />
              <div className="flex gap-4">
                <div className="h-11 w-36 animate-pulse rounded bg-muted" />
                <div className="h-11 w-36 animate-pulse rounded bg-muted" />
              </div>
            </div>
            <div className="h-[420px] w-full animate-pulse rounded-2xl bg-muted" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section
        id="home"
        className="relative z-10 overflow-hidden"
        style={{
          background: isDark
            ? "radial-gradient(1200px 600px at 10% -10%, rgba(56,189,248,0.08), transparent 50%), radial-gradient(900px 500px at 90% 10%, rgba(147,51,234,0.10), transparent 50%), linear-gradient(180deg, hsl(222.2 84% 4.9%) 0%, hsl(217.2 32.6% 17.5%) 120%)"
            : "radial-gradient(1200px 600px at 10% -10%, rgba(2,132,199,0.12), transparent 50%), radial-gradient(900px 500px at 90% 10%, rgba(79,70,229,0.12), transparent 50%), linear-gradient(180deg, #ffffff 0%, hsl(210 40% 96%) 120%)",
        }}
      >
        <GridOverlay />

        <div className="container relative">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 py-24 md:py-28 lg:grid-cols-[4fr_6fr] xl:gap-16">
            <div className="relative">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-md">
                <span className="inline-flex items-center gap-1 text-primary">
                  <Bot className="h-3.5 w-3.5" />
                  Voice AI for healthcare operations
                </span>
              </div>

              <h1 className="text-balance text-4xl font-bold leading-tight tracking-[-0.02em] text-foreground sm:text-5xl md:text-6xl">
                AI that answers your phones
                <br className="hidden sm:block" /> and works your claims.
              </h1>

              <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                Kyron’s healthcare‑grade AI answers patient calls, works payer
                phone lines, and turns denials into recovered revenue — so your
                team can spend more time with patients, not paperwork.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <a
                  href="#ai-receptionist"
                  className="rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-md transition-colors hover:border-primary/50 hover:text-primary"
                >
                  Medical AI Receptionist
                </a>
                <a
                  href="#rcm-ai"
                  className="rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-md transition-colors hover:border-primary/50 hover:text-primary"
                >
                  RCM Voice AI
                </a>
                <a
                  href="#denial-intelligence"
                  className="rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-md transition-colors hover:border-primary/50 hover:text-primary"
                >
                  Denial Intelligence
                </a>
              </div>

              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:items-start">
                <Link
                  href="https://kyronmedical.com/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-[0_20px_25px_-5px_rgba(0,0,0,0.35),0_10px_10px_-5px_rgba(0,0,0,0.1)] transition hover:scale-[1.02] hover:bg-blue-800 active:scale-[0.98] sm:px-6 sm:text-base"
                  onClick={() =>
                    toast.success("Thanks! We’ll be in touch shortly.", {
                      description:
                        "Your demo request has been received by the Kyron team.",
                      icon: <Sparkles className="text-yellow-400 h-4 w-4" />,
                    })
                  }
                >
                  Request a demo
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <button
                  onClick={() => {
                    window.open(
                      "https://www.youtube.com/watch?v=X5nsFzIxU0M",
                      "_blank",
                      "noopener,noreferrer"
                    );
                  }}
                className="inline-flex flex-row items-center justify-center gap-2 rounded-xl border border-border bg-background/70 px-4 py-3 text-sm font-semibold text-foreground backdrop-blur transition hover:scale-[1.02] hover:bg-accent active:scale-[0.98] sm:px-6 sm:text-base"
                >
                  Watch product tour
                  <PlayCircle className="h-4 w-4" />
                </button>   
              </div>

              <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <li className="inline-flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  HIPAA‑compliant
                </li>
                <li className="inline-flex items-center gap-2">
                  <Activity className="h-4 w-4 text-sky-500" />
                  EHR integrations
                </li>
                <li className="inline-flex items-center gap-2">
                  <FileCheck2 className="h-4 w-4 text-violet-500" />
                  Full audit trail
                </li>
              </ul>
            </div>

            <ShowcasePanel />
          </div>

          {/* <BrandRow /> */}
        </div>
      </section>
    </>
  );
};

/* ---------- Decorative grid overlay (soft, theme-aware) ---------- */
function GridOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      style={{
        maskImage:
          "radial-gradient(ellipse at center, black 60%, transparent 100%)",
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(120,120,120,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,120,120,0.12)_1px,transparent_1px)] bg-[size:32px_32px]" />
    </div>
  );
}

/* ---------- Animated product showcase (Denial Intelligence – accurate) ---------- */
function ShowcasePanel() {
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

  // Sample data close to your real dashboard
  const totals = {
    totalDenials: 6789,
    unresolvedImpact: "$123.45K",
    eligibleForAction: 345,
    weeklyChange: "+0%",
    topGroup: { label: "Documentation", value: 1234 },
    resolvedThisMonth: 123,
  };

  type GroupSlice = { label: string; amount: number; color: string };
  const groupBreakdown: GroupSlice[] = [
    { label: "Documentation", amount: 545089.97, color: "#38bdf8" }, // sky-400
    { label: "Network", amount: 454791.94, color: "#6366f1" }, // indigo-500
    { label: "Coding", amount: 321023.32, color: "#a855f7" }, // violet-500
    { label: "Timely filing", amount: 570569.61, color: "#f59e0b" }, // amber-500
    { label: "Eligibility", amount: 306245.26, color: "#10b981" }, // emerald-500
    { label: "Other", amount: 224101.89, color: "#94a3b8" }, // slate-400
    { label: "Benefit limit", amount: 41918.02, color: "#f43f5e" }, // rose-500
    { label: "Billing", amount: 32374.58, color: "#06b6d4" }, // cyan-500
    { label: "Authorization", amount: 6195.52, color: "#ec4899" }, // pink-500
  ];
  const grandTotal = groupBreakdown.reduce((s, g) => s + g.amount, 0);

  // Conic gradient for donut (accurate proportions)
  const donutBackground = useMemo(() => {
    let acc = 0;
    const segments = groupBreakdown
      .map((g) => {
        const pct = (g.amount / grandTotal) * 100;
        const start = acc;
        acc += pct;
        return `${g.color} ${start}% ${acc}%`;
      })
      .join(", ");
    return `conic-gradient(${segments})`;
  }, [groupBreakdown, grandTotal]);

  const donutLabel = "$2.50M";

  // Small sample rows (Denial Details)
  const rows = [
    {
      claimId: "CLM-25-LL-0365",
      code: "CO252",
      reason: "ADJ/NEEDREC",
      amount: "$844.12",
      date: "8/4/2025",
      status: "open",
      provider: "Booth, Timothy",
    },
    {
      claimId: "CLM-25-BR-035F",
      code: "MA15",
      reason: "PMI",
      amount: "$912.36",
      date: "8/7/2025",
      status: "open",
      provider: "Mejia, Donna",
    },
    {
      claimId: "CLM-25-PB-034D",
      code: "MA15",
      reason: "HOLD",
      amount: "$401.27",
      date: "7/22/2025",
      status: "open",
      provider: "Ramos, Evan",
    },
  ];

  // Simple denial-code bar heights (like your right-side chart)
  const codeBars = [88, 74, 62, 55, 49, 41, 30];

  return (
    <div className="relative">
      {/* Colored blobs behind the panel for depth */}
      <div className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-sky-400/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-8 top-8 h-40 w-40 rounded-full bg-fuchsia-400/30 blur-3xl" />

      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={resetTilt}
        style={{ perspective: 1200 }}
        className="relative"
      >
        <motion.div
          style={{ rotateX: rx, rotateY: ry }}
          className="relative isolate w-full max-w-2xl select-none rounded-2xl border border-border/60 bg-background/70 p-3 shadow-2xl backdrop-blur-lg"
        >
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-[radial-gradient(600px_200px_at_50%_0%,rgba(59,130,246,0.15),transparent),radial-gradient(400px_200px_at_90%_10%,rgba(147,51,234,0.15),transparent)]" />

          {/* Header strip (matches your "Denial Analysis Dashboard") */}
          <div className="flex items-center justify-between rounded-xl border border-border/50 bg-muted/40 px-3 py-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              <span className="font-medium">Denial Analysis Dashboard</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                Remit: Aug 01 – Dec 31, 2025
              </span>
              <span className="hidden items-center gap-1 md:inline-flex">
                <Calendar className="h-3.5 w-3.5" />
                Discharge: Aug 01 – Dec 31, 2025
              </span>
            </div>
          </div>

          {/* Filter row */}
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <FilterPill label="Denial Group" value="All" />
            <FilterPill label="Financial Class" value="All" />
            <button
              onClick={() =>
                toast.success("Filters applied.", {
                  description:
                    "We’ve refreshed the dashboard with your selections.",
                })
              }
              className="inline-flex h-9 items-center gap-2 rounded-lg bg-blue-700 px-3 text-sm font-semibold text-white hover:bg-blue-800"
            >
              <Filter className="h-4 w-4" />
              Apply Filters
            </button>

            <button
              onClick={() =>
                toast.info("CSV exported.", {
                  description: "A sample export has been generated.",
                  action: {
                    label: "Open",
                    onClick: () => window.open("#", "_blank"),
                  },
                })
              }
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-border/60 bg-muted/40 px-3 text-sm"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>
          </div>

          {/* KPI cards (accurate labels and order) */}
          <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-3">
            <KpiCard
              title="Total Denials"
              value={totals.totalDenials.toLocaleString()}
              tone="rose"
              chip="Critical"
            />
            <KpiCard
              title="Top Denial Group"
              value={`${totals.topGroup.label}: ${totals.topGroup.value}`}
              tone="sky"
              icon={<Activity className="h-4 w-4 text-sky-500" />}
            />
            <KpiCard
              title="Resolved This Month"
              value={`${totals.resolvedThisMonth}`}
              tone="emerald"
              subtle
            />
            <KpiCard
              title="Unresolved Impact"
              value={totals.unresolvedImpact}
              tone="violet"
            />
            <KpiCard
              title="Eligible for Action"
              value={String(totals.eligibleForAction)}
              tone="amber"
            />
            <KpiCard
              title="Weekly Change"
              value={totals.weeklyChange}
              tone="indigo"
              icon={
                totals.weeklyChange.startsWith("-") ? (
                  <TrendingDown className="h-4 w-4 text-rose-500" />
                ) : (
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                )
              }
            />
          </div>

          {/* Middle visuals: donut + denial code bars */}
          <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-2">
            {/* Denied $ by Denial Group */}
            <div className="rounded-xl border border-border/60 bg-background/80 p-3">
              <div className="mb-2 flex items-center justify-between">
                <div className="text-sm font-medium">
                  Denied $ by Denial Group
                </div>
                <span className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  Total: {donutLabel}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1">
                  <ul className="space-y-1.5 text-xs">
                    {groupBreakdown.slice(0, 6).map((g) => (
                      <li
                        key={g.label}
                        className="flex items-center justify-between gap-2"
                      >
                        <span className="inline-flex items-center gap-2">
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ backgroundColor: g.color }}
                          />
                          {g.label}
                        </span>
                        <span className="tabular-nums text-muted-foreground">
                          ${Math.round(g.amount).toLocaleString()}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-span-2 flex items-center justify-center">
                  <div className="relative h-28 w-28">
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{ background: donutBackground }}
                    />
                    <div className="absolute inset-3 rounded-full bg-background" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-sm font-semibold">
                          {donutLabel}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Total
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Denied Encounter # by Denial Code */}
            <div className="rounded-xl border border-border/60 bg-background/80 p-3">
              <div className="mb-2 flex items-center justify-between">
                <div className="text-sm font-medium">
                  Denied Encounter # by Denial Code
                </div>
                <span className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  Last 90 days
                </span>
              </div>

              <div className="mt-2 h-28 rounded-lg bg-gradient-to-tr from-sky-500/10 via-fuchsia-500/10 to-emerald-500/10">
                <div className="mx-2 grid h-full grid-cols-7 items-end gap-1">
                  {codeBars.map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{
                        delay: 0.1 + i * 0.05,
                        type: "spring",
                        stiffness: 120,
                        damping: 14,
                      }}
                      className="origin-bottom rounded bg-indigo-400/60 w-full"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-2 text-right text-[11px] text-muted-foreground">
                Codes sample: CO252, MA15, CO4, M27, CO22, MA95, MA15
              </div>
            </div>
          </div>

          {/* Denial details table (compact, accurate columns) */}
          {/* <div className="mt-3 rounded-xl border border-border/60 bg-background/80">
            <div className="grid grid-cols-7 items-center gap-2 border-b border-border/60 px-3 py-1.5 text-xs font-medium text-muted-foreground">
              <span>Claim ID</span>
              <span>Denial Code</span>
              <span>Denial Reason</span>
              <span className="text-right">Amount</span>
              <span>Date</span>
              <span>Status</span>
              <span>Provider</span>
            </div>

            {rows.map((r, i) => (
              <motion.div
                key={r.claimId}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.05 + i * 0.05,
                  type: "spring",
                  stiffness: 140,
                  damping: 18,
                }}
                className="grid grid-cols-7 items-center gap-2 px-3 py-1.5 text-sm"
              >
                <span className="font-medium">{r.claimId}</span>
                <span className="rounded bg-muted px-1.5 py-0.5 text-xs">
                  {r.code}
                </span>
                <span className="text-xs text-muted-foreground line-clamp-1">
                  {r.reason}
                </span>
                <span className="text-right tabular-nums">{r.amount}</span>
                <span className="text-xs">{r.date}</span>
                <span className="inline-flex w-fit items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  {r.status}
                </span>
                <span className="text-xs text-muted-foreground">
                  {r.provider}
                </span>
              </motion.div>
            ))}
          </div> */}

          {/* Bottom ribbon (Retool-style hint) */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="absolute -left-8 -top-6 hidden select-none md:block"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/90 px-3 py-1 text-xs font-medium shadow-md backdrop-blur">
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary">
                New
              </span>
              Denial Intelligence with AI suggestions
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ---------- Small helpers ---------- */

function FilterPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="inline-flex h-9 items-center gap-2 rounded-lg border border-border/60 bg-background/70 px-3 text-xs text-foreground">
      <span className="text-muted-foreground">{label}:</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function KpiCard({
  title,
  value,
  tone,
  icon,
  chip,
  subtle,
}: {
  title: string;
  value: string;
  tone: "rose" | "sky" | "emerald" | "violet" | "amber" | "indigo";
  icon?: React.ReactNode;
  chip?: string;
  subtle?: boolean;
}) {
  const toneMap: Record<string, { bg: string; text: string; ring: string }> = {
    rose: {
      bg: "bg-rose-500/10",
      text: "text-rose-600 dark:text-rose-300",
      ring: "ring-rose-500/20",
    },
    sky: {
      bg: "bg-sky-500/10",
      text: "text-sky-600 dark:text-sky-300",
      ring: "ring-sky-500/20",
    },
    emerald: {
      bg: "bg-emerald-500/10",
      text: "text-emerald-600 dark:text-emerald-300",
      ring: "ring-emerald-500/20",
    },
    violet: {
      bg: "bg-violet-500/10",
      text: "text-violet-600 dark:text-violet-300",
      ring: "ring-violet-500/20",
    },
    amber: {
      bg: "bg-amber-500/10",
      text: "text-amber-600 dark:text-amber-300",
      ring: "ring-amber-500/20",
    },
    indigo: {
      bg: "bg-indigo-500/10",
      text: "text-indigo-600 dark:text-indigo-300",
      ring: "ring-indigo-500/20",
    },
  };

  const t = toneMap[tone];

  return (
    <div className="rounded-xl border border-border/60 bg-background/80 p-3">
      <div className="mb-1 flex items-center justify-between">
        <div className="text-xs text-muted-foreground">{title}</div>
        {chip ? (
          <span
            className={`rounded px-2 py-0.5 text-[10px] font-semibold ${t.bg} ${t.text}`}
          >
            {chip}
          </span>
        ) : icon ? (
          <span className="opacity-80">{icon}</span>
        ) : null}
      </div>
      <div
        className={`inline-flex items-center gap-2 rounded-lg px-2 py-1 text-base font-semibold ${subtle ? "bg-muted/40 text-foreground" : `${t.bg} ${t.text} ring-1 ${t.ring}`}`}
      >
        {value}
      </div>
    </div>
  );
}

/* ---------- Small metric pill ---------- */
function Metric({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: "emerald" | "violet" | "sky";
}) {
  const tone = useMemo(() => {
    switch (color) {
      case "emerald":
        return "text-emerald-600 dark:text-emerald-300 bg-emerald-500/10";
      case "violet":
        return "text-violet-600 dark:text-violet-300 bg-violet-500/10";
      default:
        return "text-sky-600 dark:text-sky-300 bg-sky-500/10";
    }
  }, [color]);

  return (
    <div className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/40 px-3 py-2">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className={`rounded px-2 py-0.5 text-sm font-semibold ${tone}`}>
        {value}
      </span>
    </div>
  );
}

/* ---------- Brand row (replace with your logos) ---------- */
function BrandRow() {
  return (
    <div className="pb-16 pt-6 md:pb-24">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-center text-xs font-medium tracking-wide text-muted-foreground">
          Trusted by forward‑thinking healthcare teams
        </p>
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-80">
          {[
            "Northstar Health",
            "Crescent Medical",
            "Axis RCM",
            "Bluebird Care",
            "Vantage Clinics",
            "Evergreen Group",
          ].map((name) => (
            <span
              key={name}
              className="text-sm text-muted-foreground/90"
              aria-hidden
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hero;
