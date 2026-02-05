import clsx from "clsx";
import { DetailedHTMLProps, TextareaHTMLAttributes } from "react";

type PropTypes = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

export default function Textarea(props: PropTypes) {
  return (
    <textarea
      className={clsx(
        "w-full px-4 py-4 placeholder:text-xs rounded-lg border border-[#C0C8CC] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all",
        props.className,
      )}
      {...props}
    />
  );
}
