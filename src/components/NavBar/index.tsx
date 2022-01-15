import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import './index.scss';

const classPrefix = `bw-nav-bar`;

export type NavBarProps = {
  back?: string | null;
  backArrow?: boolean | ReactNode;
  left?: ReactNode;
  right?: ReactNode;
  onBack?: () => void;
  className?: string;
};

const defaultProps = {
  back: '',
  backArrow: true,
};

const NavBar: FC<NavBarProps> = (p) => {
  const props = Object.assign(defaultProps, p);
  const { back, backArrow, className } = props;

  return (
    <div className={classNames(classPrefix, className)}>
      <div className={`${classPrefix}-left`} role="button">
        {back !== null && (
          <div className={`${classPrefix}-back`} onClick={props.onBack}>
            {backArrow && (
              <span className={`${classPrefix}-back-arrow`}>
                {/* TODO: back icon */}
                {backArrow === true ? 'back' : backArrow}
              </span>
            )}
            <span aria-hidden="true">{back}</span>
          </div>
        )}
        {props.left}
      </div>
      <div className={`${classPrefix}-title`}>{props.children}</div>
      <div className={`${classPrefix}-right`}>{props.right}</div>
    </div>
  );
};

export default NavBar;
