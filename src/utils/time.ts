import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale('en', {
  relativeTime: {
    future: '%s前',
    past: '%s后',
    s: '刚刚',
    m: '1分前',
    mm: '%d分',
    h: '1小时',
    hh: '%d小时',
    d: '1天',
    dd: '%d天',
    M: '1月',
    MM: '%d月',
    y: '1年',
    yy: '%d年',
  },
});

export const showDate = (timestamp: string) => {
  const now = dayjs().valueOf();
  const before = dayjs(timestamp).valueOf();
  const oneDay = 60 * 60 * 24 * 1000;
  return now - before < oneDay
    ? dayjs().from(timestamp, now - before < 60 * 1000)
    : dayjs(timestamp).format('YYYY-MM-DD HH:mm');
};

export const spliceNumberByPoint = (n?: number) => {
  if (!n) return ['0', '00'];
  const sp = n.toString().split('.');
  return sp.length === 1 ? [...sp, '00'] : sp;
};

export const zeroFill = (n?: number) => {
  if (!n) n = 0;
  return n < 10 ? `0${n}` : n.toString();
};
