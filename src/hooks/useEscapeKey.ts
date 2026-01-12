import { useEffect } from "react";

interface UseEscapeKeyOptions {
  /** Disable the escape handler */
  disabled?: boolean;
}

export const useEscapeKey = (
  handler: () => void,
  options?: UseEscapeKeyOptions
) => {
  const { disabled = false } = options ?? {};

  useEffect(() => {
    if (disabled) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handler();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handler, disabled]);
};
