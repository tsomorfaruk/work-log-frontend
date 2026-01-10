import toast from "react-hot-toast";

export type ToastTypes = "error" | "success";

export const DEFAULT_ERROR_MESSAGE = "Something went wrong";

export const onShowToastMessages = ({
  message,
  data,
  type,
  shouldExtractFirst = false,
}: {
  message: string;
  type: ToastTypes;
  data?: unknown;
  shouldExtractFirst?: boolean;
}) => {
  let finalMessage = message;

  if (shouldExtractFirst && data) {
    const extracted = extractFirstErrorMessage(data);
    if (extracted) {
      finalMessage = extracted;
    }
  }

  if (type === "success") toast.success(finalMessage);
  else toast.error(finalMessage);
};

export const extractFirstErrorMessage = (input: unknown): string => {
  if (!input) return DEFAULT_ERROR_MESSAGE;

  // if already a string
  if (typeof input === "string") return input;

  // if array → find first string recursively
  if (Array.isArray(input)) {
    for (const item of input) {
      const result = extractFirstErrorMessage(item);
      if (result) return result;
    }
    return DEFAULT_ERROR_MESSAGE;
  }

  // if object → take first key and recurse
  if (typeof input === "object") {
    const firstValue = Object.values(input)[0];
    return extractFirstErrorMessage(firstValue);
  }

  return DEFAULT_ERROR_MESSAGE;
};
