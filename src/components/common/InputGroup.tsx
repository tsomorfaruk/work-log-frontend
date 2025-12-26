import { cn } from "@/lib/utils";

import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from "react";

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type PropTypes = InputProps & {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  inputWrapper?: string;
};

export default function InputGroup(props: PropTypes) {
  const {
    startIcon,
    endIcon,
    inputWrapper = "",
    className,
    ...restProps
  } = props;
  return (
    <div
      className={`${cn(
        "flex items-center border border-gray-400 placeholder:text-xs overflow-clip px-2 py-1 rounded-lg focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 outline-none transition-all",
        inputWrapper
      )} `}
    >
      {startIcon && startIcon}
      <input
        className={`${cn(
          "focus:outline-none border-0 bg-inherit text-inherit  focus:border-0 h-full w-full",
          className
        )}`}
        {...restProps}
      />
      {endIcon && endIcon}
    </div>
  );
}
