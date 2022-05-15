import { FC, useEffect, useState } from 'react';
import styles from './keyboard.module.scss';
import { addRecord, cateGoryApi, editRecord } from '@/api';
import { useNavigate } from 'react-router-dom';
import CustomRender from '@/pages/Bookkeeping/component';
import classNames from 'classnames';
import { Toast } from 'antd-mobile';
import { Icon } from 'bw-mobile';
import { getShowTime } from '@/utils/DataTime';
import { stateType } from '@/pages/Bookkeeping/index';
import { recordChildren } from '@/pages/Detail/List';

type keyType = {
  keyToggle: number;
  type: string;
  name: string;
  stateList: stateType;
  state: recordChildren;
};

const keyboard: FC<keyType> = ({ type, keyToggle, name, stateList, state }) => {
  const ArrayList = [
    {
      keys: 7,
    },
    {
      keys: 8,
    },
    {
      keys: 9,
    },
    {
      keys: 4,
    },
    {
      keys: 5,
    },
    {
      keys: 6,
    },
    {
      keys: 1,
    },
    {
      keys: 2,
    },
    {
      keys: 3,
    },
    {
      keys: '.',
    },
    {
      keys: 0,
    },
    {
      keys: 'x',
    },
  ];

  const [inputToggle, setInputToggle] = useState(false);
  const [totals, setTotals] = useState('0.00'); //总数
  const [num, setNum] = useState(''); //加减号前面的数字
  const [addNum, setAddNum] = useState(''); //加减号后面的数字
  const [Addition, setAddition] = useState(''); //存储加减号
  const [completeText, setCompleteText] = useState('完成');
  const [remarkValue, setRemarkValue] = useState(''); //备注
  const [valueDate, setValueDate] = useState(false); //日期的显示和隐藏
  const [DateValue, setDateValue] = useState('今天'); //选择的日期
  const [DateTimeValue, setDateTimeValue] = useState(0); //选择的日期的时间戳
  const [active, setActive] = useState(-1); //
  const [active1, setActive1] = useState(-1); //选择键盘样式高亮
  const navigate = useNavigate();

  //TODO 拖动距离超出了数字键盘盒子的范围就取消高亮并且不输入内容!
  const changeStart = (index: number) => {
    //长按事件
    setActive(index);
  };
  const changeMoves = (e: any) => {
    //拖动事件
    /*
     * pageX-光标的x轴距离
     * offsetWidth-这个元素的width的宽度
     * offsetLeft-这个元素的left的距离
     * */
    if (
      e.touches[0].pageY - e.touches[0].target.offsetTop < 0 ||
      e.touches[0].pageY - e.touches[0].target.offsetTop > 46
    ) {
      setActive(-2);
      setActive1(-1);
    }
    if (
      e.touches[0].pageX - e.touches[0].target.offsetLeft < 0 ||
      e.touches[0].pageX - e.touches[0].target.offsetLeft > 80
    ) {
      setActive(-2);
      setActive1(-1);
    }
  };

  const changeEnd = (index: number, item: { keys: number | string }) => {
    //键盘抬起事件
    setActive(-1);
    if (active === -2) return;
    if (typeof item.keys === 'number') {
      changeNumber(item.keys);
    } else if (item.keys === '.') {
      changeDian(item.keys);
    } else if (item.keys === 'x') {
      changeDelete(item.keys);
    }
  };

  //拼接
  const changePing = (keys: string | number, toggle?: number) => {
    const lastIndex = totals.lastIndexOf('+');
    const lastIndex1 = totals.lastIndexOf('-');
    let orders: Array<string> = [];
    let str;
    if (toggle === 1) {
      //num数字
      orders = [num];
      orders.push(String(keys));
      str = orders.join('');
      setNum(String(str));
      setTotals(String(str));
      return;
    } else if (toggle === 2) {
      //addNum数字
      orders = [addNum];
      orders.push(String(keys));
      str = orders.join('');
      setAddNum(String(str));
      setTotals(num + Addition + String(str));
      setCompleteText('=');
      return;
    } else if (toggle === 3) {
      //加减拼接

      if (addNum !== '') {
        if (addNum === '.') {
          if (keys === '+' || keys === '-') {
            setAddition(String(keys));
            setAddNum('');
            setTotals(num + String(keys));
            return;
          } else if (keys === '') {
            setAddition(String(keys));
            setAddNum('');
            setTotals(num);
            return num;
          }
          return;
        }

        if (Addition === '+') {
          const num1 = Number(num) * 10 * 10;
          const num2 = Number(addNum) * 10 * 10;
          const NewTotals = (num1 + num2) / 100;
          setNum(String(NewTotals));
          setAddNum('');
          setTotals(String(NewTotals) + keys);
          setAddition(String(keys));
          setCompleteText('完成');
          return String(NewTotals);
        } else if (Addition === '-') {
          const num1 = Number(num) * 10 * 10;
          const num2 = Number(addNum) * 10 * 10;
          const NewTotals = (num1 - num2) / 100;
          setNum(String(NewTotals));
          setAddNum('');
          setTotals(String(NewTotals) + keys);
          setAddition(String(keys));
          setCompleteText('完成');
          return String(NewTotals);
        }
      } else if (addNum === '') {
        //不存在的时候
        setAddition(String(keys));
        setTotals(num + String(keys));
        return num;
      }
    } else if (toggle === 4) {
      //小数点

      if (!Addition.includes('+') && !Addition.includes('-')) {
        if (num.includes('.')) return;
        //加减都不存在,就赋值给num
        if (totals === '0') {
          setNum('0' + String(keys));
          setTotals('0' + String(keys));
        } else {
          setNum(num + String(keys));
          setTotals(num + String(keys));
        }
        return;
      } else if (Addition.includes('+') || Addition.includes('-')) {
        //减号不在第一位的时候
        //并且存在加号或者减号,就赋值给addNum
        if (addNum.includes('.')) return;
        setAddNum(addNum + String(keys));
        setTotals(num + Addition + addNum + String(keys));
        return;
      }
    } else if (toggle === 5) {
      //点击了删除
      if (!Addition.includes('+') && !Addition.includes('-')) {
        const newNum = num.slice(0, num.length - 1);
        if (newNum === '') {
          setNum('');
          setTotals('0');
          return;
        }
        setNum(newNum);
        setTotals(newNum);
      } else if (Addition.includes('+') || Addition.includes('-')) {
        const newAddNum = addNum.slice(0, addNum.length - 1);

        let str1;
        if (lastIndex + 1 === totals.length) {
          //删除加号
          str1 = totals.slice(0, totals.length - 1);
          setAddition('');
          setTotals(str1);
          return;
        } else if (lastIndex1 + 1 === totals.length) {
          //删除减号
          str1 = totals.slice(0, totals.length - 1);
          setAddition('');
          setTotals(str1);
          return;
        }

        if (newAddNum === '') {
          setAddNum('');
          setTotals(num + Addition + '');
          setCompleteText('完成');
          return;
        }
        setAddNum(newAddNum);
        setTotals(num + Addition + newAddNum);
      }
    }
  };

  //数字
  const changeNumber = (keys: string | number) => {
    let orders: Array<string> = [];
    let str;

    if (totals === '-') {
      return;
    }

    if (totals === '0' && keys === 0) {
      return;
    }

    if (Addition.includes('+') || Addition.includes('-')) {
      if (addNum.includes('.')) {
        //存在点时候，后面就只能跟两个想小数
        const dianIndex = addNum.indexOf('.');
        if (addNum.length > dianIndex + 2) return;
      } else if (addNum.length === 8) return;
      changePing(keys, 2);
      return;
    }

    if (num === '0') {
      orders = [String(keys)];
      str = String(orders);
      setNum(str);
      setTotals(str);
      return;
    }

    if (num !== '') {
      const Index = totals.indexOf('-');
      if (num.includes('.')) {
        //存在点时候，后面就只能跟两个想小数
        const dianIndex = num.indexOf('.');
        if (num.length > dianIndex + 2) return;
      } else if (num.length === 8) return;
      if (Index === 0 && !num.includes('.')) {
        if (num.length === 9) return;
      }
      changePing(keys, 1);
      return;
    } else if (num === '') {
      orders = [String(keys)];
      str = String(orders);
      setNum(str);
      setTotals(str);
      return;
    }
  };

  //小数点
  const changeDian = (keys: string | number) => {
    if (totals === '0.00' || totals === '-') return;
    changePing(keys, 4);
  };

  //删除
  const changeDelete = (keys: string | number) => {
    changePing(keys, 5);
  };

  //这是阻止右键菜单的出现的情况
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
  });

  //加号 减号
  const changeAddFn = (str: string) => {
    setActive1(-1);
    if (active === -2) {
      setActive(-1);
      return;
    }
    if (totals === '0' || totals === '0.00' || totals === '-') {
      return;
    }
    changePing(str, 3);
  };

  //完成
  const changeCompleteFn = async () => {
    setActive1(-1);
    if (active === -2) {
      setActive(-1);
      return;
    }
    let newTotals;
    if (Addition === '+' || Addition === '-') {
      newTotals = changePing('', 3);
    } else if (Addition !== '+' && Addition !== '-') {
      newTotals = totals;
    }
    const str = Number(newTotals);
    if (totals === '0' || totals === '0.00' || totals === '-') {
      return;
    }
    if (Addition) return;
    if (completeText !== '完成') return;

    //DateValue 这是确定之后的日期
    //DateTimeValue 这是确定之后的时间戳
    let time1 = '';
    if (DateTimeValue === 0) {
      //当用户没有选择日期的时候，默认日期是当前的日期和时分秒
      time1 = new Date().toISOString(); //ISOS保存时区
    } else if (DateTimeValue !== 0) {
      time1 = new Date(DateTimeValue).toISOString();
    }
    const remark = remarkValue === '' ? name : remarkValue;

    const data = {
      remark,
      categoryId: Number(keyToggle),
      time: time1,
      type: String(type),
      amount: String(str),
    };

    if (stateList[0] !== '') {
      //编辑
      if (DateTimeValue !== 0) {
        data.time = time1;
      } else {
        data.time = stateList[1];
      }
      const edit = await editRecord(data, Number(stateList[2]));
      if (edit.statusCode === 200) {
        // Touch('编辑成功')
        Toast.show({ content: edit.message });
        const chunk = Object.assign(state, data);
        chunk.status = true;
        navigate(`/editing/${state.id}`, { state: chunk });
      }
    } else if (stateList[0] === '') {
      //新增
      data.time = time1;
      const res = await addRecord(data);
      if (res.statusCode === 200) {
        // Touch('创建成功')
        Toast.show({ content: res.message });
        navigate('/detail');
      }
    }
  };

  //加减以及完成的点击高亮
  const changeStart1 = (index: number) => {
    //长按事件
    setActive1(index);
  };

  const CustomRenderToggle = () => {
    //显示组件
    setValueDate(true);
  };

  const ChangeDateRender = () => {
    //关闭组件
    setValueDate(false);
  };

  const inputOnBlur = () => {
    setInputToggle(false);
  };

  const inputOnFocus = () => {
    setInputToggle(true);
  };

  // TODO: any
  const changeRemark = (e: any) => {
    //备注
    setRemarkValue(e.target.value);
  };

  const changeTime = (value: string, time: number) => {
    //选择的时间
    //value 这是子组件返回的渲染的日期
    //time 这是子组件返回的时间戳的参数

    setDateTimeValue(time);
    if (new Date(value).toDateString() == new Date().toDateString()) {
      setDateValue('今天');
    } else {
      setDateValue(value);
    }
  };

  const changShow = async () => {
    //回显
    if (name) {
      const res = await cateGoryApi();
      const data: any = res.data.data;
      const iconNameArr: Array<string> = [];
      data.forEach((item: any) => {
        iconNameArr.push(item.name);
      });
      if (iconNameArr.includes(name)) {
        setRemarkValue('');
      } else {
        setRemarkValue(name);
      }
    }
    if (stateList[0] !== '') {
      setNum(stateList[0]);
      setTotals(stateList[0]);
      const time = new Date(stateList[1]);
      const value = getShowTime(time);
      setDateValue(value);
    }
  };

  useEffect(() => {
    void changShow();
  }, [stateList]);

  return (
    <>
      {keyToggle > -1 ? (
        <div className={styles.keyBoard}>
          <div className={styles.top}>
            <div>
              <span>备注:</span>
              <input
                type="text"
                placeholder="点击写备注..."
                value={remarkValue}
                onChange={changeRemark}
                onBlur={() => inputOnBlur()}
                onFocus={() => inputOnFocus()}
                onKeyDown={async (e) => {
                  if (e.key === 'Enter') {
                    e.stopPropagation();
                    await changeCompleteFn();
                  }
                }}
              />
            </div>
            <span className={styles.total}>{totals}</span>
          </div>
          {inputToggle === false ? (
            <div className={styles.main}>
              <div className={styles.numbers}>
                {ArrayList.map((item, index) => (
                  <button
                    key={index}
                    className={classNames([
                      styles.keys,
                      active === index ? styles.active : '',
                    ])}
                    onTouchStart={() => changeStart(index)}
                    onTouchMove={changeMoves}
                    onTouchEnd={() => changeEnd(index, item)}
                  >
                    {item.keys}
                  </button>
                ))}
              </div>
              <div className={styles.right}>
                <div
                  className={classNames([
                    styles.bor,
                    active1 === 4 ? styles.active : '',
                  ])}
                  onTouchStart={() => changeStart1(5)} //TODO onTouchEnd事件捕获修复在改为4
                  onTouchMove={changeMoves}
                  onClick={CustomRenderToggle}
                  // onTouchEnd={CustomRenderToggle}
                >
                  <CustomRender
                    valueDate={valueDate}
                    change={() => ChangeDateRender()}
                    changeTime={changeTime}
                  ></CustomRender>
                  <Icon name={'community-fill'} className="tab-icon" />
                  <span>{DateValue}</span>
                </div>
                <div
                  className={classNames([
                    styles.bor,
                    active1 === 1 ? styles.active : '',
                  ])}
                  onTouchStart={() => changeStart1(1)}
                  onTouchMove={changeMoves}
                  onTouchEnd={() => changeAddFn('+')}
                >
                  +
                </div>
                <div
                  className={classNames([
                    styles.bor,
                    active1 === 2 ? styles.active : '',
                  ])}
                  onTouchStart={() => changeStart1(2)}
                  onTouchMove={changeMoves}
                  onTouchEnd={() => changeAddFn('-')}
                >
                  -
                </div>
                <div
                  className={classNames([
                    styles.bor,
                    active1 === 3 ? styles.active1 : '',
                  ])}
                  onTouchStart={() => changeStart1(3)}
                  onTouchMove={changeMoves}
                  onTouchEnd={async () => {
                    await changeCompleteFn();
                  }}
                >
                  {completeText}
                </div>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      ) : (
        ''
      )}
    </>
  );
};
export default keyboard;
