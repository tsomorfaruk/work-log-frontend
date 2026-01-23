import { SVGProps } from "react";

export const SunIcon = (props: SVGProps<SVGSVGElement>) => {
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
        d="M28.3334 19.9998C28.3334 24.6022 24.6024 28.3332 20 28.3332C15.3977 28.3332 11.6667 24.6022 11.6667 19.9998C11.6667 15.3975 15.3977 11.6665 20 11.6665C24.6024 11.6665 28.3334 15.3975 28.3334 19.9998Z"
        stroke="#007B99"
        stroke-width="3"
      />
      <path
        d="M19.9925 5H20.0075M19.9935 35H20.0085M30.598 9.39332H30.613M9.39015 30.6067H9.40512M9.39015 9.39412H9.40512M30.597 30.6075H30.612M34.985 20.001H35M5 20.001H5.01497"
        stroke="#007B99"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
