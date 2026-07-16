"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Bot,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  PlayCircle,
  Activity,
  FileCheck2,
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
            ? "radial-gradient(1200px 600px at 10% -10%, rgba(56,189,248,0.08), transparent 50%), radial-gradient(900px 500px at 90% 10%, rgba(147,51,234,0.10), transparent 50%), linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--muted)) 120%)"
            : "radial-gradient(1200px 600px at 10% -10%, rgba(2,132,199,0.12), transparent 50%), radial-gradient(900px 500px at 90% 10%, rgba(79,70,229,0.12), transparent 50%), linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--muted)) 120%)",
        }}
      >
        <GridOverlay />

        {/* Fade the section wash back into the page background so the
            handoff to the next section is seamless (esp. in light mode) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background"
        />

        <div className="container relative">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 py-24 md:py-28 lg:grid-cols-[4fr_6fr] xl:gap-16">
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
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-[0_20px_25px_-5px_rgba(0,0,0,0.35),0_10px_10px_-5px_rgba(0,0,0,0.1)] transition hover:scale-[1.02] hover:bg-blue-800 active:scale-[0.98] sm:px-6 sm:text-base"
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
                  className="inline-flex flex-row items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-border bg-background/70 px-4 py-3 text-sm font-semibold text-foreground backdrop-blur transition hover:scale-[1.02] hover:bg-accent active:scale-[0.98] sm:px-6 sm:text-base"
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

            <HeroVideoPanel />
          </div>
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

/* ---------- Moving product video showcase (Assort-style hero) ---------- */
function HeroVideoPanel() {
  const ref = useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rx = useSpring(useTransform(my, [-40, 40], [6, -6]), {
    stiffness: 140,
    damping: 12,
    mass: 0.6,
  });
  const ry = useSpring(useTransform(mx, [-40, 40], [-6, 6]), {
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
          className="relative isolate w-full select-none rounded-2xl border border-border/60 bg-background/70 p-2 shadow-2xl backdrop-blur-lg lg:max-w-none"
        >
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-[radial-gradient(600px_200px_at_50%_0%,rgba(59,130,246,0.15),transparent),radial-gradient(400px_200px_at_90%_10%,rgba(147,51,234,0.15),transparent)]" />

          <video
            src="/videos/gui-demo.mp4"
            poster="/images/video/video.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Kyron Medical product demo video"
            className="aspect-video w-full rounded-xl object-cover"
          />

          {/* Floating ribbon */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="absolute -left-6 -top-5 hidden select-none md:block"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/90 px-3 py-1 text-xs font-medium shadow-md backdrop-blur">
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary">
                Live
              </span>
              Kyron platform in action
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Hero;
