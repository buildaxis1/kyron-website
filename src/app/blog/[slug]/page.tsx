import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, Clock } from "lucide-react";
import { blogPosts, getPostBySlug } from "../data/posts";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article not found | Kyron Medical" };
  return {
    title: `${post.title} | Kyron Medical Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 2);

  return (
    <article className="pb-20 pt-32 md:pb-28 md:pt-40">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            All articles
          </Link>

          <span className="mb-4 block">
            <span className="inline-block rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-600 dark:text-sky-400">
              {post.category}
            </span>
          </span>

          <h1 className="mb-5 text-balance text-3xl font-bold tracking-[-0.02em] !leading-tight text-foreground sm:text-4xl">
            {post.title}
          </h1>

          <div className="mb-10 flex flex-wrap items-center gap-4 border-b pb-8 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{post.author}</span>
            <span>{post.authorRole}</span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" />
              {formatDate(post.date)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </span>
          </div>

          <div className="space-y-8">
            {post.content.map((section, i) => (
              <div key={i}>
                {section.heading && (
                  <h2 className="mb-4 text-2xl font-semibold text-foreground">
                    {section.heading}
                  </h2>
                )}
                <div className="space-y-4">
                  {section.paragraphs.map((paragraph, j) => (
                    <p
                      key={j}
                      className="text-base !leading-relaxed text-muted-foreground md:text-lg"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl border border-border/60 bg-gradient-to-r from-sky-500/10 via-background/70 to-indigo-500/10 p-8 text-center shadow-2xl backdrop-blur">
            <h3 className="mb-2 text-xl font-semibold text-foreground">
              See Kyron Medical in action
            </h3>
            <p className="mb-5 text-sm text-muted-foreground">
              Voice AI for patient calls, payer calls, and denial intelligence.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-[0_20px_25px_-10px_rgba(0,0,0,0.35)] transition hover:scale-[1.02] hover:bg-blue-800 active:scale-[0.98]"
            >
              Request a demo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-14">
              <h3 className="mb-6 text-xl font-semibold text-foreground">
                Related articles
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {related.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/blog/${rel.slug}`}
                    className="group rounded-2xl border border-border/60 bg-background/70 p-5 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[#577DE8]/40 hover:shadow-lg"
                  >
                    <h4 className="mb-2 font-semibold text-foreground group-hover:text-primary">
                      {rel.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {rel.excerpt.slice(0, 100)}…
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
