"use client";

import React, { useState } from "react";
import {
  Star,
  MapPin,
  Users,
  Activity,
  GitBranch,
  CheckCircle2,
  Loader2,
  ChevronDown,
} from "lucide-react";

// ─── Stat card ───────────────────────────────────────────────────────────────
function Stat({
  value,
  label,
  icon: Icon,
}: {
  value: string;
  label: string;
  icon: React.ElementType;
}) {
  return (
    <div className="flex flex-col gap-1 rounded-xl border border-border/60 bg-background/70 p-5 backdrop-blur">
      <div className="mb-1 flex items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4" />
      </div>
      <p className="text-2xl font-bold tracking-tight text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

// ─── Select wrapper ───────────────────────────────────────────────────────────
function Select({
  id,
  value,
  onChange,
  children,
  required,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full appearance-none rounded-xl border border-border/60 bg-background/70 px-4 py-3 pr-10 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 backdrop-blur"
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
}

// ─── Input wrapper ────────────────────────────────────────────────────────────
function Input({
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
}: {
  id: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className="w-full rounded-xl border border-border/60 bg-background/70 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 backdrop-blur"
    />
  );
}

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-medium text-muted-foreground">
      {children}
    </label>
  );
}

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [providerCount, setProviderCount] = useState("");
  const [ehr, setEhr] = useState("");
  const [heardAbout, setHeardAbout] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // Contact form submission is disabled in this build — no external request
    // is made. The form simulates a successful submit for demonstration only.
    await new Promise((r) => setTimeout(r, 400));
    setStatus("success");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-background via-background to-muted/30">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-gradient-to-br from-primary/10 to-blue-500/10 blur-3xl animate-pulse"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-gradient-to-tl from-purple-500/8 to-pink-500/8 blur-3xl animate-pulse"
          style={{ animationDuration: "10s" }}
        />
        <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-gradient-to-t from-cyan-500/8 to-transparent blur-3xl" />
      </div>

      {/* Grid texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.015]">
        <div className="h-full w-full bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="container relative py-16 md:py-20 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_480px] lg:gap-16 lg:items-start">

            {/* ── Left: social proof ── */}
            <div className="lg:sticky lg:top-28">
              <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Book a Demo
              </p>
              <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                The voice AI built for{" "}
                <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                  healthcare.
                </span>
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                See how Kyron's cutting-edge voice AI automates patient access
                and revenue cycle management. Say goodbye to abandoned calls,
                endless hold times, and claim denials.
              </p>

              {/* Stars */}
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-2 backdrop-blur">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  Median 5-star patient rating
                </span>
              </div>

              {/* States badge */}
              <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-2 backdrop-blur">
                <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  Trusted in{" "}
                  <strong className="text-foreground">35+ states</strong> across the US
                </span>
              </div>

              {/* Stats grid */}
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                <Stat value="100M+" label="Patient Interactions" icon={Users} />
                <Stat value="100K+" label="Customized Protocols" icon={Activity} />
                <Stat value="10M+" label="Unique Decision Pathways" icon={GitBranch} />
              </div>

              {/* What to expect */}
              <div className="mt-8 rounded-xl border border-border/60 bg-background/70 p-5 backdrop-blur">
                <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  What to expect
                </p>
                <ul className="space-y-2.5">
                  {[
                    "A live walkthrough of Kyron's voice AI for your use case",
                    "See patient access and RCM automation side by side",
                    "Live ROI estimate based on your call volume and team size",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-muted-foreground"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ── Right: form ── */}
            <div className="rounded-2xl border border-border/60 bg-background/70 p-6 shadow-sm backdrop-blur sm:p-8">
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">
                    <CheckCircle2 className="h-7 w-7 text-emerald-500" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">Request received!</h2>
                  <p className="text-sm text-muted-foreground">
                    Our team will reach out within one business day to schedule
                    your personalized demo.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-semibold text-foreground">Book your demo</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Our team will get back to you within one business day.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    {/* Name */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="firstName">First name *</Label>
                        <Input id="firstName" placeholder="Jane" value={firstName} onChange={setFirstName} required />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last name *</Label>
                        <Input id="lastName" placeholder="Smith" value={lastName} onChange={setLastName} required />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <Label htmlFor="workEmail">Work email *</Label>
                      <Input id="workEmail" type="email" placeholder="jane@practice.com" value={workEmail} onChange={setWorkEmail} required />
                    </div>

                    {/* Phone */}
                    <div>
                      <Label htmlFor="phone">Phone number</Label>
                      <Input id="phone" type="tel" placeholder="(555) 000-0000" value={phone} onChange={setPhone} />
                    </div>

                    {/* Job + Company */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="jobTitle">Job title *</Label>
                        <Input id="jobTitle" placeholder="CEO" value={jobTitle} onChange={setJobTitle} required />
                      </div>
                      <div>
                        <Label htmlFor="companyName">Practice / Company *</Label>
                        <Input id="companyName" placeholder="Acme Ortho" value={companyName} onChange={setCompanyName} required />
                      </div>
                    </div>

                    {/* Specialty */}
                    <div>
                      <Label htmlFor="specialty">Specialty / Practice type *</Label>
                      <Select id="specialty" value={specialty} onChange={setSpecialty} required>
                        <option value="" disabled>Select specialty...</option>
                        <option>Orthopedics</option>
                        <option>Cardiology</option>
                        <option>Neurology</option>
                        <option>Oncology</option>
                        <option>Primary Care</option>
                        <option>Radiology</option>
                        <option>Surgery</option>
                        <option>Urology</option>
                        <option>Multi-specialty Group</option>
                        <option>Hospital / Health System</option>
                        <option>Other</option>
                      </Select>
                    </div>

                    {/* Provider count */}
                    <div>
                      <Label htmlFor="providerCount">Number of providers</Label>
                      <Select id="providerCount" value={providerCount} onChange={setProviderCount}>
                        <option value="" disabled>Select range...</option>
                        <option>1–5</option>
                        <option>6–20</option>
                        <option>21–50</option>
                        <option>51–100</option>
                        <option>100+</option>
                      </Select>
                    </div>

                    {/* EHR */}
                    <div>
                      <Label htmlFor="ehr">EHR system</Label>
                      <Input id="ehr" placeholder="e.g. Epic, Cerner, Athenahealth..." value={ehr} onChange={setEhr} />
                    </div>

                    {/* Heard about */}
                    <div>
                      <Label htmlFor="heardAbout">How did you hear about us?</Label>
                      <Select id="heardAbout" value={heardAbout} onChange={setHeardAbout}>
                        <option value="" disabled>Select...</option>
                        <option>Google / Search</option>
                        <option>LinkedIn</option>
                        <option>Colleague / Referral</option>
                        <option>Conference / Event</option>
                        <option>Email outreach</option>
                        <option>Other</option>
                      </Select>
                    </div>

                    {status === "error" && (
                      <p className="text-sm text-red-500">
                        Something went wrong. Please try again or email us at{" "}
                        <a href="mailto:sales@kyronmedical.com" className="underline">
                          sales@kyronmedical.com
                        </a>
                        .
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90 disabled:opacity-60"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Book My Demo"
                      )}
                    </button>

                    <p className="text-center text-xs text-muted-foreground">
                      No spam. Your info is only used to schedule your demo.
                    </p>
                  </form>
                </>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}