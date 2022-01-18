import { Modal } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import React, { FC, useCallback, useRef } from 'react';
import classNames from 'classnames';
import { Button, List, NavBar } from '@/components';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logOut, updateUserInfo as updateInfo } from '@/store/slice';
import { updateUserInfo } from '@/api';
import styles from './index.module.scss';

const userInfo: FC = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const name = useRef('');

  const toPassword = useCallback(() => navigate('/password'), []);

  const handleLogOut = () => {
    dispatch(logOut());
    navigate('/detail');
  };

  const handleChangeName = () => {
    name.current = user.name;
    Modal.confirm({
      title: '昵称',
      content: (
        <>
          <input
            className={styles['inner-input']}
            defaultValue={user.name}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
              name.current = e.target.value;
            }}
          />
        </>
      ),
      onConfirm: async () => {
        const { statusCode } = await updateUserInfo({
          name: name.current,
          avatar: user.avatar,
        });
        if (statusCode === 200) {
          dispatch(updateInfo({ name: name.current, avatar: user.avatar }));
          name.current = '';
        }
        return;
      },
    });
  };

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
              <img
                className="w-full h-full object-cover"
                src={user.avatar}
                alt={user.name}
              />
            </div>
          }
        >
          头像
        </List.Item>
        <List.Item clickable arrow={false} extra={user.id}>
          ID
        </List.Item>
        <List.Item extra={user.name} onClick={handleChangeName}>
          昵称
        </List.Item>
      </List>
      <List style={{ margin: '10px 0' }}>
        <List.Item onClick={toPassword}>修改密码</List.Item>
      </List>
      <Button block size="full" className={styles.out} onClick={handleLogOut}>
        退出登录
      </Button>
    </div>
  );
};

export default userInfo;
