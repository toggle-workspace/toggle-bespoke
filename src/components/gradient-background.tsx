const LINES_MASK = {
  centered: '/marketing/hero-bg-lines-mask.svg',
  'bottom-right': '/marketing/page-header-bg-lines-mask.svg',
}

export function GradientBackground({ lines = 'centered' }: { lines?: keyof typeof LINES_MASK }) {
  return (
    <>
      {/* These decorative assets are baked light-theme gradients; swapped for a CSS glow in dark mode */}
      <img
        src="/marketing/hero-bg-gradient.svg"
        alt=""
        className="absolute inset-0 -z-20 size-full object-fill dark:hidden"
      />
      <img
        src={LINES_MASK[lines]}
        alt=""
        className="absolute inset-0 -z-20 size-full object-fill dark:hidden"
      />
      <div className="absolute inset-0 -z-20 hidden bg-[radial-gradient(ellipse_at_bottom,color-mix(in_oklch,var(--primary),transparent_85%),transparent_60%)] dark:block" />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-background from-10% to-transparent to-70%" />
    </>
  )
}
