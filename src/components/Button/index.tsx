import { FC, MouseEventHandler } from 'react';
import classNames from 'classnames';
import './index.scss';

interface ButtonProps {
  onClick?: MouseEventHandler;
}

const Button: FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button className={classNames('bw-bill-button')} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
