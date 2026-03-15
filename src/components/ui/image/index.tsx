import * as React from "react";
import { cn } from "@/lib/utils";

const AVATAR_COLORS = [
  "bg-[#F44336]",
  "bg-[#E91E63]",
  "bg-[#9C27B0]",
  "bg-[#673AB7]",
  "bg-[#3F51B5]",
  "bg-[#2196F3]",
  "bg-[#03A9F4]",
  "bg-[#00BCD4]",
  "bg-[#009688]",
  "bg-[#4CAF50]",
  "bg-[#8BC34A]",
  "bg-[#CDDC39]",
  "bg-[#FFC107]",
  "bg-[#FF9800]",
  "bg-[#FF5722]",
];

const getAvatarColor = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
};

const getInitials = (name: string) => {
  if (!name) return "";
  // const parts = name.trim().split(" ")
  // if (parts.length === 0) return ""
  // if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  // return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
  return name?.[0];
};

export interface ImageProps extends Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  "name"
> {
  fallback?: string;
  name?: string;
}

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, src, alt, name, fallback, ...props }, ref) => {
    const [isError, setIsError] = React.useState(false);

    const showAvatar = (isError || !src) && !!name;

    if (showAvatar) {
      const initials = getInitials(name!);
      const bgColor = getAvatarColor(name!);
      return (
        <div
          className={cn(
            "flex items-center justify-center text-white font-medium uppercase",
            bgColor,
            className,
          )}
          title={name}
        >
          {initials}
        </div>
      );
    }

    return (
      <img
        className={cn("object-cover", className)}
        src={src || fallback || "/images/dummy-user.png"}
        alt={alt || name}
        onError={() => setIsError(true)}
        ref={ref}
        {...props}
      />
    );
  },
);

Image.displayName = "Image";
