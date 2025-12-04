import { DefaultProps } from '@/types';

export default function OverFlow({ children }: DefaultProps) {
  return (
    <div className="over-flow-container mx-auto overflow-auto">{children}</div>
  );
}
