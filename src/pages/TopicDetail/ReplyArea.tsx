import classNames from 'classnames';
import { FC, useState } from 'react';
import styles from './ReplyArea.module.scss';

const ReplyArea: FC = () => {
  const [data] = useState([
    {
      id: 1,
      content: 'test评论1',
      name: '吴彦祖',
      avatar:
        'https://bill-rearend.oss-cn-guangzhou.aliyuncs.com/static/defulatAvatar.jpg',
      likeCount: 1,
      isLike: true,
    },
    {
      id: 2,
      content: 'test评论1',
      name: '吴彦祖',
      avatar:
        'https://bill-rearend.oss-cn-guangzhou.aliyuncs.com/static/defulatAvatar.jpg',
      likeCount: 1,
      isLike: true,
    },
    {
      id: 3,
      content: 'test评论1',
      name: '吴彦祖',
      avatar:
        'https://bill-rearend.oss-cn-guangzhou.aliyuncs.com/static/defulatAvatar.jpg',
      likeCount: 1,
      isLike: true,
    },
  ]);
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
        {data.length > 0 ? (
          data.map((item) => (
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
                    src={item.avatar}
                    alt={item.name}
                  />
                </div>
                <div className={classNames(styles.right, 'flex-grow')}>
                  <div>{item.name}</div>
                  <div className={styles.content}>{item.content}</div>
                  <div className={styles.time}>
                    2020-08-20 20:58{' '}
                    <span className={classNames(styles.report, 'text-center')}>
                      6回复
                    </span>
                  </div>
                </div>
              </main>
              <footer>
                <div className={styles['reply-box']}>12312</div>
              </footer>
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
