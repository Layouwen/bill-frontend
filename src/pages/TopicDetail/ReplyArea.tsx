import { showDate } from '@/utils/time';
import classNames from 'classnames';
import { FC } from 'react';
import styles from './ReplyArea.module.scss';

type ReplyProps = {
  comments: any;
};

const ReplyArea: FC<ReplyProps> = ({ comments }) => {
  return (
    <div>
      <header
        className={classNames(
          styles.header,
          'flex items-center justify-between',
        )}
      >
        <span>全部评论</span>
        <div>按热度</div>
      </header>
      <div
        className={classNames(
          styles['list-wrapper'],
          'flex justify-center items-center flex-wrap',
        )}
      >
        {comments && comments.length > 0 ? (
          comments.map((item) => (
            <div
              className={classNames(styles.item, 'w-full relative')}
              key={item.id}
            >
              <main className="flex">
                <div
                  className={classNames(
                    styles.avatar,
                    'rounded-full overflow-hidden',
                  )}
                >
                  <img
                    className="w-full h-full object-cover"
                    src={item.user.avatar}
                    alt={item.user.name}
                  />
                </div>
                <div className={classNames(styles.right, 'flex-grow')}>
                  <div>{item.user.name}</div>
                  <div className={styles.content}>{item.content}</div>
                  <div className={styles.time}>
                    {showDate(item.createdAt)}
                    {/*<span className={classNames(styles.report, 'text-center')}>*/}
                    {/*  6回复*/}
                    {/*</span>*/}
                  </div>
                </div>
              </main>
              {/*<footer>*/}
              {/*  <div className={styles['reply-box']}>*/}
              {/*    <span className={styles.name}>A_憨憨_：</span>*/}
              {/*    哈哈哈*/}
              {/*  </div>*/}
              {/*</footer>*/}
            </div>
          ))
        ) : (
          <div className={styles.empty}>暂无评论，点击写评论</div>
        )}
      </div>
    </div>
  );
};

export default ReplyArea;
