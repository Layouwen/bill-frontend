import { addTopic, uploadFile } from '@/api';
import { Toast } from 'antd-mobile';
import {
  FC,
  useEffect,
  useState,
  ChangeEvent,
  useRef,
  useCallback,
  MouseEvent,
} from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { Icon, NavBar } from '@/components';
import { Button } from 'bw-mobile';
import styles from './index.module.scss';

const PostTopic: FC = () => {
  const uploadRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState('');
  const [imgs, setImgs] = useState<string[]>([]);
  const navigator = useNavigate();

  const deleteImg = (i: number) => {
    const state = [...imgs];
    state.splice(i, 1);
    setImgs(state);
  };

  const addImg = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    uploadRef.current?.click();
  };

  const handleAddTopic = async () => {
    try {
      const { statusCode, message } = await addTopic({ content, images: imgs });
      if (statusCode === 200) {
        Toast.show({ content: '发布成功', duration: 600 });
        setTimeout(() => {
          navigator('/community');
        }, 600);
      } else {
        Toast.show({ content: message?.[0] });
      }
    } catch ({
      data: {
        message: [msg],
      },
    }) {
      console.error(msg);
    }
  };

  const clearFiles = useCallback(() => {
    if (uploadRef.current) {
      uploadRef.current.value = '';
    }
  }, []);

  const changeFiles = async (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const files = target.files;
    if (!files) return;
    if (imgs.length + files.length > 9) {
      clearFiles();
      return Toast.show({ content: '最多上传9张图片' });
    }

    Toast.show({
      icon: 'loading',
      content: '上传中...',
      duration: 0,
      maskClickable: false,
    });

    const uploadFileCb = (data: FormData) => {
      return () => uploadFile(data);
    };

    const formDataCb = [...files].map((file) => {
      const formData = new FormData();
      formData.append('file', file);
      return uploadFileCb(formData);
    });

    const data = [] as string[];
    try {
      for (const cb of formDataCb) {
        const res = await cb();
        if (res) data.push(res.data.url);
      }
      Toast.clear();
    } finally {
      clearFiles();
    }

    setImgs([...imgs].concat(data));
  };

  useEffect(() => {
    clearFiles();
  }, [imgs]);

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
      <main className="grow">
        <div
          onInput={(e: ChangeEvent<HTMLDivElement>) => {
            setContent(e.target.innerText);
          }}
          contentEditable={true}
          className={classNames('max-width-full', styles.textarea)}
        />
        <div className={classNames(styles.imgs, 'flex flex-wrap')}>
          {imgs.map((img, i) => (
            <div key={img + i} className={styles.img}>
              <div className={styles.circle} onClick={() => deleteImg(i)}>
                <Icon name="add" className={styles.del} />
              </div>
              <img src={img} alt="" onClick={() => console.log(1)} />
            </div>
          ))}
          {imgs.length < 9 && (
            <div className={styles.img} onClick={addImg}>
              <input
                onClick={(e) => e.stopPropagation()}
                ref={uploadRef}
                type="file"
                hidden
                onChange={changeFiles}
                accept="image/*"
                multiple={true}
              />
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
          <Icon name="left" />
        </footer>
      </main>
      <Button size="full" onClick={handleAddTopic}>
        发表
      </Button>
    </div>
  );
};

export default PostTopic;
