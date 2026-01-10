import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogClose,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEscapeKey } from "@/hooks/useEscapeKey"; // your hook

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  closeOnOutsideClick?: boolean; // default false
  closeOnEscape?: boolean; // default true
}

const sizeClasses: Record<string, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
};

const Modal = ({
  open,
  onOpenChange,
  title,
  children,
  size = "md",
  closeOnOutsideClick = false,
  closeOnEscape = true,
}: ModalProps) => {
  // Escape key handler
  useEscapeKey(() => {
    if (closeOnEscape && open) onOpenChange(false);
  });

  // Outside click handler (overlay click)
  const handleOverlayClick = () => {
    if (closeOnOutsideClick) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* Overlay */}
      <DialogOverlay
        onClick={handleOverlayClick}
        className="fixed inset-0 z-40 bg-white/10 data-[state=open]:animate-in data-[state=closed]:animate-out"
      />

      {/* Content */}
      <DialogContent
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full gap-4 border border-gray-200 bg-white p-6 shadow-lg translate-x-[-50%] translate-y-[-50%] sm:rounded-lg dark:border-gray-800 dark:bg-gray-950",
          sizeClasses[size]
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          {/* <DialogClose className="rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:ring-offset-gray-950 dark:focus:ring-gray-300">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose> */}
        </div>

        {/* Border below header */}
        <div className="border-b border-gray-200 dark:border-gray-700 -mx-6" />

        {/* Body */}
        <div className="pt-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
