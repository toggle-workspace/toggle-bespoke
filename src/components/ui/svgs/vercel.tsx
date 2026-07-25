import { SVGProps } from "react";

export function VercelFull(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 80 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <polygon points="12,2 22,20 2,20" />
      <text x="26" y="20" fontSize="18" fontFamily="system-ui, sans-serif" fontWeight="600">Vercel</text>
    </svg>
  );
}
