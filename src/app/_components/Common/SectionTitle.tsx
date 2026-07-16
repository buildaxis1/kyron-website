const SectionTitle = ({
  title,
  paragraph,
  width = "768px",
  center,
  mb = "56px",
  eyebrow,
  eyebrowDotClass = "bg-[#577DE8]",
}: {
  title: string;
  paragraph: string;
  width?: string;
  center?: boolean;
  mb?: string;
  eyebrow?: string;
  eyebrowDotClass?: string;
}) => {
  return (
    <>
      <div
        className={`w-full ${center ? "mx-auto text-center" : ""}`}
        style={{ maxWidth: width, marginBottom: mb }}
        data-oid="d5t.jx."
      >
        {eyebrow ? (
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <span
              className={`inline-block h-1.5 w-1.5 rounded-full ${eyebrowDotClass}`}
            />
            {eyebrow}
          </div>
        ) : null}
        <h2
          className="mb-4 text-balance text-3xl font-bold tracking-[-0.02em] !leading-tight text-foreground sm:text-4xl md:text-5xl"
          data-oid="p73y8-g"
        >
          {title}
        </h2>
        <p
          className="text-base !leading-relaxed text-muted-foreground md:text-lg"
          data-oid="74dylmf"
        >
          {paragraph}
        </p>
      </div>
    </>
  );
};

export default SectionTitle;
