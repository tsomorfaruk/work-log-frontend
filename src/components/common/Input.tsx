import clsx from "clsx";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

type PropTypes = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export default function Input(props: PropTypes) {
  return (
    <input
      className={clsx(
        "w-full px-4 py-4 placeholder:text-xs rounded-lg border border-[#C0C8CC] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all",
        props.className,
      )}
      {...props}
    />
  );
}
