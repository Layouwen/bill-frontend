import { FC } from 'react';
import { DatePicker, Space } from 'antd-mobile';
import { getTimedate } from '@/utils/DataTime';

const now = new Date();

type CustomRender = {
  visible1: boolean;
  change: () => void;
  changeTime: (time: string, array: Array<string>) => void;
};

// 控制选择精度
const Precision: FC<CustomRender> = ({ visible1, change, changeTime }) => {
  return (
    <>
      <Space wrap>
        <>
          <DatePicker
            visible={visible1}
            onClose={() => {
              change();
            }}
            defaultValue={now}
            max={now}
            precision="month"
            onConfirm={(val) => {
              const time = new Date(val);
              const time2 = getTimedate(time);
              const Y = val.getFullYear() + '年';
              const M =
                val.getMonth() + 1 < 10
                  ? '0' + (val.getMonth() + 1)
                  : val.getMonth() + 1;
              const array = [String(Y), String(M)];
              changeTime(time2, array);
            }}
          />
        </>
      </Space>
    </>
  );
};

export default Precision;
