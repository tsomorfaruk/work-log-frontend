import { SVGProps } from "react";

export const AlertIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M23.208 35H16.792C9.07465 35 5.21596 35 3.79398 32.4898C2.372 29.9798 4.34565 26.6523 8.29295 19.9975L11.501 14.5889C15.2927 8.1963 17.1885 5 20 5C22.8115 5 24.7074 8.19628 28.499 14.5889L31.7072 19.9975C35.6544 26.6523 37.628 29.9798 36.206 32.4898C34.784 35 30.9254 35 23.208 35Z"
        stroke="#BA1A1A"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M20 15V22.5"
        stroke="#BA1A1A"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M20 28.3203V28.337"
        stroke="#BA1A1A"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
