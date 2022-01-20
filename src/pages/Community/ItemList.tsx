import { FC } from 'react';
import classNames from 'classnames';
import { Topic } from '@/api';
import { Icon } from '@/components';
import { showDate } from '@/utils/time';
import styles from './ItemList.module.scss';

type ItemListProps = {
  data?: Topic[];
};

const ItemList: FC<ItemListProps> = ({ data }) => {
  return (
    <div
      className={classNames(styles.wrapper, 'flex-grow relative overflow-auto')}
    >
      {data && !!data.length ? (
        data.map((i) => (
          <div key={i.id} className={styles.item}>
            <div className={styles.head}>
              <div
                className={classNames(
                  styles.img,
                  'rounded-full overflow-hidden',
                )}
              >
                <img
                  className="w-full h-full object-cover"
                  src={i.avatar}
                  alt={i.name}
                />
              </div>
              <div className="flex-grow">
                <div className={styles.name}>{i.name}</div>
                <div className={styles.time}>{showDate(i.createdAt)}</div>
              </div>
            </div>
            <main>
              <div className={styles.content}>{i.content}</div>
              <div className={classNames(styles.imgs, 'flex flex-wrap')}>
                {i.images &&
                  i.images.map((img, index) => (
                    <div
                      key={img + index}
                      className={classNames(
                        styles.img,
                        'relative h-0 overflow-hidden',
                      )}
                    >
                      <img
                        className="w-full h-full object-cover"
                        src={img + '?x-oss-process=image/resize,h_90'}
                        alt=""
                      />
                    </div>
                  ))}
              </div>
              <footer className="flex">
                <span>
                  <Icon name="share" />
                  {/*{i.shareCount}*/}
                </span>
                <span>
                  <Icon name="comment" />
                  {/*{i.commentCount}*/}
                </span>
                <span>
                  <Icon name="like" />
                  {/*{i.likeCount}*/}
                </span>
              </footer>
            </main>
          </div>
        ))
      ) : (
        <div
          className={classNames(
            styles['not-data-wrapper'],
            'absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-center',
          )}
        >
          <Icon name="not-data" block className={styles['not-data']} />
          <span className={styles['not-data-text']}>暂无数据</span>
        </div>
      )}
    </div>
  );
};
export default ItemList;
