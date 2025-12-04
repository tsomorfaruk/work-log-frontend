import { DefaultProps } from '@/types';

export default function Section({ children, className }: DefaultProps) {
  return <div className={`-mt-1 w-full ${className || ''}`}>{children}</div>;
}
