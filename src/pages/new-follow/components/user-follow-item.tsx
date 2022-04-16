import { stopPropagation } from '@/utils';
import { FC } from 'react';
import classNames from 'classnames';

interface UserFollowItem {
  avatar?: string;
  username: string;
  followTime: string;
  isFollow?: boolean;
  className?: string;
  onSubmit?: () => void;
  onClick?: () => void;
  onAvatar?: () => void;
}

const defaultProps = {
  avatar: '',
  isFollow: false,
};

const classPrefix = 'bw-user-follow-item';

export const UserFollowItem: FC<UserFollowItem> = (p) => {
  const props = Object.assign({ ...defaultProps }, p);
  return (
    <div
      className={classNames(classPrefix, props.className)}
      onClick={props.onClick}
    >
      <img onClick={props.onAvatar} src={props.avatar || ''} alt="头像" />
      <div className={`${classPrefix}-box`}>
        <span className={`${classPrefix}-box-username`}>{props.username}</span>
        <span className={`${classPrefix}-box-desc`}>
          {props.followTime} 开始关注你了
        </span>
      </div>
      <button
        onClick={(e) => stopPropagation(e, props.onSubmit)}
        className={classNames({
          follow: props.isFollow,
        })}
      >
        {props.isFollow ? '已关注' : '+关注'}
      </button>
    </div>
  );
};
