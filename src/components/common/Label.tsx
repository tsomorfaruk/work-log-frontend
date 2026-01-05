import clsx from "clsx";
import { DetailedHTMLProps, LabelHTMLAttributes } from "react";

interface PropTypes
  extends DetailedHTMLProps<
    LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {
  className?: string;
  isRequired?: boolean;
}

export default function Label(props: PropTypes) {
  const { isRequired, className, children } = props;
  return (
    <label {...props} className={clsx("text-sm font-medium block", className)}>
      {children} {isRequired && <span className="text-red-500">*</span>}
    </label>
  );
}
