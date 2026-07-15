import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Earn Up To $10K — Kyron Medical Referral Program",
  description: "Refer a physician or practice to Kyron Medical and earn up to $10,000.",
};

export default function ReferralProgramLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      id="10k"
      className="flowing-lines relative z-10 overflow-hidden pb-16 pt-[120px] md:pb-[50px] md:pt-[60px] xl:pb-[80px] xl:pt-[90px] 2xl:pb-[110px] 2xl:pt-[120px]"
      data-oid="jyx8lds"
    >
      <div className="container relative z-10" data-oid="pmx41r2">
        <main className="mx-auto flex justify-center items-center flex-col max-w-6xl gap-8 px-6 py-10">
 
            <div className="rounded-xl border border-black/10 bg-white shadow-sm">
              {children}
            </div>

        </main>
      </div>
    </section>
  );
}
