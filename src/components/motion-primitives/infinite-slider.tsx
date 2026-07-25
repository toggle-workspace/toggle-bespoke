import { cn } from "@/lib/utils";
import { CSSProperties } from "react";

interface InfiniteSliderProps {
  children: React.ReactNode;
  speed?: number;
  speedOnHover?: number;
  gap?: number;
  reverse?: boolean;
  className?: string;
}

export function InfiniteSlider({
  children,
  speed = 60,
  speedOnHover,
  gap = 16,
  reverse = false,
  className,
}: InfiniteSliderProps) {
  return (
    <div
      className={cn("overflow-hidden", className)}
      style={
        {
          "--scroll-speed": `${speed}s`,
          "--scroll-speed-hover": speedOnHover ? `${speedOnHover}s` : undefined,
        } as CSSProperties
      }
    >
      <div
        className={cn("flex w-max animate-infinite-scroll", speedOnHover && "[&:hover>*]:pause")}
        style={{ gap, animationDirection: reverse ? "reverse" : "normal" }}
      >
        {[0, 1].map((i) => (
          <div key={i} className="flex shrink-0" style={{ gap }} aria-hidden={i === 1}>
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
