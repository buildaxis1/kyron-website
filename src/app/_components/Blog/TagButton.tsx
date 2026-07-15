const TagButton = ({ href = "#0", text }: { href?: string; text: string }) => {
  return (
    <a
      href={href}
      className="bg-muted mb-3 mr-3 inline-flex items-center justify-center rounded-sm px-4 py-2 text-sm text-foreground duration-300 hover:bg-primary hover:text-white"
      data-oid="-e1.:jc"
    >
      {text}
    </a>
  );
};

export default TagButton;
