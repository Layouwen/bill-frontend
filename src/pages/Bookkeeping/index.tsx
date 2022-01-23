import { FC, useState } from 'react';
import styles from './index.module.scss';
import NavBar from './navBar';
import Main from './main';
import KeyBoard from '@/pages/Bookkeeping/keyboard';

const Bookkeeping: FC = () => {
  const [keyToggle, setKeyToggle] = useState(-1);

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

  return (
    <div className={styles.bookkeeping}>
      <NavBar></NavBar>
      <Main change={handleChangeTab}></Main>
      <KeyBoard keyToggle={keyToggle}></KeyBoard>
    </div>
  );
};

export default Bookkeeping;
