import { FC } from 'react';
import './index.scss';

const classPrefix = 'bw-popup';

type popupType = {
  change: () => void;
  cancel: () => void;
  showPopup: boolean;
};

const popup: FC<popupType> = ({ change, cancel, showPopup }) => {
  return (
    <>
      {showPopup ? (
        <div className={`${classPrefix}`}>
          <div className={`${classPrefix}-content`}>
            <h4>确认删除</h4>
            <span>删除后数据不可恢复!</span>
            <div className={`${classPrefix}-but`}>
              <span onClick={() => change()}>删除</span>
              <span onClick={() => cancel()}>取消</span>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default popup;
