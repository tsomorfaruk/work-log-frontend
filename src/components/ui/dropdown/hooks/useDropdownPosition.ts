import { useLayoutEffect, useState, RefObject } from "react";

export const useDropdownPosition = (
  containerRef: RefObject<HTMLElement>,
  preferred: "top" | "bottom" = "bottom",
  dropdownHeight = 224 // px, default max-h-56
) => {
  const [position, setPosition] = useState<"top" | "bottom">(preferred);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    // if user prefers top OR space below is insufficient
    if (
      preferred === "top" ||
      (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight)
    ) {
      setPosition("top");
    } else {
      setPosition("bottom");
    }
  }, [containerRef, preferred, dropdownHeight]);

  return position;
};
