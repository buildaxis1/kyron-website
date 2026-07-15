"use client";

import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import React, { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import styles from "../styles/FeaturedCarousel.module.css";

export default function InfiniteCarousel() {
  return (
    <section className="relative py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            As featured in
          </p>
          <h2 className="mt-2 text-balance text-2xl font-bold tracking-tight sm:text-3xl">
            Leading universities and media covering Kyron
          </h2>
          <div className="pointer-events-none mx-auto mt-2 h-px w-24 rounded bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>

        <div className="mt-10 md:mt-14">
          <Link
            href="/news"
            aria-label="Open Kyron news and coverage"
            onClick={() =>
              toast.info("Explore the full coverage", {
                description:
                  "See articles, podcasts, and updates from our team.",
                action: {
                  label: "Open",
                  onClick: () => (window.location.href = "/news"),
                },
              })
            }
            className="block"
          >
            <FeaturedCarousel speed={90} pauseOnHover>
              {/* Add or remove logos as needed */}
              <Image
                src="/logos/news/brown-university.png"
                alt="Brown University"
                height={56}
                width={160}
              />
              <Image
                src="/logos/news/warren-alpert.png"
                alt="Warren Alpert Medical School"
                height={56}
                width={170}
              />
              <Image
                src="/logos/news/bdh.png"
                alt="Brown Daily Herald"
                height={56}
                width={150}
              />
              <Image
                src="/logos/news/american-bazaar.jpg"
                alt="The American Bazaar"
                height={56}
                width={170}
              />
              <Image
                src="/logos/news/providence-journal.png"
                alt="The Providence Journal"
                height={56}
                width={190}
              />
              <Image
                src="/logos/news/usa-today.png"
                alt="USA Today"
                height={56}
                width={160}
              />
              <Image
                src="/logos/news/boston-globe.png"
                alt="The Boston Globe"
                height={56}
                width={170}
              />
              <Image
                src="/logos/news/new-england-council.png"
                alt="The New England Council"
                height={56}
                width={200}
              />
            </FeaturedCarousel>
          </Link>
        </div>
      </div>
    </section>
  );
}


type Props = {
  children: React.ReactNode[]; // logos (e.g., Next <Image/>)
  speed?: number; // px/sec, auto-calculates duration from content width
  pauseOnHover?: boolean;
  className?: string;
};

function FeaturedCarousel({
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
      aria-label="Press logos carousel"
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
