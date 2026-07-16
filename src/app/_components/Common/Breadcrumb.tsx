interface BreadcrumbProps {
  pageName: string;
  description: string;
  "data-oid"?: string;
}

const Breadcrumb = ({ pageName, description, ...props }: BreadcrumbProps) => {
  return (
    <section
      className="relative z-10 overflow-hidden"
      style={{
        background:
          "radial-gradient(1200px 600px at 0% -10%, rgba(2,132,199,0.10), transparent 50%), radial-gradient(900px 500px at 100% 10%, rgba(79,70,229,0.10), transparent 50%)",
      }}
      data-oid="8njhm7r"
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

      {/* fade back into page background for a seamless handoff */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-background"
      />

      <div className="container relative py-16 lg:py-24" data-oid="d09yyrt">
        <div
          className="flex flex-col items-center text-center"
          data-oid="c9pewyi"
        >
          <h1
            className="mb-6 text-balance pb-2 text-4xl font-bold tracking-[-0.02em] text-foreground sm:text-5xl"
            data-oid="afkv1d8"
          >
            {pageName}
          </h1>

          <p
            className="mx-auto max-w-2xl text-center text-lg leading-relaxed text-muted-foreground"
            data-oid="68wv:v_"
          >
            {description}
          </p>

          <div
            className="mt-8 flex items-center justify-center space-x-4"
            data-oid="iyv5xi."
          >
            <span className="inline-flex h-1 w-12 rounded bg-[#577DE8]" />
            <span className="inline-flex h-1 w-3 rounded bg-[#577DE8]/70" />
            <span className="inline-flex h-1 w-1 rounded bg-[#577DE8]/40" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Breadcrumb;
