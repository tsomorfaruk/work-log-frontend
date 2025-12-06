import { DefaultProps } from "@/types";

export default function Container({ children, className }: DefaultProps) {
  return <div className="container mx-auto">{children}</div>;
}
