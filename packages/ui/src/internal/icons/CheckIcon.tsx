import type { SVGProps } from "react";

interface CheckIconProps extends SVGProps<SVGSVGElement> {
  indeterminate?: boolean;
}

export function CheckIcon({ indeterminate = false, ...props }: CheckIconProps) {
  return (
    <svg
      {...props}
      aria-hidden="true"
      fill="none"
      focusable="false"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={indeterminate ? "M3.5 8h9" : "m3.5 8 2.8 2.8 6.2-6.2"}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
