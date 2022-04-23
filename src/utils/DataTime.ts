export const getWeekByDay = (dayValue: string) => {
  //dayValue=“2014-01-01”
  const day = new Date(Date.parse(dayValue.replace(/-/g, '/'))); //将日期值格式化
  const today = [
    '星期日',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六',
  ]; //创建星期数组
  // console.log (today[day.getDay ()]);
  return today[day.getDay()]; //返一个星期中的某一天，其中0为星期日
};

export const getTimeDateYear = (val: Date) => {
  const Y = val.getFullYear() + '年';
  const M =
    (val.getMonth() + 1 < 10
      ? '0' + (val.getMonth() + 1)
      : val.getMonth() + 1) + '月';
  const D = (val.getDate() < 10 ? '0' + val.getDate() : val.getDate()) + '日';
  return Y + M + D;
};

export const getShowTime = (val: Date) => {
  const Y = val.getFullYear() + '/';
  const M =
    (val.getMonth() + 1 < 10
      ? '0' + (val.getMonth() + 1)
      : val.getMonth() + 1) + '/';
  const D = (val.getDate() < 10 ? '0' + val.getDate() : val.getDate()) + ' ';
  return Y + M + D;
};

export const getTimedate = (val: Date) => {
  const Y = val.getFullYear() + '-';
  const M =
    (val.getMonth() + 1 < 10
      ? '0' + (val.getMonth() + 1)
      : val.getMonth() + 1) + '-';
  const D = (val.getDate() < 10 ? '0' + val.getDate() : val.getDate()) + '';
  return Y + M + D;
};

export const getTimeValueFn = (val: Date) => {
  const M =
    (val.getMonth() + 1 < 10
      ? '0' + (val.getMonth() + 1)
      : val.getMonth() + 1) + '月';
  const D = (val.getDate() < 10 ? '0' + val.getDate() : val.getDate()) + '日';
  return M + D;
};
