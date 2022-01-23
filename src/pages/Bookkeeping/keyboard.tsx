import { FC, useRef, useState } from 'react';
import styles from './keyboard.module.scss';
import { Icon } from '@/components';

type keyType = {
  keyToggle: number;
};

const keyboard: FC<keyType> = ({ keyToggle }) => {
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

  const add = useRef<HTMLDivElement>(null);
  const [inputToggle, setInputToggle] = useState(false);
  const [totals, setTotals] = useState('0.00');
  const [num, setNum] = useState('');
  const [addNum, setAddNum] = useState('');
  const [Addition, setAddition] = useState('');
  const [completeText, setCompleteText] = useState('=');

  //数字键盘已经小数点和删除键
  const changeKeys = (index: number, item: { keys: number | string }) => {
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
      setCompleteText('完成');
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
          }
          return;
        }

        if (Addition === '+') {
          const NewTotals =
            (Number(num) * 10 * 10 + Number(addNum) * 10 * 10) / 100;
          setNum(String(NewTotals));
          setAddNum('');
          setTotals(String(NewTotals) + keys);
          setAddition(String(keys));
          setCompleteText('=');
          return;
        } else if (Addition === '-') {
          const NewTotals =
            (Number(num) * 10 * 10 - Number(addNum) * 10 * 10) / 100;
          setNum(String(NewTotals));
          setAddNum('');
          setTotals(String(NewTotals) + keys);
          setAddition(String(keys));
          setCompleteText('=');
        }
      } else if (addNum === '') {
        //不存在的时候
        setAddition(String(keys));
        setTotals(num + String(keys));
        return;
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
          setCompleteText('=');
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
      }
      if (Index === 0 && !num.includes('.')) {
        if (num.length === 9) return;
      } else {
        if (num.length === 8) return;
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

  //加号
  const changeAddFn = (str: string) => {
    if (totals === '0' || totals === '0.00' || totals === '-') {
      return;
    }
    changePing(str, 3);
  };

  //减号
  const changeMinusFn = (str: string) => {
    if (totals === '0' || totals === '0.00' || totals === '-') {
      return;
    }
    changePing(str, 3);
  };

  //完成
  const changeCompleteFn = () => {
    if (Addition.includes('+') || Addition.includes('-')) {
      changePing('', 3);
    }
  };

  const inputOnBlur = () => {
    setInputToggle(false);
  };

  const inputOnFocus = () => {
    setInputToggle(true);
  };

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
                onBlur={() => inputOnBlur()}
                onFocus={() => inputOnFocus()}
              />
            </div>
            <span className={styles.total} ref={add}>
              {totals}
            </span>
          </div>
          {inputToggle === false ? (
            <div className={styles.main}>
              <div className={styles.numbers}>
                {ArrayList.map((item, index) => (
                  <div
                    key={index}
                    className={styles.keys}
                    onClick={() => changeKeys(index, item)}
                  >
                    {item.keys}
                  </div>
                ))}
              </div>
              <div className={styles.right}>
                <div className={styles.bor}>
                  <Icon name={'community-fill'} className="tab-icon" />
                  <span>今天</span>
                </div>
                <div className={styles.bor} onClick={() => changeAddFn('+')}>
                  +
                </div>
                <div className={styles.bor} onClick={() => changeMinusFn('-')}>
                  -
                </div>
                <div
                  className={styles.bor}
                  onClick={() => {
                    changeCompleteFn();
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
