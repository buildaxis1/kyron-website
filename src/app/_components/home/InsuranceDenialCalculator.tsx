"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  ChevronDown,
  DollarSign,
  MapPin,
  Stethoscope,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { toast } from "sonner";

// State denial rates - All 50 states included
const stateDenialRates = {
  Alabama: 18.6,
  Alaska: 9,
  Arizona: 20.5,
  Arkansas: 17.4,
  California: 8.4,
  Colorado: 13.5,
  Connecticut: 15.9,
  Delaware: 9.9,
  "District of Columbia": 9.6,
  Florida: 21.5,
  Georgia: 22.5,
  Hawaii: 9.3,
  Idaho: 12.3,
  Illinois: 19.5,
  Indiana: 25.87,
  Iowa: 14.4,
  Kansas: 14.1,
  Kentucky: 18,
  Louisiana: 18.3,
  Maine: 10.5,
  Maryland: 16.5,
  Massachusetts: 15.6,
  Michigan: 22.79,
  Minnesota: 14.7,
  Mississippi: 33.35,
  Missouri: 20,
  Montana: 12,
  Nebraska: 13.8,
  Nevada: 15.2,
  "New Hampshire": 23,
  "New Jersey": 16.2,
  "New Mexico": 8.7,
  "New York": 15.3,
  "North Carolina": 19.8,
  "North Dakota": 11.4,
  Ohio: 19.2,
  Oklahoma: 17.1,
  Oregon: 12.6,
  Pennsylvania: 18.9,
  "Rhode Island": 10.2,
  "South Carolina": 30.4,
  "South Dakota": 11.1,
  Tennessee: 20.8,
  Texas: 21.9,
  Utah: 13.2,
  Vermont: 10.8,
  Virginia: 17.7,
  Washington: 12.9,
  "West Virginia": 16.8,
  Wisconsin: 15,
  Wyoming: 11.7,
};

// Specialty denial rates - Updated with all specialties
const specialtyDenialRates = {
  "Allergy and Immunology": null,
  Anesthesiology: null,
  Cardiology: 15,
  "Colon and Rectal Surgery": null,
  "Critical Care": 20,
  Dermatology: null,
  "Emergency Medicine": 22,
  Endocrinology: null,
  "Family Medicine": null,
  Gastroenterology: null,
  "General Surgery": 19,
  "Geriatric Medicine": null,
  "Gynecologic Oncology": null,
  Hematology: null,
  "Infectious Disease": null,
  "Internal Medicine": 15,
  "Medical Genetics": null,
  "Medical Oncology": 16,
  Nephrology: null,
  "Neurological Surgery": null,
  Neurology: 18,
  "Nuclear Medicine": null,
  "OB-GYN": 17,
  Ophthalmology: null,
  "Orthopedic Surgery": 18,
  Otolaryngology: null,
  Pathology: null,
  Pediatrics: null,
  "Physical Medicine and Rehabilitation": null,
  "Plastic Surgery": 28,
  "Preventive Medicine": null,
  Psychiatry: null,
  "Pulmonary Medicine": 18,
  "Radiation Oncology": null,
  Radiology: 20,
  Rheumatology: 17,
  "Sleep Medicine": null,
  "Sports Medicine": null,
  "Thoracic Surgery": null,
  "Transplant Surgery": null,
  "Trauma Surgery": null,
  Urology: null,
  "Vascular Surgery": null,
};

// Annual revenue ranges
const revenueRanges = [
  { label: "< $250K", value: 125000 },
  { label: "$250K - $1M", value: 625000 },
  { label: "$1M - $5M", value: 3000000 },
  { label: "$5M - $15M", value: 10000000 },
  { label: "$15M - $25M", value: 20000000 },
  { label: "$25M - $50M", value: 37500000 },
  { label: "> $50M", value: 75000000 },
];

const practiceSizeOptions = [
  { value: "1-5", label: "1-5 providers" },
  { value: "6-10", label: "6-10 providers" },
  { value: "11-25", label: "11-25 providers" },
  { value: "26-50", label: "26-50 providers" },
  { value: "51-100", label: "51-100 providers" },
  { value: "100+", label: "100+ providers" },
];

type DropdownKey = "practice" | "revenue" | "specialty" | "state";

type DropdownProps = {
  id: DropdownKey;
  icon: React.ReactNode;
  label: string;
  placeholder: string;
  options: { value: string; label: string }[];
  value: string;
  display: string;
  openDropdown: DropdownKey | null;
  setOpenDropdown: (k: DropdownKey | null) => void;
  onChange: (value: string) => void;
};

