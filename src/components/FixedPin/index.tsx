import { CSSProperties, MouseEvent, FC } from 'react';
import './index.scss';

const classPrefix = 'bw-fixed-pin';

type FixedPinProps = {
  className?: string;
  style?: CSSProperties;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
};

const FixedPin: FC<FixedPinProps> = ({ children, onClick }) => {
  return (
    <div className={classPrefix} onClick={onClick}>
      {children}
    </div>
  );
};

export default FixedPin;
