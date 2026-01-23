import clsx from "clsx";
import { ReactNode } from "react";

type BadgeVariants = "success" | "error" | "primary";

interface Props {
  variant: BadgeVariants;
  children?: ReactNode;
  containerClassname?: string;
  onClick?: () => void;
}

const Badge = ({ variant, children, containerClassname, onClick }: Props) => {
  return (
    <div
      className={clsx(
        "px-4 py-1.5 rounded-xl text-xs lg:text-sm leading-none text-center font-medium",
        {
          "bg-[#86EFAC] text-[#166534]": variant === "success",
          "bg-[#FFDAD6] text-[#93000A]": variant === "error",
          "bg-[#9DF0FB] text-[#004F56]": variant === "primary",
          "cursor-pointer": !!onClick,
        },
        containerClassname,
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Badge;
