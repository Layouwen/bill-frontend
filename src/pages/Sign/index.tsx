import { getEmailCaptchaAPi, sign } from '@/api';
import { Button, Input, NavBar } from 'bw-mobile';
import { useAppDispatch } from '@/store/hooks';
import { setToken } from '@/store/slice';
import { Toast } from 'antd-mobile';
import classNames from 'classnames';
import { ChangeEvent, FC, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';

const WAIT_TIME = 60;

const Sign: FC = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    rePassword: '',
    name: '',
    email: '',
    emailCode: '',
  });
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const setFormValue = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSign = async () => {
    if (form.password !== form.rePassword) {
      return Toast.show('两次输入的密码不一致');
    }
    const { statusCode, data } = await sign(form);
    if (statusCode === 200) {
      dispatch(setToken(data.token));
      setTimeout(() => navigate('/'), 1000);
    }
  };

  // send email
  const sendEmailWaitTimeRef = useRef(WAIT_TIME);
  const [sendEmailWaitTime, setSendEmailWaitTime] = useState(WAIT_TIME);
  const [sendEmailStatus, setSendEmailStatus] = useState(false);
  const waitSendEmail = () => {
    setSendEmailWaitTime(sendEmailWaitTimeRef.current--);
    const timer = setInterval(() => {
      setSendEmailWaitTime(sendEmailWaitTimeRef.current--);
      if (sendEmailWaitTimeRef.current <= 0) {
        clearInterval(timer);
        setSendEmailStatus(false);
        sendEmailWaitTimeRef.current = WAIT_TIME;
        setSendEmailWaitTime(WAIT_TIME);
      }
    }, 1000);
  };
  const handleEmail = async () => {
    const { email } = form;
    const res = await getEmailCaptchaAPi(email);
    const canSend = res.statusCode === 200;
    if (canSend) {
      setSendEmailStatus(canSend);
      waitSendEmail();
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
            value={form.username}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFormValue('username', e.target.value)
            }
            placeholder="请输入账号"
          />
          <Input
            label="邮箱"
            value={form.email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFormValue('email', e.target.value)
            }
            className="mt-3"
            placeholder="请输入邮箱"
          />
          <Input
            label="用户名"
            value={form.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFormValue('name', e.target.value)
            }
            className="mt-3"
            placeholder="请输入用户名"
          />
          <Input
            label="密码"
            value={form.password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFormValue('password', e.target.value)
            }
            type="password"
            className="mt-3"
            placeholder="请输入密码"
          />
          <Input
            label="确认密码"
            className="mt-3"
            value={form.rePassword}
            type="password"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFormValue('rePassword', e.target.value)
            }
            placeholder="请再次输入密码"
          />
          <Input
            label="验证码"
            value={form.emailCode}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFormValue('emailCode', e.target.value)
            }
            className="mt-3"
            placeholder="请输入邮箱验证码"
          />
          <div
            className="flex justify-between w-full"
            style={{ marginTop: 20 }}
          >
            <span>忘记密码</span>
            {sendEmailStatus ? (
              <span style={{ color: '#ddd' }}>
                {sendEmailWaitTime}秒重新发送
              </span>
            ) : (
              <span onClick={handleEmail}>发送邮箱验证码</span>
            )}
          </div>
          <Button
            block
            style={{ margin: '40px 0 14px 0' }}
            onClick={handleSign}
          >
            注册
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Sign;
