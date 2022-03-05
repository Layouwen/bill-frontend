import { FC, useState } from 'react';
import styles from './index.module.scss';
import NavBar from './navBar';
import Main from './main';
import KeyBoard from '@/pages/Bookkeeping/keyboard';

const Bookkeeping: FC = () => {
  const [keyToggle, setKeyToggle] = useState(-1); //图标的id
  const [type1, setType1] = useState('-'); //切换支出和收入

  const handleChangeTab = (index: number) => {
    const numbers = index + 1;
    console.log(numbers, 'book');
    if (numbers && numbers > -1) {
      setKeyToggle(numbers);
      console.log('触发了');
    } else {
      setKeyToggle(-1);
    }
  };

  const navBarType = (type: string) => {
    console.log(type, '切换支出和收入');
    setType1(String(type));
  };

  return (
    <div className={styles.bookkeeping}>
      <NavBar change={navBarType}></NavBar>
      <Main change={handleChangeTab}></Main>
      <KeyBoard keyToggle={keyToggle} type={type1}></KeyBoard>
    </div>
  );
};

export default Bookkeeping;
