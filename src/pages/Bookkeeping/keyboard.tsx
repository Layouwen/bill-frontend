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
  const [totals, setTotals] = useState('0.00');
  const [inputToggle, setInputToggle] = useState(false);
  const [num, setNum] = useState('0');
  const [addNum, setAddNum] = useState('0');

  const changeDian = (item: { keys: string | number }) => {
    if (
      item.keys === '.' &&
      !num.includes('.') &&
      !totals.includes('+') &&
      !totals.includes('-')
    ) {
      setNum(num + item.keys);
      setTotals(num + item.keys);
    }
    if (item.keys === '.' && addNum.includes('.')) {
      return;
    } else if (
      (item.keys === '.' && !addNum.includes('.') && totals.includes('+')) ||
      totals.includes('-')
    ) {
      setAddNum(addNum + item.keys);
      setTotals(totals + item.keys);
    }
  };

  const changeDelete = (item: { keys: string | number }) => {
    //点击了删除
    if (item.keys === 'x') {
      if (totals === '0') return;
      if (totals.length === 1) {
        setTotals('0');
        setNum('0');
        setAddNum('0');
        return;
      }
      const NewTotals = totals.substring(0, totals.length - 1);
      if (totals.includes('+')) {
        const index = totals.indexOf('+');
        const newAddNum = totals.slice(index + 1, totals.length - 1);
        setAddNum(newAddNum);
      } else if (totals.includes('-')) {
        const index = totals.indexOf('-');
        const newAddNum = totals.slice(index + 1, totals.length - 1);
        setAddNum(newAddNum);
      }
      setNum(NewTotals);
      setTotals(NewTotals);
      if (addNum === '0') {
        setAddNum('0');
        return;
      }

      return;
    }
  };

  const changeAddNumber = (item: { keys: string | number }, acc: string) => {
    //字符串拼接
    if (addNum.length > 7 && !addNum.includes('.') && !addNum.includes(acc))
      return;

    if (totals !== '0.00' && addNum.includes('.') && totals.includes(acc)) {
      //判断num存在了点
      const index = addNum.indexOf('.');
      if (addNum.length > index + 2) return;
      setAddNum(addNum + item.keys);
      setTotals(totals + item.keys);
      return;
    }

    if (item.keys === 0 && totals.includes(acc) && addNum.length < 2) {
      const lin = totals.charAt(totals.length - 1);
      if (lin === '0') {
        setTotals(totals);
        return;
      }
      setAddNum('0');
      setTotals(totals + item.keys);
      return;
    } else if (item.keys !== 0 && addNum === '0') {
      const lin = totals.charAt(totals.length - 1);
      setAddNum(String(item.keys)); //5
      if (lin === '0') {
        const NewTotals = totals.slice(0, totals.length - 1);
        setTotals(NewTotals + item.keys); //5+0+5
        return;
      }
      setTotals(totals + item.keys); //5+0+5
    } else {
      setAddNum(addNum + String(item.keys));
      setTotals(totals + item.keys);
    }
  };

  const changeNumber = (item: { keys: string | number }) => {
    //点击了数字键盘
    // 键盘输入控制逻辑 //总数计算
    if (num.length > 7 && !totals.includes('.') && !totals.includes('+'))
      return;

    if (totals.includes('+')) {
      changeAddNumber(item, '+');
      return;
    } else if (totals.includes('-')) {
      changeAddNumber(item, '-');
      return;
    }

    if (totals !== '0.00' && num.includes('.') && !totals.includes('+')) {
      //判断num存在了点
      const index = num.indexOf('.');
      if (num.length > index + 2) return;
      setNum(num + item.keys);
      setTotals(num + item.keys);
      return;
    }

    if (totals === '0') {
      setTotals(String(item.keys));
      setNum(String(item.keys));
    } else {
      if (num === '0') {
        setTotals(String(item.keys));
        setNum(String(item.keys));
        return;
      } else {
        setTotals(num + String(item.keys));
        setNum(num + String(item.keys));
      }
    }
  };

  const changeKeys = (index: number, item: { keys: number | string }) => {
    if (totals === '-' && item.keys !== 'x') {
      return;
    }

    if (typeof item.keys === 'number') {
      changeNumber(item);
    } else if (typeof item.keys !== 'number') {
      if (item.keys === 'x') {
        changeDelete(item);
      } else if (item.keys === '.') {
        changeDian(item);
      }
    }
  };

  //加号
  const changeAddFn = () => {
    if (totals === '0.00' || totals === '0' || totals === '-') {
      return;
    }
    const index = totals.indexOf('-');
    if (index === 0) {
      //减号存在第一位就return
      if (totals.includes('+')) {
        const MinusNew = Number(num) * 100 + Number(addNum) * 100;
        setNum(String(MinusNew / 100));
        setAddNum('0');
        setTotals(String(MinusNew / 100) + '+');
        return;
      }
      const MinusNew = Number(num) * 100 - Number(addNum) * 100;
      setNum(String(MinusNew / 100));
      setAddNum('0');
      setTotals(String(MinusNew / 100) + '+');

      return;
    }
    changeToggle('+'); //点击了加号之后，判断字符串的最后一位是不是为加号！ (为加号就return，为减号就替换)
    if (totals !== '0.00' && totals.includes('+')) {
      const newText = changeNewAccordFn('+');
      if (newText) setTotals(newText + '+');
      return;
    } else if (
      totals !== '0.00' &&
      !totals.includes('+') &&
      !totals.includes('-')
    ) {
      setTotals(totals + '+');
      return;
    }
    if (totals !== '0.00' && !totals.includes('+') && totals.includes('-')) {
      const newText = changeNewAccordFn('-');
      if (newText) setTotals(newText + '+');
    }
  };

  //减号
  const changeMinusFn = () => {
    if (totals === '0.00' || totals === '0' || totals === '-') {
      return;
    }
    const index = totals.indexOf('-');
    if (index === 0) {
      //减号存在第一位就return

      if (totals.includes('+')) {
        const MinusNew = Number(num) * 100 + Number(addNum) * 100;
        setNum(String(MinusNew / 100));
        setAddNum('0');
        setTotals(String(MinusNew / 100) + '-');
        return;
      }
      const MinusNew = Number(num) * 100 - Number(addNum) * 100;
      setNum(String(MinusNew / 100));
      setAddNum('0');
      setTotals(String(MinusNew / 100) + '-');
      return;
    }

    changeToggle('-'); //点击了减号之后，判断字符串的最后一位是不是为减号！ (为减号就return，为加号就替换)
    if (totals !== '0.00' && totals.includes('-')) {
      const newText = changeNewAccordFn('-');
      if (newText) setTotals(newText + '-');
      return;
    } else if (
      totals !== '0.00' &&
      !totals.includes('-') &&
      !totals.includes('+')
    ) {
      setTotals(totals + '-');
      return;
    }
    if (totals !== '0.00' && !totals.includes('-') && totals.includes('+')) {
      const newText = changeNewAccordFn('+');
      if (newText) setTotals(newText + '-');
    }
  };

  const changeCompleteFn = () => {
    if (totals === '-') {
      setTotals('0');
      return;
    }

    if (addNum === '0.' || addNum === '.') {
      //防止加减符合后面只有.的情况，用户就直接运算保存，这里就直接截取掉变量的最后一位也就是这个点！
      const newText = totals.slice(0, totals.length - 1);
      setAddNum('0');
      setTotals(newText);
      return;
    }

    if (totals.includes('+')) {
      const newText = changeNewAccordFn('+');
      if (newText) setTotals(newText);
    } else if (totals.includes('-')) {
      const newText = changeNewAccordFn('-');
      if (newText) setTotals(newText);
    }
  };

  const changeNewAccordFn = (str: string) => {
    //加减运算

    const indexJian = totals.indexOf('-'); //-的位置是否在第一位
    const jian = totals.slice(totals.length - 1, totals.length);
    if (indexJian === 0 && jian === '-') {
      const NewTotals = totals.slice(0, totals.length - 1);
      setTotals(NewTotals);
      return;
    }
    const lastIndexOf1 = totals.lastIndexOf(str);
    // const index = totals.indexOf(str); //flag
    const leftNum = totals.slice(0, lastIndexOf1); //截取前面的
    const rightNum = totals.slice(lastIndexOf1 + 1, totals.length); //截取后面的
    if (rightNum === '.') return;
    let NewTotals: number;
    if (totals.includes('+')) {
      NewTotals = Number(leftNum) * 100 + Number(rightNum) * 100;
    } else {
      NewTotals = Number(leftNum) * 100 - Number(rightNum) * 100;
    }
    /* eslint-disable */
    // @ts-ignore
    NewTotals = NewTotals / 100;
    /* eslint-disable */

    setNum(String(NewTotals));
    setAddNum('0');
    return String(NewTotals);
  };

  const changeToggle = (value: string) => {
    if (totals.includes('+')) {
      const index1 = totals.indexOf(value);
      const flag = totals.slice(index1, totals.length);
      if (flag === '+') {
        if (value === '-') {
          const NewTotals = totals.slice(0, totals.length - 1);
          const res = NewTotals + value;
          setTotals(res);
        }
        return;
      }
    } else if (totals.includes('-')) {
      const index1 = totals.indexOf(value);
      const flag = totals.slice(index1, totals.length);
      if (flag === '-') {
        if (value === '+') {
          const NewTotals = totals.slice(0, totals.length - 1);
          const res = NewTotals + value;
          setTotals(res);
        }
        return;
      }
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
                <div className={styles.bor} onClick={() => changeAddFn()}>
                  +
                </div>
                <div className={styles.bor} onClick={() => changeMinusFn()}>
                  -
                </div>
                <div
                  className={styles.bor}
                  onClick={() => {
                    changeCompleteFn();
                  }}
                >
                  完成
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
