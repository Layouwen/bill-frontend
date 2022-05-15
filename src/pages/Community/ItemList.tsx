import { FC, useCallback, useState } from 'react';
import classNames from 'classnames';
import { Topic, topicLike } from '@/api';
import { TopicItem } from '@/components';
import { useNavigate } from 'react-router-dom';
import styles from './ItemList.module.scss';
import { ImagePreview, Icon } from 'bw-mobile';

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

  const toDetail = useCallback((id: number) => {
    navigate(`/topic-detail/${id}`);
  }, []);

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
          <TopicItem
            key={i.id}
            data={i}
            onClick={(id) => toDetail(id)}
            onComment={(id) => toDetail(id)}
            onShare={() => console.log('share')}
            onLike={() => handleLike(i.id)}
            onImg={(index, src) => {
              setImgVisible(true);
              setImgSrc(src);
            }}
            onAvatar={(id) => navigate(`/community/personal/${id}`)}
          />
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
