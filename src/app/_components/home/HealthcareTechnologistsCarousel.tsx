"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import styles from "../../news/styles/FeaturedCarousel.module.css";
import { useTheme } from "next-themes";

export default function HealthcareTechnologistsCarousel() {
  return (
    <section className="relative overflow-hidden py-12 md:py-16">
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

      <div className="container relative">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Brought to you by
          </p>
          <h2 className="mt-2 text-balance text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
            Leading Healthcare Technologists & Physicians From
          </h2>
          <div className="pointer-events-none mx-auto mt-2 h-px w-20 rounded bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
        </div>

        <div className="mt-10 md:mt-14">
          <TechnologistsCarousel speed={90} pauseOnHover>
            {/* Healthcare organization logos */}
            <BrownLogo />
            <HarvardLogo />
            <Image
              src="/logos/healthcare technologists/Stanford.svg"
              alt="Stanford Medicine"
              height={56}
              width={170}
            />
            <ColumbiaLogo />
            <MountSinaiLogo />
            <Image
              src="/logos/healthcare technologists/KaiserPermanente.svg"
              alt="Kaiser Permanente"
              height={56}
              width={200}
            />
          </TechnologistsCarousel>
        </div>
      </div>
    </section>
  );
}

// Harvard logo component that switches based on theme
function HarvardLogo() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <Image
        src="/logos/healthcare technologists/Harvard.svg"
        alt="Harvard Medical School"
        height={40}
        width={140}
      />
    );
  }

  const currentTheme = resolvedTheme ?? theme;
  const isDark = currentTheme === 'dark';

  return (
    <Image
      src={isDark 
        ? "/logos/healthcare technologists/harvard-dark.png"
        : "/logos/healthcare technologists/Harvard.svg"
      }
      alt="Harvard Medical School"
      height={40}
      width={140}
    />
  );
}

// Brown logo component that switches based on theme
function BrownLogo() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Image
        src="/logos/healthcare technologists/Brown.png"
        alt="Brown University"
        height={120}
        width={120}
        className="object-contain"
      />
    );
  }

  const currentTheme = resolvedTheme ?? theme;
  const isDark = currentTheme === 'dark';

  return (
    <Image
      src={isDark 
        ? "/logos/healthcare technologists/Brown-dark.png"
        : "/logos/healthcare technologists/Brown.png"
      }
      alt="Brown University"
      height={120}
      width={120}
      className="object-contain"
    />
  );
}

// Columbia logo component that switches based on theme
function ColumbiaLogo() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Image
        src="/logos/healthcare technologists/Columbia.svg"
        alt="Columbia University"
        height={56}
        width={160}
      />
    );
  }

  const currentTheme = resolvedTheme ?? theme;
  const isDark = currentTheme === 'dark';

  return (
    <Image
      src={isDark 
        ? "/logos/healthcare technologists/Columbia-dark.png"
        : "/logos/healthcare technologists/Columbia.svg"
      }
      alt="Columbia University"
      height={56}
      width={160}
    />
  );
}

// Mount Sinai logo component that switches based on theme
function MountSinaiLogo() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Image
        src="/logos/healthcare technologists/MountSinai.svg"
        alt="Mount Sinai"
        height={70}
        width={56}
        className="scale-125"
      />
    );
  }

  const currentTheme = resolvedTheme ?? theme;
  const isDark = currentTheme === 'dark';

  return (
    <Image
      src={isDark 
        ? "/logos/healthcare technologists/MountSinai-dark.png"
        : "/logos/healthcare technologists/MountSinai.svg"
      }
      alt="Mount Sinai"
      height={70}
      width={56}
      className="scale-125"
    />
  );
}

type Props = {
  children: React.ReactNode[]; // logos (e.g., Next <Image/>)
  speed?: number; // px/sec, auto-calculates duration from content width
  pauseOnHover?: boolean;
  className?: string;
};

function TechnologistsCarousel({
  children,
  speed = 80,
  pauseOnHover = true,
  className,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sequenceRef = useRef<HTMLUListElement | null>(null);
  const [duration, setDuration] = useState(30); // seconds

  // Calculate duration based on content width and desired px/sec
  useEffect(() => {
    const el = sequenceRef.current;
    if (!el) return;

    const totalWidth = el.getBoundingClientRect().width;
    const nextDuration = Math.max(12, Math.round(totalWidth / speed));
    setDuration(nextDuration);
  }, [children, speed]);

  // Duplicate the sequence to create a seamless loop
  const logos = useMemo(() => React.Children.toArray(children), [children]);

  return (
    <div
      ref={containerRef}
      className={clsx(
        styles.viewport,
        "group relative overflow-hidden rounded-2xl border border-border/60 bg-background/60 p-3 shadow-[0_20px_25px_-10px_rgba(0,0,0,0.25)] backdrop-blur",
        className,
      )}
      style={
        {
          "--duration": `${duration}s`,
          "--gap": "56px",
        } as React.CSSProperties
      }
      aria-label="Healthcare technologists carousel"
      role="region"
    >
      {/* Glow accents */}
      <div className="pointer-events-none absolute -top-10 left-10 h-24 w-24 rounded-full bg-sky-400/20 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-6 right-6 h-20 w-20 rounded-full bg-fuchsia-400/20 blur-2xl" />

      {/* Fade masks on edges */}
      <div className={clsx(styles.fadeLeft, "from-background")} />
      <div className={clsx(styles.fadeRight, "from-background")} />

      {/* Scroller track (two sequences for a perfect loop) */}
      <div
        className={clsx(
          styles.track,
          pauseOnHover && styles.pauseOnHover,
          "will-change-transform",
        )}
      >
        <ul ref={sequenceRef} className={clsx(styles.sequence, "pr-14")}>
          {logos.map((child, i) => (
            <li key={`logo-a-${i}`} className={styles.item}>
              <LogoCard>{child}</LogoCard>
            </li>
          ))}
        </ul>

        <ul aria-hidden className={clsx(styles.sequence, "pl-14")}>
          {logos.map((child, i) => (
            <li key={`logo-b-${i}`} className={styles.item}>
              <LogoCard>{child}</LogoCard>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function LogoCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={clsx(
        "flex h-32 min-w-[170px] items-center justify-center rounded-xl",
        "border border-border/60 bg-background/70 px-6 backdrop-blur",
        "transition duration-300 hover:scale-[1.02] hover:shadow-lg",
      )}
    >
      <div
        className={clsx(
          "opacity-80 grayscale-[20%] transition",
          "hover:opacity-100 hover:grayscale-0",
        )}
      >
        {children}
      </div>
    </div>
  );
}
