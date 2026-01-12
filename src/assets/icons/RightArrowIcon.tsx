import { SVGProps } from "react";

export const RightArrowIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.2254 4.55806C11.4695 4.31398 11.8652 4.31398 12.1093 4.55806L17.1093 9.55806C17.3533 9.80214 17.3533 10.1979 17.1093 10.4419L12.1093 15.4419C11.8652 15.686 11.4695 15.686 11.2254 15.4419C10.9813 15.1979 10.9813 14.8021 11.2254 14.5581L15.1584 10.625H3.33398C2.98881 10.625 2.70898 10.3452 2.70898 10C2.70898 9.65482 2.98881 9.375 3.33398 9.375H15.1584L11.2254 5.44194C10.9813 5.19786 10.9813 4.80214 11.2254 4.55806Z"
        fill="black"
      />
    </svg>
  );
};
