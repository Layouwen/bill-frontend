import { getRecord } from '@/api';
import { exportRecordData } from '@/utils/exportData';
import { DatePicker } from 'antd-mobile';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Gap, List, NavBar } from 'bw-mobile';
import styles from './index.module.scss';

const ExportData = () => {
  const navigate = useNavigate();

  const handleExportData = async () => {
    const { startTime, endTime } = exportTimeRange;
    const res = await getRecord({
      startDate: startTime,
      endDate: endTime,
    });
    exportRecordData(res.data.data, exportTimeRange);
  };

  const init = () => {
    const endTime = dayjs().format('YYYY-MM-DD');
    const startTime = dayjs().subtract(1, 'month').format('YYYY-MM-DD');
    setExportTimeRange({ startTime, endTime });
  };

  useEffect(() => {
    init();
  }, []);

  const [exportTimeRange, setExportTimeRange] = useState({
    startTime: '',
    endTime: '',
  });

  const handleChangeTime = async (type: ChangeType) => {
    const max = new Date();
    const { startTime, endTime } = exportTimeRange;
    const selectTime = await DatePicker.prompt({
      max,
      defaultValue: new Date(type === ChangeType.START ? startTime : endTime),
    });

    if (!selectTime) return;

    switch (type) {
      case ChangeType.START:
        setExportTimeRange({
          ...exportTimeRange,
          startTime: dayjs(selectTime).format('YYYY-MM-DD'),
        });
        break;
      case ChangeType.END:
        setExportTimeRange({
          ...exportTimeRange,
          endTime: dayjs(endTime).format('YYYY-MM-DD'),
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className="page">
      <NavBar back="返回" onBack={() => navigate(-1)}>
        导出数据
      </NavBar>
      <div className={styles.wrapper}>
        <Gap />
        <List>
          <List.Item
            extra={exportTimeRange.startTime || '请选择开始时间'}
            onClick={() => handleChangeTime(ChangeType.START)}
            clickable
          >
            开始时间
          </List.Item>
          <List.Item
            extra={exportTimeRange.endTime || '请选择结束时间'}
            onClick={() => handleChangeTime(ChangeType.END)}
            clickable
          >
            结束时间
          </List.Item>
        </List>
        <Gap height={92} />
        <div style={{ padding: '0 32px' }}>
          <Button block onClick={() => handleExportData()}>
            导出
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportData;

enum ChangeType {
  START,
  END,
}
