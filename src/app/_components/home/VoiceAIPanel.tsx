"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  PhoneCall,
  Sparkles,
  ShieldCheck,
  Mic,
  Volume2,
  PhoneOff,
  FileText,
  ArrowRight,
} from "lucide-react";
import { useEffect, useState } from "react";

// extra icons for the full iPhone UI
import {
  SignalHigh,
  Wifi,
  BatteryFull,
  Video,
  UserPlus,
  Grid3X3,
  UserRound,
  Building2,
} from "lucide-react";

const DEMO_URL = "https://kyronmedical.com/contact";

export default function VoiceAIPanel() {
  const [calling, setCalling] = useState(true);

  const handleDemo = () => {
    toast.success("Launching the Voice AI demo…", {
      description: "This opens our guided experience in a new tab.",
    });
    window.open(DEMO_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="voice-ai" className="relative overflow-hidden py-20 md:py-28">
      {/* ambient accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-10 top-0 h-48 w-48 rounded-full bg-sky-400/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 top-8 h-44 w-44 rounded-full bg-fuchsia-400/20 blur-3xl"
      />

      <div className="container">
        <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-2">
          {/* Left copy */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              Voice AI
            </div>

            <h2 className="mt-3 text-balance text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl md:text-5xl">
              Voice AI to call health insurance and recover revenue
            </h2>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Kyron’s phone agents make Eligibility & Benefits calls, check
              claim status, and follow up on denials—then post structured notes
              and an audit trail back to your dashboard automatically.
            </p>

            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              <li className="inline-flex items-start gap-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 text-emerald-500" />
                Eligibility & Benefits verification (payer menus + reps)
              </li>
              <li className="inline-flex items-start gap-2">
                <FileText className="mt-0.5 h-4 w-4 text-sky-500" />
                Claim status + denial follow‑ups with structured notes
              </li>
              <li className="inline-flex items-start gap-2">
                <PhoneCall className="mt-0.5 h-4 w-4 text-violet-500" />
                Automatic logging, timestamps, and audio references
              </li>
            </ul>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:items-start">
              <button
                onClick={handleDemo}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-[0_20px_25px_-10px_rgba(0,0,0,0.35)] transition hover:scale-[1.02] hover:bg-blue-800 active:scale-[0.98]"
              >
                Try Voice AI Demo
                <ArrowRight className="h-4 w-4" />
              </button>

              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background/70 px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-accent"
              >
                See how it works
              </Link>
            </div>
          </div>

          {/* Right: product preview with overlaid iPhone */}
          <div className="relative">
            <Monitor>
              <VoiceAIDashboard calling={calling} setCalling={setCalling} />
            </Monitor>

            {/* Floating iPhone - positioned outside on mobile, overlaid on desktop */}
            <motion.div
              initial={{ rotate: -6, y: -12, x: 16, opacity: 0 }}
              whileInView={{ rotate: -6, y: -12, x: 16, opacity: 1 }}
              viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
              transition={{ type: "spring", stiffness: 120, damping: 12 }}
              className="relative mt-6 flex justify-center scale-[0.65] sm:absolute sm:right-[10px] sm:top-[-10px] sm:mt-0 sm:scale-75 md:right-[-10px] md:top-[-28px] md:scale-100"
            >
              <IPhoneCallScreen />
            </motion.div>

            {/* Subtle connecting arc for desktop/tablet */}
            <div className="hidden sm:block">
              <svg
                className="absolute right-[60px] top-[20px] md:right-[40px] md:top-[10px] w-16 h-16 md:w-20 md:h-20 pointer-events-none"
                viewBox="0 0 64 64"
                fill="none"
              >
                <motion.path
                  d="M8 32 Q32 8 56 32"
                  stroke="url(#connectionGradient)"
                  strokeWidth="1.5"
                  fill="none"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
                <defs>
                  <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgb(59 130 246)" stopOpacity="0.6" />
                    <stop offset="50%" stopColor="rgb(16 185 129)" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="rgb(139 92 246)" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* soft grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          color: "hsl(var(--foreground))",
        }}
      />
    </section>
  );
}

/* ---------------- Monitor + Dashboard ---------------- */

