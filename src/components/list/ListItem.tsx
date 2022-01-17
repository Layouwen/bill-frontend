import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import { Icon } from '@/components';

const classPrefix = `bw-list-item`;

export type ListItemProps = {
  children?: ReactNode;
  extra?: ReactNode;
  disabled?: boolean;
  clickable?: boolean;
  arrow?: boolean | ReactNode;
  onClick?: (e: React.MouseEvent) => void;
};

export const ListItem: FC<ListItemProps> = (props) => {
  const clickable = props.clickable ?? !!props.onClick;
  const arrow = props.arrow === undefined ? clickable : props.arrow;

  const content = (
    <div className={`${classPrefix}-content`}>
      <div className={`${classPrefix}-content-main`}>{props.children}</div>
      {props.extra && (
        <div className={`${classPrefix}-content-extra`}>{props.extra}</div>
      )}
      {arrow && (
        <div className={`${classPrefix}-content-arrow`}>
          {arrow === true ? <Icon name="right" /> : arrow}
        </div>
      )}
    </div>
  );

  return React.createElement(
    clickable ? 'a' : 'div',
    {
      className: classNames(
        `${classPrefix}`,
        clickable ? ['adm-plain-anchor'] : [],
        props.disabled && `${classPrefix}-disabled`,
      ),
      onClick: props.onClick,
    },
    content,
  );
};
