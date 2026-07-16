import type { Metadata } from "next";
import BlogListing from "./_components/BlogListing";

export const metadata: Metadata = {
  title: "Blog | Kyron Medical",
  description:
    "Insights on voice AI, revenue cycle management, denial intelligence, and the future of healthcare operations from the Kyron Medical team.",
};

export default function BlogPage() {
  return <BlogListing />;
}
