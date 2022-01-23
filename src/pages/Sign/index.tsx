import { sign } from '@/api';
import { Button, Input, NavBar } from '@/components';
import { useAppDispatch } from '@/store/hooks';
import { setToken } from '@/store/slice';
import { Toast } from 'antd-mobile';
import classNames from 'classnames';
import { ChangeEvent, FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';

const Sign: FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [name, setName] = useState('');
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRePassword(e.target.value);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSign = async () => {
    if (password !== rePassword) {
      return Toast.show('两次输入的密码不一致');
    }
    const { statusCode, data } = await sign({
      username,
      password,
      name,
    });
    if (statusCode === 200) {
      dispatch(setToken(data.token));
      setTimeout(() => navigate('/'), 1000);
    }
  };

  return (
    <div className={classNames(styles.wrapper, 'page')}>
      <NavBar back="返回" backArrow={false} onBack={() => navigate(-1)}>
        注册
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
            label="账号"
            value={username}
            onChange={handleUsernameChange}
            placeholder="请输入账号"
          />
          <Input
            label="用户名"
            value={name}
            onChange={handleNameChange}
            className="mt-3"
            placeholder="请输入用户名"
          />
          <Input
            label="密码"
            value={password}
            onChange={handlePasswordChange}
            type="password"
            className="mt-3"
            placeholder="请输入密码"
          />
          <Input
            label="确认密码"
            className="mt-3"
            value={rePassword}
            type="password"
            onChange={handleRePasswordChange}
            placeholder="请再次输入密码"
          />
          <Button style={{ margin: '50px 0 14px 0' }} onClick={handleSign}>
            注册
          </Button>
          <Button>忘记密码</Button>
        </div>
      </main>
    </div>
  );
};

export default Sign;
