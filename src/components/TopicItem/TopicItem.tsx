import { showDate } from '@/utils/time';
import { Icon } from 'bw-mobile';
import classNames from 'classnames';
import { FC, MouseEvent } from 'react';
import styles from './TopicItem.module.scss';

type TopicItemProps = {
  data: {
    id: number;
    content: string;
    images: string[];
    user: {
      id: number;
      avatar: string;
      name: string;
    };
    isLike: boolean;
    shareCount: number;
    commentCount: number;
    likeCount: number;
    createdAt: string;
    updatedAt: string;
  };
  onClick?: (id: number) => void;
  onImg?: (index: number, src: string) => void;
  onLike?: (id: number) => void;
  onShare?: (id: number) => void;
  onComment?: (id: number) => void;
  onAvatar?: (id: number) => void;
};

export const TopicItem: FC<TopicItemProps> = ({
  data,
  onClick,
  onImg,
  onLike,
  onShare,
  onComment,
  onAvatar,
}) => {
  function stopPropagation<T extends (...p: any[]) => void>(
    e: MouseEvent,
    fn: T,
    ...params: any[]
  ) {
    e.stopPropagation();
    fn?.(...params);
  }

  return (
    <div className={styles.item} onClick={() => onClick?.(data.id)}>
      <div className={styles.head}>
        <div
          className={classNames(styles.img, 'rounded-full overflow-hidden')}
          onClick={(e) => stopPropagation(e, onAvatar!, data.user.id)}
        >
          <img
            className="w-full h-full object-cover"
            src={data.user.avatar}
            alt={data.user.name || '默认名字'}
          />
        </div>
        <div className="flex-grow">
          <div className={styles.name}>{data.user.name || '默认名字'}</div>
          <div className={styles.time}>{showDate(data.createdAt)}</div>
        </div>
      </div>
      <main>
        <div className={styles.content}>{data.content}</div>
        <div className={classNames(styles.imgs, 'flex flex-wrap')}>
          {data.images.length > 0 &&
            data.images.map((img, index) => (
              <div
                onClick={(e) => stopPropagation(e, onImg!, index, img)}
                key={img + index}
                className={classNames(
                  styles.img,
                  'relative h-0 overflow-hidden',
                )}
              >
                <img className="w-full h-full object-cover" src={img} alt="" />
              </div>
            ))}
        </div>
        <footer className="flex">
          <span onClick={(e) => stopPropagation(e, onShare!, data.id)}>
            <Icon name="share" />
            {data.shareCount || 0}
          </span>
          <span onClick={(e) => stopPropagation(e, onComment!, data.id)}>
            <Icon name="comment" />
            {data.commentCount || 0}
          </span>
          <span onClick={(e) => stopPropagation(e, onLike!, data.id)}>
            <Icon name={data.isLike ? 'like-fill' : 'like'} />
            {data.likeCount || 0}
          </span>
        </footer>
      </main>
    </div>
  );
};
