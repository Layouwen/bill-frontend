import classNames from 'classnames';
import { FC } from 'react';
import './index.scss';

const classPrefix = 'bw-icon';

type IconProps = {
  className?: string;
  name: string;
};

const Icon: FC<IconProps> = ({ name, className }) => {
  return (
    <svg
      className={classNames('icon', classPrefix, className)}
      aria-hidden="true"
    >
      <use xlinkHref={`#icon-${name}`} />
    </svg>
  );
};
export default Icon;
