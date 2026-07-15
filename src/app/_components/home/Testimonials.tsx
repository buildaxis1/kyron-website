"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useMemo, useRef } from "react";
import { toast } from "sonner";
import { Quote, Copy } from "lucide-react";

type Testimonial = {
  id: number;
  quote: string;
  name: string;
  title: string;
  avatar?: string; // optional; we render initials if missing
};

const DATA: Testimonial[] = [
  {
    id: 1,
    quote:
      "Jay and the Kyron team are the best in the industry. Medical billing has been characterized by tedious, ongoing work for decades, so it’s refreshing to finally see a solution!",
    name: "Dr. Jacob Joseph",
    title: "Cardiologist — 20+ Years of Medical Practice",
    avatar: "/images/advisors/jacob-joseph.jpg",
  },
  {
    id: 2,
    quote:
      "Kyron Medical is a powerful ally for any healthcare organization that wants to eliminate phone calls to health insurance companies. The AI‑native design of the platform means it continuously learns, so you can redeploy more FTEs the more you use it!",
    name: "Dr. Yuhao Huang",
    title: "Neurosurgeon — Stanford University School of Medicine Alum",
    avatar: "/images/advisors/yuhao-huang.jpg",
  },
  {
    id: 3,
    quote:
      "I served as Physician Chief of a large private practice for over a decade before I started working at a large health system. Denials and eligibility checks were constant headaches that plagued us and were two of the largest causes of lost time and revenue… If only we had had access to Kyron Medical’s AI solutions back then!",
    name: "Dr. Nicholas Grumbach",
    title: "Internist & Pediatrician — 20+ Years of Medical Practice",
    avatar: "/images/advisors/nicholas-grumbach.jpg",
  },
  {
    id: 4,
    quote:
      "Phone calls to health insurance and letters of appeal take up tens of hours every week, and are one of the biggest problems in healthcare workflows today. I’m thrilled that Kyron Medical is focused on this part of medical billing.",
    name: "Dr. Ammar Shaikhouni",
    title:
      "Neurosurgeon — Warren Alpert Medical School of Brown University Alum",
    avatar: "/images/advisors/ammar-shaikhouni.jpg", // optional; will fallback if not present
  },
  {
    id: 5,
    quote:
      "Kyron Medical is addressing major pain points for all of us in healthcare by improving revenue from denied claims while decreasing the need for physicians and medical billers to spend their valuable time engaged with insurance companies on the phone.",
    name: "Dr. Phyllidia Ku‑Ruth",
    title:
      "President, InterMed — Primary Care Provider Group Serving 100,000+ Patients",
    avatar: "/images/advisors/phyllidia-ku-ruth.jpg",
  },
  {
    id: 6,
    quote:
      "Kyron Medical’s team is one of the fastest in the medical AI industry to deliver enterprise‑grade products. Waiting on hold with health insurance is a major issue for healthcare providers, and their solution fits into workflows seamlessly!",
    name: "Dr. Corey Keller",
    title:
      "Psychiatrist — Stanford University School of Medicine, 10+ Years of Experience",
    avatar: "/images/advisors/corey-keller.jpg",
  },
];

// Small helper to create initials for fallback avatars
function initials(name: string) {
  const parts = name.split(" ").filter(Boolean);
  return (parts[0]?.[0] ?? "") + (parts[parts.length - 1]?.[0] ?? "");
}

function Avatar({ src, name }: { src?: string; name: string }) {
  const fallback = useMemo(() => initials(name).toUpperCase(), [name]);
  if (!src) {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-500/20 to-fuchsia-500/20 text-sm font-semibold text-foreground ring-1 ring-border/60">
        {fallback}
      </div>
    );
  }
  return (
   <div className="relative h-10 w-10 md:h-12 md:w-12 flex-none overflow-hidden rounded-full ring-1 ring-border/70">
  <Image src={src} alt={name} fill className="object-cover" />
</div>
  );
}

function TestimonialCard({ t, delay = 0 }: { t: Testimonial; delay?: number }) {
  const onCopy = async () => {
    const text = `“${t.quote}” — ${t.name}, ${t.title}`;
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Quote copied to clipboard");
    } catch {
      toast.error("Unable to copy");
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      transition={{ duration: 0.5, delay }}
      className="group relative flex h-full flex-col justify-between rounded-2xl border border-border/60 bg-background/70 p-5 shadow-sm backdrop-blur transition hover:shadow-md"
    >
      <Quote
        className="absolute right-4 top-4 h-4 w-4 text-muted-foreground/50"
        aria-hidden
      />
      <p className="mt-6 text-[15px] leading-relaxed text-foreground">
        {t.quote}
      </p>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar src={t.avatar} name={t.name} />
          <div>
            <p className="text-sm font-semibold">{t.name}</p>
            <p className="text-xs text-muted-foreground">{t.title}</p>
          </div>
        </div>

        <button
          onClick={onCopy}
          aria-label={`Copy quote from ${t.name}`}
          className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-background/80 px-3 py-1 text-xs font-medium text-foreground transition hover:bg-accent"
        >
          <Copy className="h-3.5 w-3.5" />
          Copy
        </button>
      </div>
    </motion.article>
  );
}

export default function Testimonials() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px -20% 0px" });

  return (
    <section className="relative z-10 py-16 md:py-24 lg:py-28">
      {/* Ambient accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-28 left-[5%] h-56 w-56 rounded-full bg-sky-400/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-10 h-64 w-64 rounded-full bg-fuchsia-400/20 blur-3xl"
      />

      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            The new way to reclaim time in healthcare
          </h2>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">
            Clinicians and healthcare leaders share why they trust Kyron to tame
            denials, draft appeals, and reduce hours spent with payers.
          </p>
        </div>

        {/* Masonry-like responsive grid */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {DATA.map((t, i) => (
            <TestimonialCard key={t.id} t={t} delay={i * 0.06} />
          ))}
        </motion.div>
      </div>

      {/* Soft grid overlay for subtle polish */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          color: "var(--foreground)",
        }}
      />
    </section>
  );
}