function Dropdown({
  id,
  icon,
  label,
  placeholder,
  options,
  value,
  display,
  openDropdown,
  setOpenDropdown,
  onChange,
}: DropdownProps) {
  const open = openDropdown === id;
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#577DE8]/10 text-[#577DE8]">
          {icon}
        </span>
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={(e) => {
            e.stopPropagation();
            setOpenDropdown(open ? null : id);
          }}
          className="flex min-h-[48px] w-full items-center justify-between rounded-xl border border-border/60 bg-background px-4 py-3 text-left text-sm transition focus:border-[#577DE8] focus:outline-none focus:ring-2 focus:ring-[#577DE8]/20"
        >
          <span className={value ? "text-foreground" : "text-muted-foreground"}>
            {value ? display : placeholder}
          </span>
          <ChevronDown
            className={`h-4 w-4 text-muted-foreground transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
        {open && (
          <ul
            role="listbox"
            className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-xl border border-border bg-background py-1 shadow-lg"
          >
            {options.map((o) => (
              <li key={o.value} role="option" aria-selected={o.value === value}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(o.value);
                    setOpenDropdown(null);
                  }}
                  className={`w-full cursor-pointer px-4 py-2 text-left text-sm transition hover:bg-[#577DE8]/10 focus:bg-[#577DE8]/10 focus:outline-none ${
                    o.value === value
                      ? "bg-[#577DE8]/10 font-medium text-[#577DE8]"
                      : "text-foreground"
                  }`}
                >
                  {o.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

const InsuranceDenialCalculator = () => {
  const [practiceSize, setPracticeSize] = useState("");
  const [annualRevenue, setAnnualRevenue] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [state, setState] = useState("");
  const [email, setEmail] = useState("");
  const [estimatedLoss, setEstimatedLoss] = useState<number>(-1);
  // Dropdown state - only one dropdown open at a time
  const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null);
  // root ref to detect outside clicks for closing dropdowns
  const rootRef = useRef<HTMLElement | null>(null);

  // Close dropdowns when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (rootRef.current && !rootRef.current.contains(target)) {
        setOpenDropdown(null);
      }
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenDropdown(null);
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  // Calculate estimated loss without practice size factor
  useEffect(() => {
    if (annualRevenue && specialty && state) {
      const revenueAmount = parseFloat(annualRevenue);
      const billingRate = 0.97;
      const specialtyRate = specialtyDenialRates[specialty]
        ? specialtyDenialRates[specialty] / 100
        : stateDenialRates[state] / 100;
      const stateRate = stateDenialRates[state] / 100;
      // Use specialty rate if available, otherwise use state rate
      const denialRate = specialtyDenialRates[specialty]
        ? (specialtyRate + stateRate) / 2
        : stateRate;
      const loss = revenueAmount * billingRate * denialRate;
      setEstimatedLoss(loss);
    } else {
      setEstimatedLoss(-1);
    }
  }, [annualRevenue, specialty, state]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleDemoRequest = () => {
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    toast.success("Demo request received! We'll be in touch soon.", {
      duration: 4000,
    });
    console.log("Demo requested for email:", email);
    // Add demo request logic here
  };

  const hasResult = estimatedLoss >= 0;
  const kyronSavings = hasResult ? estimatedLoss * 0.75 : 0;

  const combinedDenialRate =
    typeof specialtyDenialRates[specialty] === "number" &&
    typeof stateDenialRates[state] === "number"
      ? (
          (specialtyDenialRates[specialty] + stateDenialRates[state]) /
          2
        ).toFixed(1)
      : typeof stateDenialRates[state] === "number"
        ? stateDenialRates[state].toFixed(1)
        : null;

  const revenueLabel =
    revenueRanges.find((r) => String(r.value) === annualRevenue)?.label ?? null;

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden py-20 md:py-28"
      data-oid="3dpd4k_"
      style={{
        background:
          "radial-gradient(1200px 600px at 0% -10%, rgba(16,185,129,0.09), transparent 50%), radial-gradient(900px 500px at 100% 10%, rgba(2,132,199,0.09), transparent 50%)",
      }}
    >
      {/* soft grid */}
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
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-500" />
            ROI Calculator
          </div>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl md:text-5xl">
            Calculate your revenue recovery potential
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            See how much denied-claim revenue Kyron Medical could help you
            recover.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl items-stretch gap-6 lg:grid-cols-2">
          {/* Inputs */}
          <div className="rounded-3xl border border-border/60 bg-background/70 p-6 shadow-sm backdrop-blur sm:p-8">
            <h3 className="text-lg font-semibold text-foreground">
              Tell us about your practice
            </h3>
            <div className="mt-6 space-y-5">
              <Dropdown
                id="practice"
                icon={<Users className="h-4 w-4" />}
                label="Practice Size"
                placeholder="Select practice size..."
                options={practiceSizeOptions}
                value={practiceSize}
                display={`${practiceSize} providers`}
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
                onChange={setPracticeSize}
              />
              <Dropdown
                id="revenue"
                icon={<DollarSign className="h-4 w-4" />}
                label="Annual Revenue"
                placeholder="Select annual revenue..."
                options={revenueRanges.map((r) => ({
                  value: String(r.value),
                  label: r.label,
                }))}
                value={annualRevenue}
                display={revenueLabel ?? ""}
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
                onChange={setAnnualRevenue}
              />
              <Dropdown
                id="specialty"
                icon={<Stethoscope className="h-4 w-4" />}
                label="Medical Specialty"
                placeholder="Select specialty..."
                options={Object.keys(specialtyDenialRates).map((s) => ({
                  value: s,
                  label: s,
                }))}
                value={specialty}
                display={specialty}
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
                onChange={setSpecialty}
              />
              <Dropdown
                id="state"
                icon={<MapPin className="h-4 w-4" />}
                label="State"
                placeholder="Select state..."
                options={Object.keys(stateDenialRates).map((s) => ({
                  value: s,
                  label: s,
                }))}
                value={state}
                display={state}
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
                onChange={setState}
              />
            </div>
          </div>

          {/* Results */}
          <div className="flex flex-col gap-4 rounded-3xl border border-border/60 bg-gradient-to-br from-[#577DE8] to-blue-500 p-6 text-white shadow-lg sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
                <div className="flex items-center gap-2 text-xs font-medium text-blue-100">
                  <TrendingDown className="h-4 w-4" />
                  Lost to denials / yr
                </div>
                <div className="mt-2 text-3xl font-bold">
                  {hasResult ? formatCurrency(estimatedLoss) : "—"}
                </div>
              </div>
              <div className="rounded-2xl bg-white/15 p-5 ring-1 ring-white/30 backdrop-blur">
                <div className="flex items-center gap-2 text-xs font-medium text-emerald-100">
                  <TrendingUp className="h-4 w-4" />
                  Recoverable with Kyron
                </div>
                <div className="mt-2 text-3xl font-bold text-white">
                  {hasResult ? formatCurrency(kyronSavings) : "—"}
                </div>
                <div className="mt-1 text-[11px] text-blue-100">
                  {hasResult
                    ? "Based on 75% recovery"
                    : "Fill in your practice details to see your numbers"}
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white/10 p-5 text-sm backdrop-blur">
              <div className="flex justify-between border-b border-white/15 py-1.5">
                <span className="text-blue-100">Annual Revenue</span>
                <span className="font-medium">{revenueLabel ?? "—"}</span>
              </div>
              <div className="flex justify-between border-b border-white/15 py-1.5">
                <span className="text-blue-100">Practice Size</span>
                <span className="font-medium">
                  {practiceSize ? `${practiceSize} providers` : "—"}
                </span>
              </div>
              <div className="flex justify-between border-b border-white/15 py-1.5">
                <span className="text-blue-100">Billing Rate</span>
                <span className="font-medium">97%</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-blue-100">Combined Denial Rate</span>
                <span className="font-medium">
                  {combinedDenialRate !== null
                    ? `${combinedDenialRate}%`
                    : "N/A"}
                </span>
              </div>
            </div>

            <div className="mt-auto rounded-2xl bg-white/10 p-5 backdrop-blur">
              <h3 className="text-base font-semibold">
                Get started with Kyron Medical
              </h3>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Enter your email address"
                  placeholder="Enter your email address"
                  className="h-11 flex-1 rounded-xl border border-white/30 bg-white/90 px-4 text-sm text-gray-900 outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-white"
                />
                <button
                  onClick={handleDemoRequest}
                  aria-label="Request Demo"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-[#577DE8] transition hover:bg-blue-50"
                >
                  Request Demo
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-3xl text-center text-xs text-muted-foreground">
          *Estimates based on industry averages and may vary by practice.
          Actual results depend on specific circumstances and claim types.
        </p>
      </div>
    </section>
  );
};

export default InsuranceDenialCalculator;
