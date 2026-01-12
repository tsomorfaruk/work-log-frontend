import { X } from "lucide-react";
import { useEscapeKey } from "@/hooks/useEscapeKey"; // your hook
import { cn } from "@/lib/utils";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { ReactNode } from "react";
import Button from "@/components/ui/button";

interface ConfirmationModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  title?: ReactNode;
  description?: string;
  size?: "sm" | "md" | "lg" | "xl";
  closeOnOutsideClick?: boolean; // default false
  closeOnEscape?: boolean; // default true
  customFooter?: ReactNode;
  actions?: {
    hideCancel?: boolean;
    onDelete?: () => void;
    isDeleting?: boolean;
  };
}

const sizeClasses: Record<string, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-[60%]",
};

const ConfirmationModal = ({
  isOpen,
  setIsOpen,
  title,
  description,
  size = "lg",
  closeOnOutsideClick = false,
  closeOnEscape = true,
  actions,
}: ConfirmationModalProps) => {
  useEscapeKey(() => {
    if (closeOnEscape && isOpen) setIsOpen(false);
  });

  useLockBodyScroll(isOpen);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => closeOnOutsideClick && setIsOpen(false)}
        className="fixed inset-0 z-40 bg-black/50"
      />

      {/* Modal content */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* <div className="fixed inset-0 z-50 flex items-center justify-center p-4 max-h-[90%] top-1/2 transform -translate-y-1/2 overflow-auto"> */}
        <div
          className={cn(
            " max-h-[90%] overflow-auto relative w-full bg-white rounded-lg shadow-lg dark:bg-gray-950 dark:border-gray-800 border border-gray-200 p-6",
            sizeClasses[size]
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <h4 className="text-lg 2xl:text-xl leading-tight font-bold text-black">
              {title}
            </h4>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </div>

          {/* Full-width border */}
          {/* <div className="border-b border-gray-200 dark:border-gray-700 -mx-6" /> */}

          {/* Body */}
          <div className="my-6">
            {description && (
              <p className="text-xs 2xl:text-sm leading-tight text-black mt-2">
                {description}
              </p>
            )}
          </div>

          {actions && (
            <div className="flex gap-6 items-center justify-end">
              {/* {!actions?.hideCancel && (
                <Button
                  variant="secondary"
                  onClick={() => setIsOpen(false)}
                  className="!text-sm"
                >
                  Cancel
                </Button>
              )} */}
              {actions?.onDelete && (
                <Button
                  variant="danger"
                  onClick={() => actions?.onDelete?.()}
                  className="!text-sm"
                  isLoading={actions?.isDeleting}
                >
                  Delete
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ConfirmationModal;
