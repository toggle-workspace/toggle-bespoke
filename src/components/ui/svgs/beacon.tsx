import { SVGProps } from "react";
export function Beacon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 80 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <text y="20" fontSize="18" fontFamily="system-ui, sans-serif" fontWeight="600">Beacon</text>
    </svg>
  );
}
