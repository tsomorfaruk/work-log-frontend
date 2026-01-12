import clsx from "clsx";
import { ReactNode } from "react";

type BadgeVariants = "success" | "error";

interface Props {
  variant: BadgeVariants;
  children?: ReactNode;
}

const Badge = ({ variant, children }: Props) => {
  return (
    <div
      className={clsx(
        "px-4 py-1.5 rounded-xl text-xs lg:text-sm leading-none text-center font-medium",
        {
          "bg-[#86EFAC] text-[#166534]": variant === "success",
          "bg-[#FFDAD6] text-[#93000A]": variant === "error",
        }
      )}
    >
      {children}
    </div>
  );
};

export default Badge;
