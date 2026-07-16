"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  FileSearch,
  ClipboardCheck,
  FileQuestion,
  RefreshCcw,
  Landmark,
  ArrowRight,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const workflows = [
  {
    icon: ShieldCheck,
    title: "Eligibility & Benefits Checks",
    description:
      "Voice AI calls payers to verify coverage, copays, and benefit details before the patient ever arrives.",
  },
  {
    icon: ClipboardCheck,
    title: "Prior Authorization",
    description:
      "Initiates and follows up on prior auth requests so treatments aren't stuck waiting on hold queues.",
  },
  {
    icon: FileSearch,
    title: "Claim Status Inquiries",
    description:
      "Checks claim status across payers automatically and surfaces exactly which claims need attention.",
  },
  {
    icon: FileQuestion,
    title: "Denial Reason Clarification",
    description:
      "Calls payers to pin down the real reason behind denials — codes, documentation gaps, or policy issues.",
  },
  {
    icon: RefreshCcw,
    title: "Appeal Follow-Ups",
    description:
      "Keeps appeals moving with persistent payer follow-up calls and structured outcome reporting.",
  },
  {
    icon: Landmark,
    title: "Built for Billing Teams",
    description:
      "Your team stops waiting on hold and starts working outcomes — with every payer call logged and summarized.",
  },
];

export default function RevenueCycleAI() {
  return (
    <section
      id="rcm-ai"
      className="relative overflow-hidden py-20 md:py-28"
      data-oid="rcm-ai"
      style={{
        background:
          "radial-gradient(1200px 600px at 0% -10%, rgba(99,102,241,0.10), transparent 50%), radial-gradient(900px 500px at 100% 10%, rgba(168,85,247,0.10), transparent 50%)",
      }}
    >
      {/* grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          maskImage:
            "radial-gradient(ellipse at center, black 70%, transparent 100%)",
        }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(120,120,120,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,120,120,0.08)_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <div className="container relative">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <Landmark className="h-3.5 w-3.5 text-indigo-500" />
            Revenue Cycle Management AI
          </span>
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-[-0.02em] !leading-tight text-foreground sm:text-4xl md:text-5xl">
            Voice AI that calls payers, so your billing team doesn&apos;t have
            to
          </h2>
          <p className="text-base !leading-relaxed text-muted-foreground md:text-lg">
            Kyron&apos;s RCM AI works payer phone lines around the clock —
            verifying benefits, chasing authorizations, and resolving claims —
            then hands your team clean, structured results.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workflows.map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.05 }}
              className="group rounded-2xl border border-border/60 bg-background/70 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[#577DE8]/40 hover:shadow-lg"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 transition group-hover:scale-105 dark:text-indigo-400">
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

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 text-center"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-[0_20px_25px_-10px_rgba(0,0,0,0.35)] transition hover:scale-[1.02] hover:bg-blue-800 active:scale-[0.98]"
          >
            Put voice AI on your payer calls
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
