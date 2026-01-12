import clsx from "clsx";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type ButtonVariants =
  | "default"
  | "primary"
  | "secondary"
  | "tertiary"
  | "danger";

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: ButtonVariants;
  isLoading?: boolean;
  isDisabled?: boolean;
}

const Button = (props: Props) => {
  const {
    variant = "default",
    isLoading = false,
    isDisabled = false,
    children,
    className,
    ...rest
  } = props;

  const disabled = isDisabled || isLoading;

  return (
    <button
      {...rest}
      disabled={disabled}
      className={clsx(
        "inline-flex items-center justify-center gap-2 hover:opacity-90 transition-all duration-150",
        {
          "cursor-pointer": !disabled,
          "cursor-not-allowed opacity-60": disabled,
          " px-4 py-2 text-sm lg:text-base rounded-xl": variant !== "default",
          "bg-[#007B99] text-white": variant === "primary",
          "bg-[#9DF0FB] text-[#004F56]": variant === "secondary",
          "bg-[#FFDAD6] text-[#93000A]": variant === "danger",
        },
        className
      )}
    >
      {children}
      {isLoading && (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        </>
      )}
    </button>
  );
};

export default Button;
