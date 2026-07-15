"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";

// 1) Types
type OrbColor = "pink" | "green" | "pearl" | "orange" | "gold" | "copper";

interface OrbProps {
  color: OrbColor;
  width?: number;
  height?: number;
  className?: string;
  // If you have a hero orb above the fold, you can force early load
  priority?: boolean;
}

// 2) Heavy player is split into its own client-only chunk
const DotLottie = dynamic(
  () =>
    import("@lottiefiles/dotlottie-react").then(
      (m) =>
        m.DotLottieReact as unknown as React.ComponentType<{
          src: string;
          loop?: boolean;
          autoplay?: boolean;
          speed?: number;
          style?: React.CSSProperties;
        }>,
    ),
  { ssr: false },
);

// 3) Static map outside render to avoid reallocation
const ORB_SRC: Record<OrbColor, string> = {
  pink: "https://lottie.host/543493c1-96a0-40bc-b052-40869ea7932b/xgY0fP4RXr.lottie",
  green:
    "https://lottie.host/95858cc5-ddaf-45ff-98b5-984c3e28c89e/4lJRkL0W1n.lottie",
  pearl:
    "https://lottie.host/0c03f5fd-e348-4cd6-9f20-6bf57fc7dd80/b89501powc.lottie",
  orange:
    "https://lottie.host/b639843a-b338-400e-bbb3-022293593ec3/g7mJDTauqH.lottie",
  gold: "https://lottie.host/5c5c0afe-f428-400b-85db-15c05820be89/smH8qBJsPE.lottie",
  copper:
    "https://lottie.host/48de4269-4881-4fc5-aaed-84a0994a93d9/mdr1YRsV9K.lottie",
};

// 4) Reduce-motion hook
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setReduced(mq.matches);
    handler();
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);
  return reduced;
}

// 5) Lightweight static fallback (no JS animation)
function StaticOrb({
  color,
  width,
  height,
}: {
  color: OrbColor;
  width: number;
  height: number;
}) {
  const bg = useMemo(() => {
    switch (color) {
      case "pink":
        return "from-rose-300 via-fuchsia-300 to-purple-400";
      case "green":
        return "from-emerald-300 via-teal-300 to-cyan-300";
      case "pearl":
        return "from-slate-200 via-slate-100 to-white";
      case "orange":
        return "from-amber-300 via-orange-300 to-rose-300";
      case "gold":
        return "from-yellow-300 via-amber-300 to-orange-300";
      case "copper":
        return "from-orange-300 via-rose-300 to-amber-300";
    }
  }, [color]);

  return (
    <div
      aria-hidden
      className={`rounded-full bg-gradient-to-tr ${bg} opacity-80`}
      style={{
        width,
        height,
        boxShadow:
          "0 20px 80px rgba(0,0,0,.15), inset 0 0 60px rgba(255,255,255,.35)",
      }}
    />
  );
}

// 6) Optimized Orb
const Orb = React.memo(function Orb({
  color,
  width = 300,
  height = 300,
  className,
  priority = false,
}: OrbProps) {
  const { ref, inView } = useInView({
    rootMargin: "200px",
    triggerOnce: true,
  });
  const reduced = usePrefersReducedMotion();

  // Only render the heavy Lottie player when visible and motion allowed
  const shouldAnimate = (priority || inView) && !reduced;

  return (
    <div
      ref={ref}
      className={className}
      style={{ display: "flex", justifyContent: "center" }}
    >
      <div
        className="m-0 flex items-center justify-center"
        style={{ width, height }}
      >
        {shouldAnimate ? (
          <DotLottie
            src={ORB_SRC[color]}
            loop
            autoplay
            speed={1} // lower speed = fewer frames = less CPU
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <StaticOrb color={color} width={width} height={height} />
        )}
      </div>
    </div>
  );
});

export default Orb;
