"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { blogPosts, categories } from "../data/posts";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogListing() {
  const [activeCategory, setActiveCategory] = useState("All");

  const featured = blogPosts.find((post) => post.featured);
  const posts = blogPosts
    .filter((post) =>
      activeCategory === "All" ? true : post.category === activeCategory,
    )
    .filter((post) => post.slug !== featured?.slug || activeCategory !== "All")
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <section className="pb-20 pt-32 md:pb-28 md:pt-40">
      <div className="container">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <h1 className="mb-4 text-balance text-4xl font-bold tracking-[-0.02em] !leading-tight text-foreground sm:text-5xl">
            The Kyron Medical Blog
          </h1>
          <p className="text-base !leading-relaxed text-muted-foreground md:text-lg">
            Insights on voice AI, revenue cycle management, and the future of
            healthcare operations — from the team building it.
          </p>
        </motion.div>

        {/* Featured article */}
        {featured && activeCategory === "All" && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mb-12"
          >
            <Link
              href={`/blog/${featured.slug}`}
              className="group block overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-r from-sky-500/10 via-background/70 to-indigo-500/10 p-8 shadow-2xl backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:p-10"
            >
              <span className="mb-4 inline-block rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                Featured
              </span>
              <h2 className="mb-3 text-2xl font-bold tracking-[-0.02em] text-foreground group-hover:text-primary sm:text-3xl">
                {featured.title}
              </h2>
              <p className="mb-5 max-w-3xl text-muted-foreground">
                {featured.excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">
                  {featured.category}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" />
                  {formatDate(featured.date)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {featured.readTime}
                </span>
                <span className="ml-auto inline-flex items-center gap-1.5 font-semibold text-primary">
                  Read article
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Category filter */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                activeCategory === category
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-[#577DE8]/40 bg-[#577DE8]/10 text-muted-foreground hover:bg-[#577DE8]/20 hover:text-[#577DE8]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Post grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: (i % 3) * 0.05 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-border/60 bg-background/70 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[#577DE8]/40 hover:shadow-lg"
              >
                <span className="mb-3 inline-block self-start rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-600 dark:text-sky-400">
                  {post.category}
                </span>
                <h3 className="mb-2 text-lg font-semibold text-foreground group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="mb-5 flex-1 text-sm !leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {formatDate(post.date)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readTime}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {posts.length === 0 && (
          <p className="py-12 text-center text-muted-foreground">
            No articles in this category yet — check back soon.
          </p>
        )}
      </div>
    </section>
  );
}
