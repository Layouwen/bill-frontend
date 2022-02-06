import { FC, useState } from 'react';
import classNames from 'classnames';
import { Topic, topicLike } from '@/api';
import { Icon, ImagePreview } from '@/components';
import { showDate } from '@/utils/time';
import { useNavigate } from 'react-router-dom';
import styles from './ItemList.module.scss';

type ItemListProps = {
  data?: Topic[];
  fetch: () => void;
};

const ItemList: FC<ItemListProps> = ({ data, fetch }) => {
  const navigate = useNavigate();
  const handleLike = async (topicId: number) => {
    await topicLike(topicId);
    setTimeout(async () => {
      await fetch();
    }, 100);
  };
  const [imgVisible, setImgVisible] = useState(false);
  const [imgSrc, setImgSrc] = useState('');

  return (
    <div
      className={classNames(styles.wrapper, 'flex-grow relative overflow-auto')}
    >
      <ImagePreview
        visible={imgVisible}
        image={imgSrc}
        onClose={() => setImgVisible(false)}
      />
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
                  src={i.user.avatar}
                  alt={i.user.name}
                />
              </div>
              <div className="flex-grow">
                <div className={styles.name}>{i.user.name}</div>
                <div className={styles.time}>{showDate(i.createdAt)}</div>
              </div>
            </div>
            <main>
              <div className={styles.content}>{i.content}</div>
              <div className={classNames(styles.imgs, 'flex flex-wrap')}>
                {i.images &&
                  i.images.map((img, index) => (
                    <div
                      onClick={() => {
                        setImgSrc(img);
                        setImgVisible(true);
                      }}
                      key={img + index}
                      className={classNames(
                        styles.img,
                        'relative h-0 overflow-hidden',
                      )}
                    >
                      <img
                        className="w-full h-full object-cover"
                        src={img}
                        alt=""
                      />
                    </div>
                  ))}
              </div>
              <footer className="flex">
                <span>
                  <Icon name="share" />
                  {i.shareCount}
                </span>
                <span onClick={() => navigate(`/topic-detail/${i.id}`)}>
                  <Icon name="comment" />
                  {i.commentCount}
                </span>
                <span onClick={() => handleLike(i.id)}>
                  <Icon name={i.isLike ? 'like-fill' : 'like'} />
                  {i.likeCount}
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
