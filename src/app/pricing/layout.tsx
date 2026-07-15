import type { Metadata } from "next";
import * as React from "react";

export const metadata: Metadata = {
  title: "Pricing | Kyron",
  description: "Pricing for Kyron",
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
