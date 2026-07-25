const LINES_MASK = {
  centered: "/marketing/hero-bg-lines-mask.svg",
  "bottom-right": "/marketing/page-header-bg-lines-mask.svg",
};

export function GradientBackground({
  lines = "centered",
}: {
  lines?: keyof typeof LINES_MASK;
}) {
  return (
    <>
      <img
        src="/marketing/hero-bg-gradient.svg"
        alt=""
        className="absolute inset-0 -z-20 size-full object-fill"
      />
      <img
        src={LINES_MASK[lines]}
        alt=""
        className="absolute inset-0 -z-20 size-full object-fill"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-white from-10% to-transparent to-70%" />
    </>
  );
}
