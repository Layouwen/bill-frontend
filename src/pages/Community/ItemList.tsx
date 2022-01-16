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
    <div className={styles.wrapper}>
      {data &&
        !!data.length &&
        data.map((i) => (
          <div key={i.id} className={styles.item}>
            <div className={styles.head}>
              <div
                className={classNames(
                  styles.img,
                  'rounded-full overflow-hidden',
                )}
              >
                {/*<img className="w-full" src={i.avatar} alt="" />*/}
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
                      <img src={img} alt="" />
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
        ))}
    </div>
  );
};
export default ItemList;
