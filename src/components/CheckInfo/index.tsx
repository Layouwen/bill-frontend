import classNames from 'classnames';
import { FC } from 'react';
import './index.scss';

interface CheckInfoProps {
  data?: {
    checkInKeep?: number;
    checkInAll?: number;
    recordCount?: number;
  };
  className?: string;
}

const defaultProps = {
  data: {
    checkInKeep: 0,
    checkInAll: 0,
    recordCount: 0,
  },
};

const CheckInfo: FC<CheckInfoProps> = (p) => {
  const props = Object.assign({ ...defaultProps }, p);
  return (
    <div className={classNames('middle flex w-full', props.className)}>
      <div className="grow flex flex-col justify-center items-center">
        <span className="font-bold">{props.data.checkInKeep || 0}</span>
        <p>已连续打卡</p>
      </div>
      <div className="grow flex flex-col justify-center items-center">
        <span className="font-bold">{props.data.checkInAll || 0}</span>
        <p>记账总天数</p>
      </div>
      <div className="grow flex flex-col justify-center items-center">
        <span className="font-bold">{props.data.recordCount || 0}</span>
        <p>记账总笔数</p>
      </div>
    </div>
  );
};

export default CheckInfo;
