"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "../ui/shadui/card";
import { Label } from "../ui/shadui/label";
import { ChevronDown } from "lucide-react";
import { Input } from "../ui/shadui/input";
import { Button } from "../ui/shadui/button";
import {
  Calculator,
  Users,
  DollarSign,
  Stethoscope,
  MapPin,
  Mail,
  Calendar,
} from "lucide-react";
import toast from "react-hot-toast";

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

const InsuranceDenialCalculator = () => {
  const [practiceSize, setPracticeSize] = useState("");
  const [annualRevenue, setAnnualRevenue] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [state, setState] = useState("");
  const [email, setEmail] = useState("");
  const [estimatedLoss, setEstimatedLoss] = useState<number>(0);
  // Dropdown state - only one dropdown open at a time
  const [openDropdown, setOpenDropdown] = useState<
    "practice" | "revenue" | "specialty" | "state" | null
  >(null);
  // root ref to detect outside clicks for closing dropdowns
  const rootRef = useRef<HTMLElement | null>(null);
  // hover state to toggle grid/hover visuals
  const [hovered, setHovered] = useState(false);

  const cardStyle: React.CSSProperties = {
    transition: "transform 220ms ease, box-shadow 220ms ease, background-color 220ms ease",
    backgroundImage: hovered
      ? "linear-gradient(90deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01)), repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 40px)"
      : "repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 40px)",
    backgroundSize: hovered ? "auto, 36px 36px, 36px 36px" : "36px 36px, 36px 36px",
    transform: hovered ? "translateY(-4px) scale(1.01)" : undefined,
    boxShadow: hovered ? "0 20px 50px rgba(2,6,23,0.6)" : undefined,
    borderRadius: 12,
  };

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
      position: "bottom-center",
    });
    console.log("Demo requested for email:", email);
    // Add demo request logic here
  };

  const kyronSavings = estimatedLoss ? estimatedLoss * 0.75 : 0;

  return (
    <section 
      ref={rootRef} 
      className="relative overflow-hidden py-20 md:py-28 text-center" 
      data-oid="3dpd4k_"
      style={{
        background:
          "radial-gradient(1200px 600px at 0% -10%, rgba(2,132,199,0.10), transparent 50%), radial-gradient(900px 500px at 100% 10%, rgba(79,70,229,0.10), transparent 50%)",
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

      <div className="container relative" data-oid="-2lah8z">
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={cardStyle}
          className="mx-4 mx-auto max-w-4xl overflow-visible rounded-lg bg-card shadow-lg"
          data-oid="g7ke15g"
        >
          {/* Header with gradient */}
          <div
            className="relative overflow-hidden rounded-t-lg bg-gradient-to-r
                       from-blue-600 to-blue-400 px-4 py-6 text-center
                       md:px-6 md:py-8"
            data-oid="o5wqj3h"
          >
            {/* Corner accents */}
            <div
              className="absolute left-0 top-0 h-20 w-20 -translate-x-10
                         -translate-y-10 rotate-45 transform bg-blue-600
                         opacity-20"
              data-oid="cudq-ql"
            />
            <div
              className="absolute right-0 top-0 h-20 w-20 -translate-y-10
                         translate-x-10 rotate-45 transform bg-blue-600
                         opacity-20"
              data-oid="pg-hle2"
            />

            <h1
              className="mx-auto max-w-2xl text-lg font-semibold text-white tracking-tight md:text-2xl lg:text-3xl"
              data-oid="16.:fkh"
            >
              Calculate Your Revenue Recovery Potential
              <br data-oid=":zxgn3v" />
              with Kyron Medical
            </h1>
          </div>

          <div className="overflow-visible p-6" data-oid="257abdn">
            <div
              className="grid grid-cols-1 gap-6 md:grid-cols-2"
              data-oid="-rue369"
            >
              {/* Practice Size */}
              <div className="space-y-3" data-oid="ua52m0g">
                <div className="flex items-center gap-3" data-oid="48q4fq6">
                  <div
                    className="rounded-full bg-blue-500/10 p-2"
                    data-oid="4xm1frq"
                  >
                    <Users
                      className="h-4 w-4 text-blue-500"
                      data-oid="3p_sfl9"
                    />
                  </div>
                  <Label
                    className="text-sm font-medium text-foreground"
                    data-oid="2yshk39"
                  >
                    Practice Size
                  </Label>
                </div>

                {/* Custom Practice Size Dropdown */}
                <div
                  className="relative"
                  data-oid="35_v5.3"
                  data-dropdown
                >
                  <button
                    onClick={() =>
                      setOpenDropdown((o) => (o === "practice" ? null : "practice"))
                    }
                    aria-haspopup="listbox"
                    aria-expanded={openDropdown === "practice"}
                    aria-controls="practice-list"
                    className="flex min-h-[48px] w-full items-center justify-between border border-blue-500/20 bg-background px-4 py-3 text-left leading-normal focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    data-oid="n67wje-"
                  >
                    <span className="flex-1 text-left text-muted-foreground" data-oid="g:h14ij">
                      {practiceSize ? `${practiceSize} providers` : "Select practice size..."}
                    </span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </button>

                  {openDropdown === "practice" && (
                    <div id="practice-list" role="listbox" className="absolute z-50 mt-1 w-full rounded-lg border border-border bg-background shadow-lg">
                      <div className="max-h-60 overflow-auto p-1">
                        {[
                          { value: "1-5", label: "1-5 providers" },
                          { value: "6-10", label: "6-10 providers" },
                          { value: "11-25", label: "11-25 providers" },
                          { value: "26-50", label: "26-50 providers" },
                          { value: "51-100", label: "51-100 providers" },
                          { value: "100+", label: "100+ providers" },
                        ].map((option) => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setPracticeSize(option.value);
                              setOpenDropdown(null);
                            }}
                            role="option"
                            aria-selected={practiceSize === option.value}
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                setPracticeSize(option.value);
                                setOpenDropdown(null);
                              }
                            }}
                            className="w-full px-3 py-3 text-left text-sm leading-relaxed text-foreground hover:bg-muted/50 focus:bg-muted/50 focus:outline-none"
                            data-oid={`practice-${option.value}`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Annual Revenue */}
              <div className="space-y-3" data-oid="6_klztk">
                <div className="flex items-center gap-3" data-oid="v:cjlg_">
                  <div
                    className="rounded-full  bg-blue-500/10 p-2"
                    data-oid="xe8wu1o"
                  >
                    <DollarSign
                      className="h-4 w-4 text-blue-500"
                      data-oid="tp0hnhg"
                    />
                  </div>
                  <Label
                    className="text-sm font-medium text-foreground"
                    data-oid="17vp.br"
                  >
                    Annual Revenue
                  </Label>
                </div>

                {/* Custom Annual Revenue Dropdown */}
                <div className="relative" data-oid="_z.u6-d" data-dropdown>
                  <button
                    onClick={() => setOpenDropdown((o) => (o === "revenue" ? null : "revenue"))}
                    aria-haspopup="listbox"
                    aria-expanded={openDropdown === "revenue"}
                    aria-controls="revenue-list"
                    className="flex min-h-[48px] w-full items-center justify-between border border-blue-500/20 bg-background px-4 py-3 text-left leading-normal focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    data-oid="c18kke3"
                  >
                    <span className="flex-1 text-left text-muted-foreground" data-oid="l3qsl9z">
                      {annualRevenue
                        ? revenueRanges.find((r) => r.value.toString() === annualRevenue)?.label
                        : "Select annual revenue..."}
                    </span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </button>

                  {openDropdown === "revenue" && (
                    <div id="revenue-list" role="listbox" className="absolute z-50 mt-1 w-full rounded-lg border border-border bg-background shadow-lg">
                      <div className="max-h-60 overflow-auto p-1">
                        {revenueRanges.map((range, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setAnnualRevenue(range.value.toString());
                              setOpenDropdown(null);
                            }}
                            role="option"
                            aria-selected={annualRevenue === range.value.toString()}
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                setAnnualRevenue(range.value.toString());
                                setOpenDropdown(null);
                              }
                            }}
                            className="w-full px-3 py-3 text-left text-sm leading-relaxed hover:bg-muted/50 focus:bg-muted/50 focus:outline-none"
                            data-oid="hoqt2w8"
                          >
                            {range.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Medical Specialty */}
              <div className="space-y-3" data-oid="inb8by_">
                <div className="flex items-center gap-3" data-oid="zi7oiq6">
                  <div
                    className="rounded-full  bg-blue-500/10  p-2"
                    data-oid="11-ioqr"
                  >
                    <Stethoscope
                      className="h-4 w-4 text-blue-500"
                      data-oid="8erbmqr"
                    />
                  </div>
                  <Label
                    className="text-sm font-medium text-foreground"
                    data-oid="u9p5hmg"
                  >
                    Medical Specialty
                  </Label>
                </div>

                {/* Custom Medical Specialty Dropdown */}
                <div className="relative" data-oid="e-y2lob" data-dropdown>
                  <button
                    onClick={() => setOpenDropdown((o) => (o === "specialty" ? null : "specialty"))}
                    aria-haspopup="listbox"
                    aria-expanded={openDropdown === "specialty"}
                    aria-controls="specialty-list"
                    className="flex min-h-[48px] w-full items-center justify-between border border-blue-500/20 bg-background px-4 py-3 text-left leading-normal focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    data-oid="rg5vg2i"
                  >
                    <span className="flex-1 text-left text-muted-foreground" data-oid="rpiun4_">
                      {specialty || "Select specialty..."}
                    </span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </button>

                  {openDropdown === "specialty" && (
                    <div id="specialty-list" role="listbox" className="absolute z-50 mt-1 w-full rounded-lg border border-border bg-background shadow-lg">
                      <div className="max-h-60 overflow-auto p-1">
                        {Object.keys(specialtyDenialRates)
                          .sort()
                          .map((spec) => (
                            <button
                              key={spec}
                              onClick={() => {
                                setSpecialty(spec);
                                setOpenDropdown(null);
                              }}
                              role="option"
                              aria-selected={specialty === spec}
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  setSpecialty(spec);
                                  setOpenDropdown(null);
                                }
                              }}
                              className="w-full px-3 py-3 text-left text-sm leading-relaxed hover:bg-muted/50 focus:bg-muted/50 focus:outline-none"
                              data-oid="wkvutrz"
                            >
                              {spec}
                            </button>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* State */}
              <div className="space-y-3" data-oid="-aa2.7r">
                <div className="flex items-center gap-3" data-oid="m8mou-_">
                  <div
                    className="rounded-full bg-blue-500/10 p-2"
                    data-oid="qs:s0yn"
                  >
                    <MapPin
                      className="h-4 w-4 text-blue-500"
                      data-oid="sj4avss"
                    />
                  </div>
                  <Label
                    className="text-sm font-medium text-foreground"
                    data-oid="xe4u695"
                  >
                    State
                  </Label>
                </div>

                {/* Custom State Dropdown */}
                <div className="relative" data-oid="laljx3h" data-dropdown>
                  <button
                    onClick={() => setOpenDropdown((o) => (o === "state" ? null : "state"))}
                    aria-haspopup="listbox"
                    aria-expanded={openDropdown === "state"}
                    aria-controls="state-list"
                    className="flex min-h-[48px] w-full items-center justify-between border border-blue-500/20 bg-background px-4 py-3 text-left leading-normal focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    data-oid="2na0rv5"
                  >
                    <span className="flex-1 text-left text-muted-foreground" data-oid="-4kluuj">
                      {state || "Select state..."}
                    </span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </button>

                  {openDropdown === "state" && (
                    <div id="state-list" role="listbox" className="absolute z-50 mt-1 w-full rounded-lg border border-border bg-background shadow-lg">
                      <div className="max-h-60 overflow-auto p-1">
                        {Object.keys(stateDenialRates)
                          .sort()
                          .map((st) => (
                            <button
                              key={st}
                              onClick={() => {
                                setState(st);
                                setOpenDropdown(null);
                              }}
                              role="option"
                              aria-selected={state === st}
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  setState(st);
                                  setOpenDropdown(null);
                                }
                              }}
                              className="w-full px-3 py-3 text-left text-sm leading-relaxed hover:bg-muted/50 focus:bg-muted/50 focus:outline-none"
                              data-oid="6ctt29o"
                            >
                              {st}
                            </button>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="mt-8 text-center" data-oid="9j:gelp">
              {estimatedLoss !== -1 ? (
                <div className="space-y-4" data-oid="avri4yb">
                  <div
                    className="mb-2 text-3xl font-bold text-red-600
                               dark:text-red-400"
                    data-oid="azg_42w"
                  >
                    {formatCurrency(estimatedLoss)}
                  </div>
                  <div
                    className="mb-4 text-sm text-foreground"
                    data-oid="px3g4b9"
                  >
                    Estimated annual revenue lost to claim denials
                  </div>

                  {/* Kyron Savings */}
                  <div
                    className="mb-4 rounded-lg border border-green-200
                               bg-green-50 p-4 dark:border-green-800
                               dark:bg-green-950/20"
                    data-oid="cc2ybtm"
                  >
                    <div
                      className="mb-2 text-2xl font-bold text-green-600
                                 dark:text-green-400"
                      data-oid="falww:0"
                    >
                      {formatCurrency(kyronSavings)}
                    </div>
                    <div
                      className="text-sm text-green-700 dark:text-green-300"
                      data-oid="71mtzmi"
                    >
                      Potential savings with Kyron Medical (75% recovery)
                    </div>
                  </div>

                  <Card
                    className="border-border bg-muted/30 dark:bg-muted/20"
                    data-oid="hwcfn30"
                  >
                    <CardContent className="pt-4" data-oid="1hb3f6v">
                      <div className="space-y-2 text-xs" data-oid="1-0apt9">
                        <div
                          className="flex justify-between"
                          data-oid="1q1b30a"
                        >
                          <span
                            className="text-muted-foreground"
                            data-oid="s-p:a2a"
                          >
                            Annual Revenue:
                          </span>
                          <span
                            className="font-medium text-foreground"
                            data-oid="l:21auc"
                          >
                            {formatCurrency(parseFloat(annualRevenue))}
                          </span>
                        </div>
                        <div
                          className="flex justify-between"
                          data-oid="_2f6ezu"
                        >
                          <span
                            className="text-muted-foreground"
                            data-oid="vxd1xr4"
                          >
                            Practice Size:
                          </span>
                          <span
                            className="font-medium text-foreground"
                            data-oid="pq889rh"
                          >
                            {practiceSize} providers
                          </span>
                        </div>
                        <div
                          className="flex justify-between"
                          data-oid="tmh3dp1"
                        >
                          <span
                            className="text-muted-foreground"
                            data-oid="b27ntaz"
                          >
                            Billing Rate:
                          </span>
                          <span
                            className="font-medium text-foreground"
                            data-oid="u4usw24"
                          >
                            97%
                          </span>
                        </div>
                        <div
                          className="flex justify-between border-t border-border pt-2"
                          data-oid="hyf-wxy"
                        >
                          <span
                            className="text-muted-foreground"
                            data-oid="n2e..gt"
                          >
                            Combined Denial Rate:
                          </span>
                          <span
                            className="font-medium text-foreground"
                            data-oid="tz2g4qz"
                          >
                            {typeof specialtyDenialRates[specialty] ===
                              "number" &&
                            typeof stateDenialRates[state] === "number"
                              ? (
                                  (specialtyDenialRates[specialty] +
                                    stateDenialRates[state]) /
                                  2
                                ).toFixed(1)
                              : typeof stateDenialRates[state] === "number"
                                ? stateDenialRates[state].toFixed(1)
                                : "N/A"}
                            %
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Demo Request Section */}
                  <div
                    className="mt-6 rounded-lg border border-blue-500/20
                               bg-blue-500/5 p-4 dark:border-blue-400/20
                               dark:bg-blue-400/5"
                    data-oid="ug4xb3u"
                  >
                    <h3
                      className="mb-3 text-lg font-semibold text-blue-600
                                 dark:text-blue-400"
                      data-oid="mjuc0lg"
                    >
                      Get Started with Kyron Medical
                    </h3>
                    <div className="space-y-3" data-oid="w_cmrpf">
                      <div
                        className="flex flex-col gap-2 sm:flex-row"
                        data-oid="-q.z_kp"
                      >
                        <Mail
                          className="mt-1 h-4 w-4 text-blue-600
                                     dark:text-blue-400 sm:mt-1"
                          data-oid="2e37mcv"
                        />

                        <Input
                          type="email"
                          aria-label="Enter your email address"
                          placeholder="Enter your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full flex-1"
                          data-oid="9pudc5e"
                        />
                      </div>
                      <div className="flex gap-2" data-oid="1zt8i86">
                        <Button
                          onClick={handleDemoRequest}
                          aria-label="Request Demo"
                          className="w-full flex-1 bg-blue-600 text-white
                                     hover:bg-blue-700 dark:bg-blue-500
                                     dark:hover:bg-blue-600"
                          data-oid="wq1mzb:"
                        >
                          <Calendar
                            className="mr-2 h-4 w-4"
                            data-oid="_1t4fog"
                          />
                          Request Demo
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4" data-oid="94hrv7n">
                  <div
                    className="mb-4 text-4xl text-blue-500"
                    data-oid="rrtuh3w"
                  >
                    <Calculator
                      className="mx-auto h-12 w-12"
                      data-oid="0z18c8i"
                    />
                  </div>
                  <div
                    className="mb-2 text-lg font-semibold text-foreground"
                    data-oid="4oepupe"
                  >
                    Complete the form to see your results
                  </div>
                  <div
                    className="mx-auto max-w-md text-sm text-muted-foreground"
                    data-oid="y928-0w"
                  >
                    Fill in your practice details to discover your revenue
                    recovery potential
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div
              className="mt-6 text-center text-xs text-muted-foreground"
              data-oid="3qp1srv"
            >
              *Estimates based on industry averages and may vary by practice.
              Actual results depend on specific circumstances and claim types.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsuranceDenialCalculator;
