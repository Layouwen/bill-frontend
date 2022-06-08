import { useDeleteRecordMutation } from '@/service/record';
import { FC, useState } from 'react';
import styles from './footer.module.scss';
import { recordChildren } from '../detail/List';
import { useNavigate } from 'react-router-dom';
import Popup from '@/components/Popup';
import { Toast } from 'antd-mobile';

type stateType = {
  state: recordChildren;
};

const Footer: FC<stateType> = ({ state }) => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const editing = () => {
    navigate('/bookkeeping', { state });
  };

  const deleteFn = () => {
    setShowPopup(true);
  };

  const [deleteRecord] = useDeleteRecordMutation();

  const changeShowDelete = async () => {
    const res = await deleteRecord(state.id);
    if (
      'data' in res &&
      res.data.statusCode === 200 &&
      res.data.message === '删除成功'
    ) {
      Toast.show({ content: res.data.message });
      navigate('/detail');
    }
  };

  const changeShowCancel = () => {
    setShowPopup(false);
  };

  return (
    <div className={styles.footer}>
      <div className={styles.main}>
        <button onClick={() => editing()}>编辑</button>
        <span></span>
        <button onClick={() => deleteFn()}>删除</button>
      </div>
      <Popup
        showPopup={showPopup}
        change={() => changeShowDelete()}
        cancel={() => changeShowCancel()}
      ></Popup>
    </div>
  );
};

export default Footer;
