import { Icon } from '@/components';
import { testImg, avatar } from '@/pages/Community/img';
import classNames from 'classnames';
import { FC } from 'react';
import styles from './ItemList.module.scss';

const ItemList: FC = () => {
  const data = [
    {
      id: 1,
      avatar,
      name: '梁又文',
      time: '2020-05-01',
      content: '每个人都是主角',
      images: new Array(9).fill(testImg),
      shareCount: 2,
      isLike: false,
      likeCount: 10,
      commentCount: 30,
    },
    {
      id: 2,
      avatar,
      name: '梁金俊',
      time: '2022-05-01',
      content:
        '每个人都是主角每个人都是主角每个人都是主角每个人都是主角每个人都是主角',
      images: new Array(4).fill(testImg),
      shareCount: 15,
      isLike: false,
      likeCount: 1,
      commentCount: 21,
    },
  ];
  return (
    <div className={styles.wrapper}>
      {data.map((i) => (
        <div key={i.id} className={styles.item}>
          <div className={styles.head}>
            <div
              className={classNames(styles.img, 'rounded-full overflow-hidden')}
            >
              <img className="w-full" src={i.avatar} alt="" />
            </div>
            <div className="flex-grow">
              <div className={styles.name}>{i.name}</div>
              <div className={styles.time}>{i.time}</div>
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
                {i.shareCount}
              </span>
              <span>
                <Icon name="comment" />
                {i.commentCount}
              </span>
              <span>
                <Icon name="like" />
                {i.likeCount}
              </span>
            </footer>
          </main>
        </div>
      ))}
    </div>
  );
};
export default ItemList;
