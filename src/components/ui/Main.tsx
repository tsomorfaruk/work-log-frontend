import { DefaultProps } from '@/types';

export default function Main({ children }: DefaultProps) {
  return <div className="container mx-auto min-h-[80vh]">{children}</div>;
}
