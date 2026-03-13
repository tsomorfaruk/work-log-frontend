import clsx from "clsx";
import { DetailedHTMLProps, InputHTMLAttributes, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

type PropTypes = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export default function Input(props: PropTypes) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = props.type === "password";

  const inputClassName = clsx(
    "w-full px-4 py-4 placeholder:text-xs rounded-lg border border-[#C0C8CC] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all",
    isPassword && "pr-12",
    props.className,
  );

  if (!isPassword) {
    return <input className={inputClassName} {...props} />;
  }

  return (
    <div className="relative w-full">
      <input
        {...props}
        type={showPassword ? "text" : "password"}
        className={inputClassName}
      />
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
        tabIndex={-1}
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
      </button>
    </div>
  );
}
