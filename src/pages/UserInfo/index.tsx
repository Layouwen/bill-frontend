import choseFile from '@/utils/choseFile';
import { Modal, Toast } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import React, { FC, useCallback, useRef } from 'react';
import classNames from 'classnames';
import { Button, List, NavBar } from '@/components';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logOut, updateUserInfo as updateInfo } from '@/store/slice';
import { updateUserInfo, uploadFile } from '@/api';
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

  const handleChangeAvatar = async () => {
    const files = await choseFile();
    const formData = new FormData();
    if (!files) return;
    formData.append('file', files[0]);
    const { statusCode, data } = await uploadFile(formData);
    if (statusCode !== 200) {
      Toast.show({ content: '更新失败', icon: 'fail' });
      return;
    }
    const { statusCode: status } = await updateUserInfo({
      name: user.name,
      avatar: data.url,
    });
    if (status === 200) {
      dispatch(updateInfo({ name: user.name, avatar: data.url }));
      Toast.show({ content: '更新成功', icon: 'success', duration: 800 });
    }
  };

  return (
    <div className={classNames('page')} style={{ background: '#f2f2f7' }}>
      <NavBar back="返回" onBack={() => navigate(-1)}>
        个人信息
      </NavBar>
      <div style={{ height: 10 }} />
      <List>
        <List.Item
          onClick={handleChangeAvatar}
          arrow={false}
          extra={
            <div
              className={classNames(
                styles.avatar,
                'rounded-full overflow-hidden',
              )}
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
