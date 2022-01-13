import { ChangeEvent, FC, useState } from 'react';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';

const Login: FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="-translate-y-1/4">
        <div>
          <Input
            label="账号"
            placeholder="请输入账号"
            onChange={handleUsernameChange}
            value={username}
          />
        </div>
        <div className="mt-3 mb-20">
          <Input
            label="密码"
            placeholder="请输入密码"
            onChange={handlePasswordChange}
            value={password}
          />
        </div>
        <Button>登录</Button>
        <div className={styles.bottom}>
          <span className={styles.back} onClick={() => navigate(-1)}>
            返回
          </span>
          <span className={styles.sign} onClick={() => navigate('/sign')}>
            注册
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
