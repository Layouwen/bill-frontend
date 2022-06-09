import { FC } from 'react';
import styles from './ShareBtn.module.scss';

interface ShareBtnProps {
  onSave: () => void;
}

const ShareBtn: FC<ShareBtnProps> = ({ onSave }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.btn} onClick={onSave}>
        <button />
        <span>保存图片</span>
      </div>
      <div className={styles.btn}>
        <button />
        <span>微信</span>
      </div>
    </div>
  );
};

export default ShareBtn;
