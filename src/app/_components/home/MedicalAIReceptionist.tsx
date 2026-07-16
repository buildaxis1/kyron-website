"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  AudioLines,
  CalendarCheck,
  HeartPulse,
  MessageSquareHeart,
  PhoneCall,
  PlayCircle,
  Workflow,
} from "lucide-react";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const highlights = [
  {
    icon: PhoneCall,
    title: "AI-Powered Phone Receptionist",
    description:
      "Answers every call instantly, 24/7 — no hold music, no missed patients, no voicemail black holes.",
  },
  {
    icon: CalendarCheck,
    title: "Appointment Scheduling",
    description:
      "Books, reschedules, and confirms appointments directly against your calendar and EHR in real time.",
  },
  {
    icon: MessageSquareHeart,
    title: "Patient Communication",
    description:
      "Handles reminders, follow-ups, and routine questions with a warm, natural voice patients trust.",
  },
  {
    icon: AudioLines,
    title: "Voice AI Automation",
    description:
      "Natural conversations powered by healthcare-tuned voice AI — intake, triage routing, and FAQs handled automatically.",
  },
  {
    icon: Workflow,
    title: "Healthcare Workflow Optimization",
    description:
      "Every call is transcribed, summarized, and routed into your existing workflows so staff stay in the loop.",
  },
  {
    icon: HeartPulse,
    title: "Built for Clinics & Providers",
    description:
      "Front desks reclaim hours every day, patients get answers faster, and no revenue slips through missed calls.",
  },
];

export default function MedicalAIReceptionist() {
  return (
    <section
      id="ai-receptionist"
      className="relative overflow-hidden py-20 md:py-28"
      data-oid="ai-receptionist"
      style={{
        background:
          "radial-gradient(1200px 600px at 0% -10%, rgba(6,182,212,0.10), transparent 50%), radial-gradient(900px 500px at 100% 10%, rgba(14,165,233,0.10), transparent 50%)",
      }}
    >
      {/* ambient accents — clipped so blur never causes horizontal scroll */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-16 top-10 h-56 w-56 rounded-full bg-sky-400/15 blur-3xl" />
        <div className="absolute -right-16 bottom-10 h-56 w-56 rounded-full bg-cyan-400/15 blur-3xl" />
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

      <div className="container relative">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <PhoneCall className="h-3.5 w-3.5 text-sky-500" />
            Medical AI Receptionist
          </span>
          <h2 className="mb-4 text-balance text-3xl font-bold !leading-tight tracking-[-0.02em] text-foreground sm:text-4xl md:text-5xl">
            Your front desk, answered by AI — every call, every time
          </h2>
          <p className="text-base !leading-relaxed text-muted-foreground md:text-lg">
            The Medical AI Receptionist answers patient calls, schedules
            appointments, and handles routine communication with a natural voice
            — so your team can focus on the patients in front of them.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.05 }}
              className="group rounded-2xl border border-border/60 bg-background/70 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[#577DE8]/40 hover:shadow-lg"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600 transition group-hover:scale-105 dark:text-sky-400">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="text-sm !leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Demo video slot — recording to be embedded */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto mt-14 max-w-4xl"
        >
          <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-border/60 bg-muted/40 shadow-2xl backdrop-blur">
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <PlayCircle className="h-14 w-14 text-sky-500/70" />
              <p className="text-sm font-medium">
                Product demo — AI receptionist, scheduling &amp; patient
                workflow
              </p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-[0_20px_25px_-10px_rgba(0,0,0,0.35)] transition hover:scale-[1.02] hover:bg-blue-800 active:scale-[0.98]"
            >
              See it answer your phones
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
