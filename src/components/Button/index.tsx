import { FC } from 'react';
import classNames from 'classnames';
import './index.scss';

const Button: FC = ({children}) => {
  return <button className={classNames('bw-bill-button')}>{children}</button>;
};

export default Button;
