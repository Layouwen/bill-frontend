import { CSSProperties, FC, MouseEventHandler } from 'react';
import classNames from 'classnames';
import './index.scss';

const classPrefix = 'bw-button';

type ButtonProps = {
  onClick?: MouseEventHandler;
  style?: CSSProperties;
  size?: 'medium' | 'full';
  block?: boolean;
  className?: string;
};

const defaultProps = {
  block: false,
  size: 'medium',
};

const Button: FC<ButtonProps> = (p) => {
  const { children, onClick, style, block, size, className } = Object.assign(
    { ...defaultProps },
    p,
  );

  return (
    <button
      className={classNames(classPrefix, className, {
        [`${classPrefix}-block`]: block,
        [`${classPrefix}-middle`]: size === 'medium',
        [`${classPrefix}-full`]: size === 'full',
      })}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
