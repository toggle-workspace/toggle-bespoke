import { cn } from "@/lib/utils";

interface ProgressiveBlurProps {
  direction?: "left" | "right" | "top" | "bottom";
  blurIntensity?: number;
  className?: string;
}

export function ProgressiveBlur({
  direction = "left",
  blurIntensity = 1,
  className,
}: ProgressiveBlurProps) {
  const gradientMap = {
    left: "to right",
    right: "to left",
    top: "to bottom",
    bottom: "to top",
  };

  const steps = 8;
  const masks = Array.from({ length: steps }, (_, i) => {
    const stop = ((i / (steps - 1)) * 100).toFixed(1);
    const blur = (blurIntensity * (i / (steps - 1)) * 8).toFixed(1);
    return `blur(${blur}px) at ${stop}%`;
  });

  return (
    <div
      className={cn("pointer-events-none", className)}
      style={{
        // ponytail: backdrop-filter mask approach — upgrade to SVG feTurbulence if softer gradient needed
        WebkitMaskImage: `linear-gradient(${gradientMap[direction]}, black 0%, transparent 100%)`,
        maskImage: `linear-gradient(${gradientMap[direction]}, black 0%, transparent 100%)`,
        backdropFilter: `blur(${blurIntensity * 4}px)`,
      }}
    />
  );
}
