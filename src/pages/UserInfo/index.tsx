import choseFile from '@/utils/choseFile';
import { Toast } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import React, { FC, useCallback, useState } from 'react';
import classNames from 'classnames';
import { Button, List, NavBar, Modal as MyModal } from '@/components';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logOut, updateUserInfo as updateInfo } from '@/store/slice';
import { updateUserInfo, uploadFile } from '@/api';
import styles from './index.module.scss';

const userInfo: FC = () => {
  const userData = useAppSelector((state) => state.user.userInfo);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState(userData.name);

  const toPassword = useCallback(() => navigate('/password'), []);

  const handleLogOut = () => {
    dispatch(logOut());
    navigate('/detail');
  };

  const onCancelModal = () => {
    setModalVisible(false);
    setName(userData.name);
  };

  const handleChangeName = () => {
    setModalVisible(true);
  };

  const changeName = async () => {
    const { statusCode } = await updateUserInfo({
      name,
      avatar: userData.avatar,
    });
    if (statusCode === 200) {
      dispatch(updateInfo({ name, avatar: userData.avatar }));
      setModalVisible(false);
    }
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
      name: userData.name,
      avatar: data.url,
    });
    if (status === 200) {
      dispatch(updateInfo({ name: userData.name, avatar: data.url }));
    }
  };

  return (
    <div className={classNames('page')} style={{ background: '#f2f2f7' }}>
      <NavBar back="返回" onBack={() => navigate(-1)}>
        个人信息
      </NavBar>
      <MyModal visible={modalVisible} onOk={changeName} onClose={onCancelModal}>
        <div className={styles.modal}>
          <input
            className={styles['modal-input']}
            value={name}
            onChange={({ target: { value } }) => setName(value)}
            placeholder="请输入2-12位昵称"
          />
        </div>
      </MyModal>
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
                src={userData.avatar}
                alt={userData.name}
              />
            </div>
          }
        >
          头像
        </List.Item>
        <List.Item clickable arrow={false} extra={userData.id}>
          ID
        </List.Item>
        <List.Item extra={userData.name} onClick={handleChangeName}>
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
