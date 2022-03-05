import React, { useCallback, FC } from 'react';
import { DatePicker } from 'antd-mobile';

const now = new Date();

type CustomRender = {
  valueDate: boolean;
  change: () => void;
  changeTime: (value: string, time: number) => void;
};

// 自定义每列的渲染内容
const CustomRender: FC<CustomRender> = ({ valueDate, change, changeTime }) => {
  const labelRenderer = useCallback((type: string, data: number) => {
    switch (type) {
      case 'year':
        return data + '年';
      case 'month':
        return data + '月';
      case 'day':
        return data + '日';
      case 'hour':
        return data + '时';
      case 'minute':
        return data + '分';
      case 'second':
        return data + '秒';
      default:
        return data;
    }
  }, []);

  const changeDateChoice = (val: Date) => {
    //val 组件默认选择的时间
    const date = new Date(); //当前的时间
    const Y = val.getFullYear() + '/';
    const M =
      (val.getMonth() + 1 < 10
        ? '0' + (val.getMonth() + 1)
        : val.getMonth() + 1) + '/';
    const D = val.getDate() + ' ';
    const h = date.getHours() + ':';
    const m = date.getMinutes() + ':';
    const s = date.getSeconds();
    //Y + M + D + h + m + s 拼接的时间
    //Y + M + D 应该渲染的时间
    const getTimeValue = Y + M + D;

    const newDate = new Date(Y + M + D + h + m + s).getTime(); //选择的年月日和当前的选择的时候的时分秒

    //newDate 新的时间戳
    // const newDate2 = new Date(parseInt(String(newDate))).toLocaleString().replace(/:\d{1,2}$/, ' ');
    //newDate2  新的时间
    changeTime(getTimeValue, newDate);

    //start  //显示某月某日是星期几？
    // getWeekByDay(newDate2)
    //end
    //start //获取某年某月的天数
    // getDaysInOneMonth(2022,1)
    //edn
  };

  // function getWeekByDay(dayValue: string) { //dayValue=“2014-01-01”
  //     const day = new Date(Date.parse(dayValue.replace(/-/g, '/'))); //将日期值格式化
  //     const today = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]; //创建星期数组
  //     // console.log(today[day.getDay()]);
  //     return today[day.getDay()];  //返一个星期中的某一天，其中0为星期日
  // }
  //
  // function getDaysInOneMonth(year:number, month:number) {
  //     month = parseInt(String(month), 10);
  //     const d = new Date(year, month, 0);
  //     // console.log(d.getDate(),'天数');
  //     return d.getDate();
  // }

  return (
    <>
      <DatePicker
        title="时间选择"
        visible={valueDate}
        onClose={() => {
          change();
        }}
        defaultValue={now}
        max={now}
        onConfirm={(val) => {
          changeDateChoice(val);
        }}
        renderLabel={labelRenderer}
      />
    </>
  );
};

export default CustomRender;
