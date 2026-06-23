type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  accentTitle?: string; // portion of title to render in gradient
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  accentTitle,
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div className={isCenter ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <div className={`inline-flex items-center gap-2 ${isCenter ? "mx-auto" : ""}`}>
          <span className="h-px w-6 bg-orange" />
          <p className="text-xs font-black uppercase tracking-[0.28em] text-orange">
            {eyebrow}
          </p>
          <span className="h-px w-6 bg-orange" />
        </div>
      ) : null}

      <h2 className="mt-4 text-4xl font-black tracking-tight text-navy md:text-5xl lg:text-[3.25rem] leading-[1.1] text-balance">
        {accentTitle ? (
          <>
            {title}{" "}
            <span className="gradient-text">{accentTitle}</span>
          </>
        ) : (
          title
        )}
      </h2>

      <div className={`section-divider mt-4 ${isCenter ? "" : "section-divider-left"}`} />

      {subtitle ? (
        <p className="mt-5 text-lg leading-8 text-muted text-balance">{subtitle}</p>
      ) : null}
    </div>
  );
}
