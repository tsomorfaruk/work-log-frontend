import { SVGProps } from "react";

export const RotaButtonIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="134"
      height="56"
      viewBox="0 0 134 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* <rect x="0.5" y="0.5" width="133" height="55" rx="11.5" fill="#F2FCFF" /> */}
      <rect
        x="0.5"
        y="0.5"
        width="133"
        height="55"
        rx="11.5"
        fill="currentColor"
      />
      <rect
        x="0.5"
        y="0.5"
        width="133"
        height="55"
        rx="11.5"
        stroke="#006972"
        stroke-dasharray="10 10"
      />
      <circle cx="67" cy="28" r="8.25" stroke="#007B99" stroke-width="1.5" />
      <path
        d="M67 31L67 25"
        stroke="#007B99"
        stroke-width="1.5"
        stroke-linecap="square"
      />
      <path
        d="M70 28L64 28"
        stroke="#007B99"
        stroke-width="1.5"
        stroke-linecap="square"
      />
    </svg>
  );
};
