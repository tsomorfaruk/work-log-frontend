import clsx from "clsx";
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export type ButtonVariants =
  | "default"
  | "primary"
  | "secondary"
  | "tertiary"
  | "danger"
  | "success"
  | "neutral";

interface Props extends DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> {
  variant?: ButtonVariants;
  isLoading?: boolean;
  isDisabled?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

const Button = (props: Props) => {
  const {
    variant = "default",
    isLoading = false,
    isDisabled = false,
    children,
    className,
    icon,
    iconPosition = "left",
    ...rest
  } = props;

  const disabled = isDisabled || isLoading;

  return (
    <button
      {...rest}
      disabled={disabled}
      className={clsx(
        "flex items-center justify-center gap-2 hover:opacity-90 transition-all duration-150 min-w-max",
        {
          "cursor-pointer": !disabled,
          "!cursor-not-allowed opacity-60": disabled,
          " px-4 py-2 text-sm lg:text-base rounded-xl": variant !== "default",
          "bg-[#007B99] text-white": variant === "primary",
          "bg-[#9DF0FB] text-[#004F56]": variant === "secondary",
          "bg-[#FFDAD6] text-[#93000A]": variant === "danger",
          "bg-[#86EFAC] text-[#166534]": variant === "success",
          "bg-[#CFE6F1] text-[#354A53]": variant === "neutral",
        },
        className,
      )}
    >
      <div className="flex gap-1 items-center">
        {icon && iconPosition === "left" && icon}
        {children}
        {icon && iconPosition === "right" && icon}
      </div>
      {isLoading && (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        </>
      )}
    </button>
  );
};

export default Button;
