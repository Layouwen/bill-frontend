import { FC, useEffect, useState } from 'react';
import styles from './index.module.scss';
import NavBar from './navBar';
import Main from './main';
import KeyBoard from '@/pages/bookkeeping/keyboard';
import { CategoryAmountType, cateGoryApi, iconObj } from '@/api/category';
import { useLocation } from 'react-router-dom';
import { recordChildren } from '@/pages/detail/List';

export type stateType = [amount: string, time: string, id: number];

const Bookkeeping: FC = () => {
  const [keyToggle, setKeyToggle] = useState<number>(-1); //图标的id
  const [name, setName] = useState(''); //图标选项的名称
  const [type1, setType1] = useState<CategoryAmountType>('-'); //切换支出和收入
  const navParams = useLocation();
  const list: recordChildren = navParams.state as recordChildren;
  const state = list;
  const [stateList, setSateList] = useState<stateType>(['', '', 1]);

  const handleChangeTab = (item: iconObj) => {
    if (item) {
      setName(item.name);
      setKeyToggle(item.id);
    }
  };

  const navBarType = (type: CategoryAmountType) => {
    setType1(type);
  };

  useEffect(() => {
    if (state) {
      //回显
      const chunkKey: stateType = [state.amount, state.time, state.id];
      setSateList(chunkKey);
      navBarType(state.type as CategoryAmountType);
      const list = {
        createdAt: state.createdAt,
        icon: state.category.icon,
        id: state.category.id,
        name: state.remark,
        updatedAt: state.updatedAt,
      };
      handleChangeTab(list);
    }
  }, []);

  const [mainList, setMainList] = useState<iconObj[]>([]);

  const cateFn = async (type: CategoryAmountType) => {
    const res = await cateGoryApi(type);
    const data = res.data.data;
    setMainList(data);
  };

  useEffect(() => {
    void cateFn(type1);
  }, [type1]);

  return (
    <div className={styles.bookkeeping}>
      <NavBar change={navBarType} type={type1}></NavBar>
      <Main
        change={handleChangeTab}
        keyToggle={keyToggle}
        categoryList={mainList}
      ></Main>
      <KeyBoard
        keyToggle={keyToggle}
        name={name}
        type={type1}
        stateList={stateList}
        state={state}
      ></KeyBoard>
    </div>
  );
};

export default Bookkeeping;
