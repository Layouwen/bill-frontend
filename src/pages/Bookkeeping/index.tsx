import { FC, useState } from 'react';
import styles from './index.module.scss';
import NavBar from './navBar';
import Main from './main';
import KeyBoard from '@/pages/Bookkeeping/keyboard';
import { iconObj } from '@/api/category';

const Bookkeeping: FC = () => {
  const [keyToggle, setKeyToggle] = useState<number>(-1); //图标的id
  const [name, setName] = useState(''); //图标选项的名称
  const [type1, setType1] = useState('-'); //切换支出和收入

  const handleChangeTab = (index: number, item: iconObj) => {
    setName(item.name);
    setKeyToggle(item.id);
  };

  const navBarType = (type: string) => {
    setType1(String(type));
  };

  return (
    <div className={styles.bookkeeping}>
      <NavBar change={navBarType}></NavBar>
      <Main change={handleChangeTab}></Main>
      <KeyBoard keyToggle={keyToggle} name={name} type={type1}></KeyBoard>
    </div>
  );
};

export default Bookkeeping;
