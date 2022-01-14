import { NavBar } from '@/components';
import { FC } from 'react';

const Sign: FC = () => {
  return (
    <div>
      <NavBar back="返回" backArrow={false} onBack={() => console.log('back')}>
        注册
      </NavBar>
    </div>
  );
};

export default Sign;
