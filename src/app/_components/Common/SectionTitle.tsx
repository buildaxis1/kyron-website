const SectionTitle = ({
  title,
  paragraph,
  width = "768px",
  center,
  mb = "100px",
}: {
  title: string;
  paragraph: string;
  width?: string;
  center?: boolean;
  mb?: string;
}) => {
  return (
    <>
      <div
        className={`w-full ${center ? "mx-auto text-center" : ""}`}
        style={{ maxWidth: width, marginBottom: mb }}
        data-oid="d5t.jx."
      >
        <h2
          className="mb-4 text-3xl font-bold !leading-tight text-foreground sm:text-4xl md:text-[45px]"
          data-oid="p73y8-g"
        >
          {title}
        </h2>
        <p
          className="text-base !leading-relaxed text-foreground md:text-lg"
          data-oid="74dylmf"
        >
          {paragraph}
        </p>
      </div>
    </>
  );
};

export default SectionTitle;
