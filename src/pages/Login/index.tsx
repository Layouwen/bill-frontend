import { getCaptchaApi, login } from '@/api';
import { useAppDispatch } from '@/store/hooks';
import { setToken, setUserInfo } from '@/store/slice/userSlice';
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { Button, Input } from '@/components';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';

const Login: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [form, setForm] = useState({
    username: '',
    password: '',
    captcha: '',
  });
  const [svgCaption, setSvgCaption] = useState('');
  const svgWrapper = useRef<HTMLDivElement>(null);
  const getCaptcha = async () => {
    const data = await getCaptchaApi();
    if (data) {
      setSvgCaption(data);
      const wrapper = svgWrapper.current;
      const svg = wrapper!.querySelector('svg');
      svg && setSvgAttr(svg);
    }
  };
  const setSvgAttr = (svg: SVGSVGElement) => {
    svg.setAttribute('height', '38');
    svg.setAttribute('width', '100');
  };
  const handleCaptchaChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, captcha: e.target.value });
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, username: e.target.value });
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, password: e.target.value });
  };

  const handleLogin = async () => {
    const { statusCode, data } = await login(form);
    if (statusCode === 200) {
      dispatch(setToken(data.token));
      dispatch(setUserInfo(data.userInfo));
      setTimeout(() => navigate(-1), 1000);
    }
  };

  useEffect(() => {
    void getCaptcha();
  }, []);

  return (
    <div className="page justify-center items-center">
      <div className="-translate-y-16" style={{ maxWidth: 313 }}>
        <div>
          <Input
            label="账号"
            placeholder="请输入账号"
            onChange={handleUsernameChange}
            value={form.username}
          />
        </div>
        <div className="mt-3">
          <Input
            label="密码"
            placeholder="请输入密码"
            type="password"
            onChange={handlePasswordChange}
            value={form.password}
          />
        </div>
        <div
          className="mt-3"
          style={{ position: 'relative', marginBottom: 40 }}
        >
          <Input
            label="验证码"
            placeholder="请输入验证码"
            onChange={handleCaptchaChange}
            value={form.captcha}
          />
          <div
            onClick={getCaptcha}
            ref={svgWrapper}
            style={{
              position: 'absolute',
              top: 0,
              right: 10,
              zIndex: 30,
              display: 'inline-block',
            }}
            dangerouslySetInnerHTML={{ __html: svgCaption }}
          />
        </div>
        <Button block onClick={handleLogin}>
          登录
        </Button>
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
