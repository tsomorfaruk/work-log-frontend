import { cn, Utils } from "@/lib/utils";
import { DefaultProps } from "@/types";
import { CSSProperties, useEffect } from "react";
import { createPortal } from "react-dom";

interface PropTypes extends DefaultProps {
  style?: CSSProperties;
  isOpen: boolean;
  whereToRender?: string;
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  transform?: string;
}
export default function RenderTo({
  children,
  style = {},
  className = "",
  isOpen = false,
  top,
  left,
  bottom,
  right,
  transform,
  whereToRender = "body",
}: PropTypes) {
  const selectorValid = Utils.isValidSelector(whereToRender);
  const selector = selectorValid ? whereToRender : "body";
  const validPositions = Utils.getValidParams({
    top,
    bottom,
    transform,
    right,
    left,
  });
  if (!whereToRender) {
    console.error("WhereToRender is Empty, pass selector");
  }

  if (!selectorValid) {
    console.error("Selector is Invalid");
  }

  const portal = (
    <div
      style={{
        position: "absolute",
        zIndex: 9999,
        ...style,
        ...validPositions,
      }}
      className={`${cn(isOpen ? "opacity-100" : "opacity-0", className)}`}
    >
      {children}
    </div>
  );

  useEffect(() => {
    document.querySelector(selector)?.classList.add("relative");
  }, [selector]);

  return (
    <>
      {isOpen
        ? createPortal(
            portal,
            document.querySelector(selector) as Element | DocumentFragment
          )
        : null}
    </>
  );
}
