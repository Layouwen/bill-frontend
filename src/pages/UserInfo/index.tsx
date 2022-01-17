import { FC, useCallback } from 'react';
import classNames from 'classnames';
import { Button, List, NavBar } from '@/components';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';

const userInfo: FC = () => {
  const navigate = useNavigate();

  const toPassword = useCallback(() => navigate('/password'), []);

  return (
    <div className={classNames('page')} style={{ background: '#f2f2f7' }}>
      <NavBar back="返回" onBack={() => navigate(-1)}>
        个人信息
      </NavBar>
      <div style={{ height: 10 }} />
      <List>
        <List.Item
          arrow={false}
          extra={
            <div
              className={classNames(
                styles.avatar,
                'rounded-full overflow-hidden',
              )}
              onClick={() => console.log('换头像')}
            >
              <img className="w-full h-full" src={''} alt={''} />
            </div>
          }
        >
          头像
        </List.Item>
        <List.Item clickable arrow={false} extra={1231}>
          ID
        </List.Item>
        <List.Item
          extra={'123'}
          onClick={() => {
            console.log('换头像');
          }}
        >
          昵称
        </List.Item>
      </List>
      <List style={{ margin: '10px 0' }}>
        <List.Item onClick={toPassword}>修改密码</List.Item>
      </List>
      <Button block size="full" className={styles.out}>
        退出登录
      </Button>
    </div>
  );
};

export default userInfo;
