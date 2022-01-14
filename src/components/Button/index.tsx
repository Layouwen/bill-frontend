import { CSSProperties, FC, MouseEventHandler } from 'react';
import classNames from 'classnames';
import './index.scss';

type ButtonProps = {
  onClick?: MouseEventHandler;
  style?: CSSProperties;
};

const Button: FC<ButtonProps> = ({ children, onClick, style }) => {
  return (
    <button
      className={classNames('bw-bill-button')}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
