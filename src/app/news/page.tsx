import { useMemo } from "react";
import SectionTitle from "@/app/_components/Common/SectionTitle";
import newsData from "./_components/newsData"; // Import the news data

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "News | Kyron",
  description: "News Page for Kyron",
  // other metadata
};

const NewsPage = () => {
  // Sort the news data by publishDate in descending order (most recent first)
  const sortedNewsData = useMemo(() => {
    return [...newsData].sort((a, b) => {
      const dateA = new Date(a.publishDate); // Convert publishDate to Date
      const dateB = new Date(b.publishDate); // Convert publishDate to Date
      return dateB.getTime() - dateA.getTime(); // Sort in descending order
    });
  }, []);

  return (
    <section id="news" className="relative overflow-hidden bg-gradient-to-b from-background via-background to-muted/30 py-16 md:py-20 lg:py-28">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-gradient-to-br from-primary/10 to-blue-500/10 blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-gradient-to-tl from-purple-500/8 to-pink-500/8 blur-3xl animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-gradient-to-t from-cyan-500/8 to-transparent blur-3xl" />
      </div>

      {/* Animated grid pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.015]">
        <div className="h-full w-full bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="container relative">
        <SectionTitle
          eyebrow="Newsroom"
          eyebrowDotClass="bg-amber-500"
          title="Latest News"
          paragraph="Stay up to date with the latest news and updates for Kyron!"
          center
        />

        {/* Featured Article */}
        <div className="mb-12 md:mb-16">
          {sortedNewsData.length > 0 && (
            <div className="relative overflow-hidden rounded-xl md:rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl">
              <div className="group relative">
                <div className="aspect-[4/3] md:aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={sortedNewsData[0].image}
                    alt={sortedNewsData[0].title}
                    className="w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    width={1200}
                    height={675}
                    priority
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent">
                  <div className="absolute bottom-0 p-4 md:p-6 lg:p-8">
                    <span className="mb-2 md:mb-3 inline-block rounded-full bg-blue-600 px-3 py-1 text-xs md:text-sm font-semibold text-white">
                      Featured
                    </span>
                    <h2 className="mb-3 md:mb-4 text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight">
                      {sortedNewsData[0].title}
                    </h2>
                    <p className="mb-3 md:mb-4 text-sm md:text-base text-gray-200 line-clamp-2 md:line-clamp-none">
                      {sortedNewsData[0].paragraph.substring(0, 120)}...
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <span className="text-xs md:text-sm text-gray-300">
                        {new Date(
                          sortedNewsData[0].publishDate,
                        ).toLocaleDateString()}
                      </span>
                      <a
                        href={sortedNewsData[0].link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex items-center gap-2 text-white hover:text-blue-400 text-sm md:text-base"
                      >
                        Read More
                        <span className="transition-transform duration-300 group-hover/link:translate-x-1">
                          →
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sortedNewsData.slice(1).map((newsItem) => (
            <div
              key={newsItem.id}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-background/70 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[#577DE8]/40 hover:shadow-lg"
            >
              <div className="aspect-[4/3] md:aspect-[16/9] overflow-hidden">
                <Image
                  src={newsItem.image}
                  alt={newsItem.title}
                  width={400}
                  height={225}
                  className="w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4 md:p-6">
                <div className="mb-3 md:mb-4 flex flex-wrap items-center gap-2 md:gap-4">
                  <span className="text-xs md:text-sm text-muted-foreground">
                    {new Date(newsItem.publishDate).toLocaleDateString()}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    by{" "}
                    <span className="font-semibold text-foreground">
                      {newsItem.author.name}
                    </span>
                  </span>
                  <Image
                    src={newsItem.logoUrl}
                    alt="Logo"
                    className="h-6 md:h-8 w-auto"
                    width={32}
                    height={32}
                  />
                </div>
                <Link href={newsItem.link}>
                  <h3 className="mb-2 md:mb-3 text-lg md:text-xl font-bold text-foreground leading-tight">
                    {newsItem.title}
                  </h3>
                </Link>
                <p className="mb-3 md:mb-4 line-clamp-3 md:line-clamp-2 text-sm md:text-base text-muted-foreground">
                  {newsItem.paragraph}
                </p>
                <a
                  href={newsItem.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-2 text-sm md:text-base text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Read Article
                  <span className="transition-transform duration-300 group-hover/link:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsPage;
