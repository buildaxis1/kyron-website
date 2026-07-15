// components/ReferralCTA.tsx
"use client";

import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import React from "react";

type Props = {
  size?: "lg" | "sm";
};

const FORM_URL = "https://forms.gle/QGbGpCzw6xPdgAJQ8";

export default function ReferralCTA({ size = "lg" }: Props) {
  const base =
    "inline-flex items-center justify-center rounded-2xl font-bold text-white " +
    "shadow-[0_25px_40px_-15px_rgba(2,33,87,0.45)] transition " +
    "hover:scale-[1.02] active:scale-[0.98] bg-blue-700 hover:bg-blue-800";

  const sizing =
    size === "lg" ? "px-8 py-5 text-lg" : "px-6 py-3 text-base rounded-xl";

  return (
    <>
      <a
        href={FORM_URL}
        onClick={(e) => {
          // Keep navigation immediate but give a friendly confirmation
          // (toast will show briefly if opened in a new tab/window).
          toast.success("Opening referral form…", {
            description:
              "Complete the secure form to submit your referral and earn up to $10,000.",
          });
          // If you'd prefer new tab, uncomment:
          // e.preventDefault();
          // window.open(FORM_URL, "_blank", "noopener,noreferrer");
        }}
        className={`${base} ${sizing}`}
        aria-label="Open the referral form to earn up to $10,000"
      >
        Earn Up To $10K
        <ArrowRight className="ml-2 h-5 w-5" aria-hidden />
      </a>
    </>
  );
}