function Monitor({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-[640px]">
      {/* screen */}
      <div className="rounded-3xl border border-border/60 bg-background/70 p-4 shadow-2xl backdrop-blur">
        {children}
      </div>
      {/* stand */}
      <div className="mx-auto mt-3 h-2 w-32 rounded-full bg-muted" />
      <div className="mx-auto h-4 w-20 rounded-b-2xl bg-muted" />
    </div>
  );
}

function VoiceAIDashboard({
  calling,
  setCalling,
}: {
  calling: boolean;
  setCalling: (v: boolean) => void;
}) {
  return (
    // Right padding on sm+ keeps content clear of the overlaid iPhone mockup
    <div className="space-y-3 sm:pr-20 md:pr-32">
      {/* top tabs */}
      <div className="flex flex-wrap gap-2">
        {["Details", "Appeals", "Eligibility & Benefits", "Claim Status"].map(
          (t, i) => (
            <div
              key={t}
              className={`rounded-lg border px-3 py-1 text-xs ${
                i === 2
                  ? "border-primary/40 bg-primary/10 text-primary"
                  : "border-border/60 bg-muted/40 text-muted-foreground"
              }`}
            >
              {t}
            </div>
          ),
        )}
      </div>

      {/* header */}
      <div className="rounded-xl border border-border/60 bg-background/80 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold">Voice AI Agent</h4>
            <p className="text-xs text-muted-foreground">
              Place an eligibility & benefits verification call to the payer.
            </p>
          </div>
          <div className="flex gap-2">
            <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600">
              Premium
            </span>
            <span className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
              Standard
            </span>
          </div>
        </div>

        {/* inputs */}
        <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-3">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center rounded-lg border border-border/60 bg-background/70">
              <span className="px-2 text-xs text-muted-foreground font-medium">+1</span>
              <input
                className="h-9 w-full rounded-r-lg bg-transparent px-2 text-sm outline-none font-mono tracking-wider"
                defaultValue="(732) 770-7121"
              />
            </div>
          </div>
          <div className="col-span-1 md:col-span-2">
            <input
              className="h-9 w-full rounded-lg border border-border/60 bg-background/70 px-3 text-sm outline-none placeholder:text-muted-foreground/60"
              placeholder="Additional notes (e.g., claim ID, billing note)"
            />
          </div>
        </div>
      </div>

      {/* call state */}
      <div className={`rounded-xl border border-border/60 bg-background/80 p-4 ${
        calling ? 'ring-1 ring-emerald-500/20 bg-emerald-500/5' : ''
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="relative inline-flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <div>
              <p className="text-sm font-medium">
                {calling ? "Verifying eligibility…" : "Ready"}
              </p>
              <p className="text-xs text-muted-foreground">Elapsed: 0m 46s</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {calling ? (
              <button
                onClick={() => {
                  setCalling(false);
                  toast.info("Call ended", {
                    description:
                      "Notes and timestamps saved to the audit trail.",
                  });
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-rose-600 px-3 py-2 text-xs font-semibold text-white hover:bg-rose-700"
              >
                <PhoneOff className="h-3.5 w-3.5" />
                Cancel call
              </button>
            ) : (
              <button
                onClick={() => {
                  setCalling(true);
                  toast.success("Calling payer…", {
                    description:
                      "Navigating IVR menus and connecting with a representative.",
                  });
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-800"
              >
                <PhoneCall className="h-3.5 w-3.5" />
                Start call
              </button>
            )}
          </div>
        </div>

        {/* simple “transcript” line */}
        <div className="mt-3 rounded-lg border border-border/60 bg-muted/30 p-3 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">Agent</span>: Verified
          benefits, plan: PPO, deductible: $2,500, out‑of‑pocket: $6,000, copay:
          $30 office / $60 specialty. Notes saved to encounter.
        </div>
      </div>
    </div>
  );
}

/* ---------------- iPhone call screen ---------------- */

function IPhoneCallScreen() {
  // Kyron design language — device-style iPhone call UI with a live caller
  // block, waveform, and full call-controls grid. Pure CSS/React.
  const [seconds, setSeconds] = useState(46);
  useEffect(() => {
    const tick = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(tick);
  }, []);
  const ss = String(seconds % 60).padStart(2, "0");
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");

  return (
    <div className="animate-float relative h-[340px] w-[186px] rounded-[36px] border-[3px] border-neutral-800 bg-neutral-950 p-1.5 text-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] ring-1 ring-white/5 sm:h-[420px] sm:w-[228px] sm:rounded-[44px] md:h-[520px] md:w-[276px] md:rounded-[52px]">
      {/* side buttons */}
      <div className="absolute left-[-4px] top-24 h-8 w-1 rounded-l bg-neutral-700" aria-hidden />
      <div className="absolute left-[-4px] top-36 h-12 w-1 rounded-l bg-neutral-700" aria-hidden />
      <div className="absolute left-[-4px] top-52 h-12 w-1 rounded-l bg-neutral-700" aria-hidden />
      <div className="absolute right-[-4px] top-32 h-16 w-1 rounded-r bg-neutral-700" aria-hidden />

      {/* screen */}
      <div className="relative flex h-full flex-col overflow-hidden rounded-[30px] bg-gradient-to-b from-neutral-800 via-neutral-900 to-black px-4 pb-5 pt-3 sm:rounded-[38px] md:rounded-[46px]">
        {/* Dynamic Island */}
        <div
          className="absolute left-1/2 top-2.5 h-4 w-16 -translate-x-1/2 rounded-full bg-black sm:h-5 sm:w-20"
          aria-hidden
        />

        {/* Status bar */}
        <div className="flex items-center justify-between pt-1 text-[10px] font-medium text-neutral-300 sm:text-xs">
          <span>9:41</span>
          <div className="flex items-center gap-1">
            <SignalHigh className="h-3 w-3" />
            <Wifi className="h-3 w-3" />
            <BatteryFull className="h-3.5 w-3.5" />
          </div>
        </div>

        {/* Caller */}
        <div className="mt-6 flex flex-col items-center text-center sm:mt-9">
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[9px] font-medium text-emerald-300 sm:text-[10px]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Verifying eligibility
          </span>
          <div className="relative">
            <span className="absolute inset-0 animate-ping rounded-full bg-[#577DE8]/30" />
            <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#577DE8] to-blue-600 shadow-lg sm:h-16 sm:w-16">
              <Building2 className="h-6 w-6 text-white sm:h-7 sm:w-7" />
            </span>
          </div>
          <div className="mt-3 text-sm font-semibold sm:text-base">
            Anthem Blue Cross
          </div>
          <div className="mt-0.5 font-mono text-xs tracking-wider text-neutral-400 sm:text-sm">
            +1 (934) 758-2621
          </div>
          <div className="mt-1 font-mono text-[11px] text-emerald-400 sm:text-xs">
            {mm}:{ss}
          </div>
        </div>

        {/* Waveform */}
        <div
          className="mt-5 flex h-8 items-center justify-center gap-1"
          aria-hidden
        >
          {[0.4, 0.7, 1, 0.5, 0.85, 0.35, 0.9, 0.55, 0.75, 0.45].map((h, i) => (
            <span
              key={i}
              className="wave-bar w-1 rounded-full bg-[#577DE8]/70"
              style={{ height: `${h * 100}%`, animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="mt-auto space-y-3 sm:space-y-4">
          <div className="grid grid-cols-3 gap-y-3 text-[9px] text-neutral-300 sm:gap-y-4 sm:text-[10px]">
            {[
              { icon: <Mic className="h-4 w-4 sm:h-5 sm:w-5" />, label: "Mute" },
              { icon: <Grid3X3 className="h-4 w-4 sm:h-5 sm:w-5" />, label: "Keypad" },
              { icon: <Volume2 className="h-4 w-4 sm:h-5 sm:w-5" />, label: "Speaker" },
              { icon: <UserPlus className="h-4 w-4 sm:h-5 sm:w-5" />, label: "Add Call" },
              { icon: <Video className="h-4 w-4 sm:h-5 sm:w-5" />, label: "Video" },
              { icon: <UserRound className="h-4 w-4 sm:h-5 sm:w-5" />, label: "Contacts" },
            ].map((c) => (
              <div key={c.label} className="flex flex-col items-center gap-1.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur transition hover:bg-white/20 sm:h-12 sm:w-12">
                  {c.icon}
                </span>
                <span>{c.label}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <button
              aria-label="End call"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-red-500 shadow-lg shadow-red-500/40 transition hover:bg-red-600 sm:h-14 sm:w-14"
            >
              <PhoneOff className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
