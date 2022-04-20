import classNames from 'classnames';
import { CSSProperties, FC } from 'react';
import './index.scss';

const classPrefix = 'bwm-icon';

type IconProps = {
  className?: string;
  name: string;
  block?: boolean;
  style?: CSSProperties;
};

const defaultProps = {
  block: false,
};

const Icon: FC<IconProps> = (p) => {
  const { name, className, block, style } = Object.assign(
    { ...defaultProps },
    p,
  );
  return (
    <svg
      className={classNames('icon', classPrefix, className, {
        [`${classPrefix}-block`]: block,
      })}
      style={style}
      aria-hidden="true"
    >
      <use xlinkHref={`#icon-${name}`} />
    </svg>
  );
};
export default Icon;
