import { SVGProps } from "react";

export function SupabaseFull({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 24" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <text y="20" fontSize="20" fontFamily="system-ui, sans-serif" fontWeight="600">supabase</text>
    </svg>
  );
}
