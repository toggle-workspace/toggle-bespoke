import { SVGProps } from "react";

export function Spotify(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 80 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12" cy="12" r="10" />
      <text x="26" y="18" fontSize="16" fontFamily="system-ui, sans-serif" fontWeight="600" fill="currentColor">Spotify</text>
    </svg>
  );
}
