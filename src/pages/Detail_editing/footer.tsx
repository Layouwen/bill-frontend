import { FC } from 'react';
import styles from './footer.module.scss';
import { recordChildren } from '../Detail/List';
import { useNavigate } from 'react-router-dom';

type stateType = {
  state: recordChildren;
};

const Footer: FC<stateType> = ({ state }) => {
  const navigate = useNavigate();

  const editing = () => {
    navigate('/bookkeeping', { state });
  };

  return (
    <div className={styles.footer}>
      <div className={styles.main}>
        <div onClick={() => editing()}>编辑</div>
        <span></span>
        <div>删除</div>
      </div>
    </div>
  );
};

export default Footer;
