import { Toast } from 'antd-mobile';
import classNames from 'classnames';
import { ChangeEvent, FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '@/api';
import { Button, Input, NavBar } from '@/components';
import styles from './index.module.scss';

const Password: FC = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const navigate = useNavigate();

  const handleOldPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value);
  };

  const handleRePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRePassword(e.target.value);
  };

  const handleNewPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleChangePassword = async () => {
    if (newPassword !== rePassword) {
      return Toast.show('新密码不一致');
    }
    const { statusCode } = await changePassword({
      password: oldPassword,
      newPassword,
    });
    if (statusCode === 200) setTimeout(() => navigate(-1), 1000);
  };

  return (
    <div className={classNames(styles.wrapper, 'page')}>
      <NavBar back="返回" backArrow={false} onBack={() => navigate(-1)}>
        修改密码
      </NavBar>
      <main
        className={classNames('flex-grow flex justify-center items-center')}
      >
        <div
          className={classNames(
            styles.box,
            'flex flex-col justify-center items-center',
          )}
        >
          <Input
            label="旧密码"
            value={oldPassword}
            onChange={handleOldPassword}
            type="password"
            placeholder="请输入旧密码"
          />
          <Input
            label="新密码"
            type="password"
            value={newPassword}
            onChange={handleNewPassword}
            className="mt-3"
            placeholder="请输入新密码"
          />
          <Input
            label="确认密码"
            className="mt-3"
            value={rePassword}
            type="password"
            onChange={handleRePasswordChange}
            placeholder="请确认新密码"
          />
          <Button
            block
            style={{ margin: '50px 0 14px 0' }}
            onClick={handleChangePassword}
          >
            完成
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Password;
