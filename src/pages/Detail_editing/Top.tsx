import { Icon, NavBar } from 'bw-mobile';
import classNames from 'classnames';
import { FC } from 'react';
import styles from './top.module.scss';
import { useNavigate } from 'react-router-dom';
import { recordChildren } from '@/pages/Detail/List';

type stateType = {
  state: recordChildren;
};

const Top: FC<stateType> = ({ state }) => {
  const navigate = useNavigate();
  const back = () => {
    if (state?.status) {
      navigate('/detail');
    } else {
      navigate(-1);
    }
  };

  return (
    <div>
      <NavBar backArrow={false} onBack={() => back()} back="返回"></NavBar>
      <div className={styles.top}>
        <div className={styles.main}>
          <div
            className={classNames(
              styles.icon,
              'flex justify-center items-center',
            )}
          >
            <Icon name={state.category.icon} style={{ fontSize: 36 }} />
          </div>
          <span>{state.category.name}</span>
        </div>
      </div>
    </div>
  );
};

export default Top;
