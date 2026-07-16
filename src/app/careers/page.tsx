import type { Metadata } from "next";
import CareersContent from "./_components/CareersContent";

export const metadata: Metadata = {
  title: "Careers | Kyron Medical",
  description:
    "Join Kyron Medical and help build voice AI that gives healthcare its time back. Explore open roles, benefits, culture, and our hiring process.",
};

export default function CareersPage() {
  return <CareersContent />;
}
