import { DefaultProps } from '@/types';
import './Popup.css';

interface PropTypes extends DefaultProps {
  title?: string;
}

export default function Popup({
  children,
  className,
  title = 'This is a tooltip popup',
}: PropTypes) {
  return (
    <div className={`popup-container ${className}`}>
      {children}
      <div className="popup">{title}</div>
    </div>
  );
}
