"use client";

import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  AudioLines,
  FileCheck2,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

type Props = {
  className?: string;
};

/**
 * Assort-style cinematic hero:
 * full-bleed real-person video on the right, copy on a dark left wash,
 * glassmorphic AI agent bubble over the footage.
 */
const Hero: React.FC<Props> = () => {
  return (
    <section
      id="home"
      className="relative z-10 min-h-[calc(100svh-6rem)] overflow-hidden bg-[#0b0f17] text-white"
    >
      {/* Full-bleed person video */}
      <div className="absolute inset-0">
        <video
          src="/videos/hero-person.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-[68%_center] sm:object-[72%_center]"
        />
        {/* Left readability wash + soft vignette (Assort-style) */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-[#0b0f17] via-[#0b0f17]/88 to-transparent max-lg:via-[#0b0f17]/70"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[#0b0f17]/80 via-transparent to-[#0b0f17]/35"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_45%,transparent_0%,rgba(0,0,0,0.35)_100%)]"
        />
      </div>

      <div className="container relative flex min-h-[calc(100svh-6rem)] flex-col justify-center py-20 md:py-28">
        <div className="grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-8">
          {/* Copy — left */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="relative z-10 max-w-xl min-w-0"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/85 backdrop-blur-md">
              <span className="inline-flex items-center gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-3 w-3 fill-amber-400 text-amber-400"
                  />
                ))}
              </span>
              <span className="text-white/70">HIPAA‑compliant · Voice AI</span>
            </div>

            <h1 className="text-balance text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl md:text-6xl lg:text-[3.5rem]">
              Every call, precisely handled
            </h1>

            <p className="mt-5 max-w-lg text-pretty text-base leading-relaxed text-white/75 sm:text-lg">
              Kyron&apos;s AI voice agents answer patient calls, work payer phone
              lines, and recover denied claims — so your team spends more time
              with patients, not on hold.
            </p>

            <div className="mt-8">
              <Link
                href="https://kyronmedical.com/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-neutral-900 shadow-[0_20px_40px_-16px_rgba(0,0,0,0.55)] transition hover:bg-white/90 active:scale-[0.98] sm:px-6 sm:text-base"
                onClick={() =>
                  toast.success("Thanks! We’ll be in touch shortly.", {
                    description:
                      "Your demo request has been received by the Kyron team.",
                    icon: <Sparkles className="h-4 w-4 text-yellow-400" />,
                  })
                }
              >
                See it in action
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/65">
              <li className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                HIPAA‑compliant
              </li>
              <li className="inline-flex items-center gap-2">
                <Activity className="h-4 w-4 text-sky-400" />
                EHR integrations
              </li>
              <li className="inline-flex items-center gap-2">
                <FileCheck2 className="h-4 w-4 text-violet-300" />
                Full audit trail
              </li>
            </ul>
          </motion.div>

          {/* Spacer column on desktop so the person stays visible on the right */}
          <div className="relative hidden min-h-[420px] lg:block" aria-hidden>
            <AgentBubble className="absolute bottom-8 right-0 max-w-[340px] xl:bottom-12 xl:right-4" />
          </div>
        </div>

        {/* Mobile/tablet agent bubble over the video */}
        <div className="relative z-10 mt-10 lg:hidden">
          <AgentBubble className="mx-auto max-w-md" />
        </div>
      </div>
    </section>
  );
};

function AgentBubble({ className = "" }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.35, duration: 0.5, ease: "easeOut" }}
      className={className}
    >
      <div className="rounded-2xl border border-white/15 bg-black/55 p-4 shadow-[0_24px_60px_-16px_rgba(0,0,0,0.7)] backdrop-blur-xl">
        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
            <AudioLines className="h-4 w-4 text-sky-300" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-white">Kyron Agent</p>
            <div className="mt-1 flex h-3 items-end gap-[3px]" aria-hidden>
              {[0, 1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className="w-[3px] animate-pulse rounded-full bg-sky-400/80"
                  style={{
                    height: `${6 + (i % 3) * 4}px`,
                    animationDelay: `${i * 120}ms`,
                    animationDuration: "900ms",
                  }}
                />
              ))}
            </div>
          </div>
          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-emerald-300 ring-1 ring-emerald-400/30">
            Live
          </span>
        </div>
        <p className="text-sm leading-relaxed text-white/90">
          &ldquo;I just received your referral. I&apos;ve verified Aetna
          coverage, confirmed in-network status, and booked Dr. Ramirez for
          Monday at 10&nbsp;a.m.&rdquo;
        </p>
      </div>
    </motion.div>
  );
}

export default Hero;
