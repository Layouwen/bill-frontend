import { playSound } from '@/modules';
import { useRecordQuery } from '@/service/record';
import { Icon } from 'bw-mobile';
import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import styles from './list.module.scss';
import { getWeekByDay, getTimeValueFn, getTimedate } from '@/utils/DataTime';
import { useNavigate } from 'react-router-dom';

export type recordChildren = {
  amount: string;
  category: {
    createdAt: string;
    icon: string;
    id: number;
    name: string;
    updatedAt: string;
  };
  createdAt: string;
  id: number;
  remark: string;
  time: string;
  type: string;
  updatedAt: string;
  status?: boolean;
};

type recordType = [
  string,
  string,
  number,
  Array<recordChildren>,
  number,
  number,
];

type numType = [Array<string>, Array<string>];

type timeDateProp = {
  timeProp: string;
  change: (arr: numType) => void;
};

const List: FC<timeDateProp> = ({ timeProp, change }) => {
  const [record, setRecord] = useState<recordType[]>([]);
  const navigate = useNavigate();

  const time = new Date();
  const time2 = getTimedate(time);
  const { data } = useRecordQuery({ startDate: timeProp || time2 });

  const Recording = async () => {
    if (!data) return;
    if (data.statusCode === 200) {
      const { data: lists, expend, income } = data.data;

      const leftNum: number = expend;
      const leftNum2: number = income;
      let array: Array<string> = [];
      let array2: Array<string> = [];
      if (String(expend).includes('.')) {
        array = leftNum.toString().split('.');
      } else {
        array = [leftNum + '', ''];
      }
      if (String(income).includes('.')) {
        array2 = leftNum2.toString().split('.');
      } else {
        array2 = [leftNum2 + '', ''];
      }
      change([array, array2]);

      const record: Array<recordType> = [];
      const recordHash: {
        [string: string]: [
          string,
          string,
          number,
          recordChildren[],
          number,
          number,
        ];
      } = {};
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      lists.forEach((item) => {
        const time2 = new Date(item.time).getTime(); //???????????????????????????????????????
        //??????????????????????????????
        const time = new Date(parseInt(String(time2)))
          .toLocaleString()
          .replace(/:\d{1,2}$/, ' ');
        //???????????????????????????  ????????????????????????
        const Week = getWeekByDay(time);

        //???????????????????????????
        const data = new Date(item.time);
        const createdTime = getTimeValueFn(data);

        if (createdTime in recordHash) {
          recordHash[createdTime][3].push({ ...item });
        } else {
          recordHash[createdTime] = [
            createdTime,
            Week,
            time2,
            [{ ...item }],
          ] as unknown as recordType;
        }
      });

      const itemRecord = Object.keys(recordHash);
      itemRecord.forEach((item) => {
        // recordHash[item][3].forEach((item) => {
        //   item.time = new Date(item.time).getTime(); //???????????????????????????????????????????????????
        // });
        record.push(recordHash[item]);
      });
      let max;
      for (let i = 0; i < record.length; i++) {
        //???????????????????????????record[i] ??? ????????????record.legend?????? record[j] ?????????
        for (let j = i; j < record.length; j++) {
          if (record[i][2] < record[j][2]) {
            max = record[j];
            record[j] = record[i];
            record[i] = max;
          }
        }
      }

      record.forEach((item) => {
        let addAmount = 0;
        let reduceAmount = 0;
        item[3].forEach((chunk) => {
          if (chunk.type === '-') {
            reduceAmount += Number(chunk.amount) * 10 * 10;
          } else if (chunk.type === '+') {
            addAmount += Number(chunk.amount) * 10 * 10;
          }
        });
        item.push(reduceAmount / 100, addAmount / 100);
      });

      setRecord(record);
    }
  };

  const recordFn = (chunk: recordChildren) => {
    playSound.turnPage();
    navigate(`/editing/${chunk.id}`, { state: chunk });
  };

  useEffect(() => {
    void Recording();
  }, [timeProp, data]);

  return (
    <div className={styles.wrapper}>
      {record.length ? (
        <>
          {record.map((item: recordType, index) => (
            <div className={styles.group} key={index}>
              <div className={styles.title}>
                <div className={styles.left}>
                  {item[0]} {item[1]}
                </div>
                {item[5] > 0 ? (
                  <div className={styles.right}>?????????{item[5]}</div>
                ) : (
                  ''
                )}
                <div className={styles.right}>?????????{item[4]}</div>
              </div>
              {item[3].map((chunk, index) => (
                <div
                  className={styles.record}
                  key={index}
                  onClick={() => recordFn(chunk)}
                >
                  <div className={styles.left}>
                    <div
                      className={classNames(
                        styles.icon,
                        'flex justify-center items-center',
                      )}
                    >
                      <Icon
                        name={chunk.category.icon}
                        style={{ fontSize: 20 }}
                      />
                    </div>
                  </div>
                  <div className={styles.right}>
                    <div className={styles.remark}>{chunk.remark}</div>
                    <div className={styles.price}>
                      {chunk.type === '+' ? chunk.amount : -chunk.amount}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </>
      ) : (
        <div className={styles['not-data']}>
          <Icon name="not-data" />
          <span>????????????</span>
        </div>
      )}
    </div>
  );
};

export default List;
