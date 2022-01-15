import { testImg } from '@/pages/Community/img';
import { FC, useEffect, useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { Icon, NavBar } from '@/components';
import styles from './index.module.scss';

const PostTopic: FC = () => {
  const [content, setContent] = useState('');
  const [imgs, setImgs] = useState<string[]>([]);
  const navigator = useNavigate();

  const deleteImg = () => {
    console.log('delete', content);
  };

  useEffect(() => {
    setImgs(new Array(6).fill(testImg));
  }, []);

  const addImg = () => {
    console.log('add');
  };

  return (
    <div className={classNames('page', styles.wrapper)}>
      <NavBar
        className={styles.top}
        back="取消"
        backArrow={false}
        onBack={() => navigator(-1)}
      >
        发帖
      </NavBar>
      <main>
        <div
          onInput={(e: ChangeEvent<HTMLDivElement>) => {
            setContent(e.target.innerText);
            console.log(e.target.innerText);
          }}
          contentEditable={true}
          className={classNames('max-width-full outline-none', styles.textarea)}
        />
        <div className={classNames(styles.imgs, 'flex flex-wrap')}>
          {imgs.map((img, i) => (
            <div key={img + i} className={styles.img}>
              <div className={styles.circle} onClick={() => deleteImg()}>
                <Icon name="add" className={styles.del} />
              </div>
              <img src={img} alt="" onClick={() => console.log(1)} />
            </div>
          ))}
          {imgs.length < 9 && (
            <div className={styles.img} onClick={() => addImg()}>
              <Icon
                className={classNames(
                  styles.add,
                  'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
                )}
                name="add"
              />
            </div>
          )}
        </div>
        <footer className="flex items-center">
          <div className="flex-grow flex items-center justify-between">
            <span>#参与话题</span>
            <div>选择合适的话题会有更多赞~</div>
          </div>
          <Icon name="back" />
        </footer>
      </main>
    </div>
  );
};

export default PostTopic;
