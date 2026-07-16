"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  HeartPulse,
  Rocket,
  Users,
  Laptop,
  Globe2,
  GraduationCap,
  Stethoscope,
  Coffee,
  PiggyBank,
  ArrowRight,
  MapPin,
  Clock,
  Search,
  MessagesSquare,
  ClipboardList,
  Handshake,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const whyJoin = [
  {
    icon: HeartPulse,
    title: "Work that matters",
    description:
      "Every payer call our AI completes and every denial it resolves means faster care and healthier practices. Your work directly improves how healthcare runs.",
  },
  {
    icon: Rocket,
    title: "Startup trajectory, real traction",
    description:
      "We're an early-stage team shipping voice AI that clinics use every day. You'll own problems end-to-end and see your work in production fast.",
  },
  {
    icon: Users,
    title: "Small team, big ownership",
    description:
      "No layers of process between you and impact. You'll work directly with founders, customers, and the frontier of voice AI in healthcare.",
  },
];

const benefits = [
  {
    icon: PiggyBank,
    title: "Competitive salary & equity",
    description: "Meaningful ownership in what you're building.",
  },
  {
    icon: Stethoscope,
    title: "Health, dental & vision",
    description: "Comprehensive coverage for you and your family.",
  },
  {
    icon: Laptop,
    title: "Top-tier equipment",
    description: "The hardware and tools you need to do your best work.",
  },
  {
    icon: Globe2,
    title: "Flexible & remote-friendly",
    description: "Work where you're most productive, with flexible hours.",
  },
  {
    icon: GraduationCap,
    title: "Learning budget",
    description: "Courses, books, and conferences on us.",
  },
  {
    icon: Coffee,
    title: "Team on-sites",
    description: "Regular gatherings to build, plan, and celebrate together.",
  },
];

const openPositions = [
  {
    title: "Founding Full-Stack Engineer",
    department: "Engineering",
    location: "Remote (US)",
    type: "Full-time",
  },
  {
    title: "Voice AI / ML Engineer",
    department: "Engineering",
    location: "Remote (US)",
    type: "Full-time",
  },
  {
    title: "Healthcare Solutions Consultant",
    department: "Customer Success",
    location: "Remote (US)",
    type: "Full-time",
  },
  {
    title: "Founding Account Executive",
    department: "Sales",
    location: "Remote (US)",
    type: "Full-time",
  },
];

const hiringSteps = [
  {
    icon: Search,
    title: "Application review",
    description: "We read every application — expect to hear back within a week.",
  },
  {
    icon: MessagesSquare,
    title: "Intro conversation",
    description: "A 30-minute call about your background, goals, and the role.",
  },
  {
    icon: ClipboardList,
    title: "Practical deep-dive",
    description:
      "A role-relevant working session or take-home — real problems, not puzzles.",
  },
  {
    icon: Handshake,
    title: "Team fit & offer",
    description:
      "Meet the team you'll work with, then we move quickly to an offer.",
  },
];

export default function CareersContent() {
  return (
    <>
      {/* Mission hero */}
      <section className="relative overflow-hidden pb-16 pt-32 md:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-16 top-16 h-56 w-56 rounded-full bg-sky-400/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 top-32 h-56 w-56 rounded-full bg-indigo-400/15 blur-3xl"
        />
        <div className="container relative">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mx-auto max-w-3xl text-center"
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground">
              <HeartPulse className="h-4 w-4 text-sky-500" />
              Careers at Kyron Medical
            </span>
            <h1 className="mb-5 text-4xl font-bold !leading-tight text-foreground sm:text-5xl">
              Help us give healthcare its time back
            </h1>
            <p className="text-base !leading-relaxed text-muted-foreground md:text-lg">
              Our mission is to eliminate the administrative burden that keeps
              clinicians and billing teams away from patients. We build voice
              AI that handles the phone calls healthcare runs on — and
              we&apos;re looking for people who want that future to arrive
              sooner.
            </p>
            <div className="mt-8">
              <a
                href="#open-positions"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow transition-transform hover:scale-[1.02]"
              >
                View open positions
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why join */}
      <section className="py-16 md:py-20">
        <div className="container">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="mb-10 text-center text-3xl font-bold text-foreground sm:text-4xl"
          >
            Why join Kyron Medical
          </motion.h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {whyJoin.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400">
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
        </div>
      </section>

      {/* Culture */}
      <section className="bg-muted/50 py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="mb-6 text-3xl font-bold text-foreground sm:text-4xl"
            >
              How we work
            </motion.h2>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="text-base !leading-relaxed text-muted-foreground md:text-lg"
            >
              We&apos;re pragmatic builders who care about outcomes over
              optics. We ship fast, talk to customers constantly, and hold a
              high bar for the details — because in healthcare, the details
              are patients. We default to trust, give direct feedback kindly,
              and celebrate the wins loudly.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-20">
        <div className="container">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="mb-10 text-center text-3xl font-bold text-foreground sm:text-4xl"
          >
            Benefits &amp; perks
          </motion.h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-start gap-4 rounded-xl border bg-card p-5 shadow-sm"
              >
                <div className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open positions */}
      <section id="open-positions" className="bg-muted/50 py-16 md:py-20">
        <div className="container">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="mb-10 text-center text-3xl font-bold text-foreground sm:text-4xl"
          >
            Open positions
          </motion.h2>
          <div className="mx-auto max-w-3xl space-y-4">
            {openPositions.map((job, i) => (
              <motion.div
                key={job.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.04 }}
                className="group flex flex-col gap-3 rounded-xl border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h3 className="font-semibold text-foreground">
                    {job.title}
                  </h3>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span>{job.department}</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {job.location}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {job.type}
                    </span>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 self-start text-sm font-semibold text-primary transition-colors group-hover:underline sm:self-center"
                >
                  Apply
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don&apos;t see your role?{" "}
            <Link href="/contact" className="font-medium text-primary hover:underline">
              Reach out anyway
            </Link>{" "}
            — we&apos;re always looking for exceptional people.
          </p>
        </div>
      </section>

      {/* Hiring process */}
      <section className="py-16 md:py-20">
        <div className="container">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="mb-10 text-center text-3xl font-bold text-foreground sm:text-4xl"
          >
            Our hiring process
          </motion.h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {hiringSteps.map((step, i) => (
              <motion.div
                key={step.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.05 }}
                className="relative rounded-xl border bg-card p-6 shadow-sm"
              >
                <span className="absolute right-4 top-4 text-3xl font-bold text-muted-foreground/20">
                  {i + 1}
                </span>
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400">
                  <step.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm !leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 md:pb-28">
        <div className="container">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="mx-auto max-w-4xl rounded-2xl border bg-gradient-to-r from-sky-500/10 via-card to-indigo-500/10 p-10 text-center shadow-lg"
          >
            <h2 className="mb-3 text-2xl font-bold text-foreground sm:text-3xl">
              Ready to build the future of healthcare operations?
            </h2>
            <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
              Join a team using voice AI to give clinicians and billing teams
              their time back — one call at a time.
            </p>
            <a
              href="#open-positions"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow transition-transform hover:scale-[1.02]"
            >
              Explore roles
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
