import { FC, useCallback } from 'react';
import Mask from '../Mask';

const classPrefix = 'bw-modal';

type ModalProps = {
  visible?: boolean;
  title?: string;
  onClose?: () => void;
  onCancel?: () => void | true;
  onOk?: () => void;
};

const defaultProps = {
  visible: false,
  title: '标题',
};

export const Modal: FC<ModalProps> = (p) => {
  const props = Object.assign({}, defaultProps, p);
  const { visible, onClose, children, title, onCancel, onOk } = props;

  const onCancelClose = useCallback(() => {
    if (!onCancel && onClose) onClose();
    if (onCancel?.()) onClose?.();
  }, [onClose, onCancel]);

  return (
    <Mask onClick={onClose} visible={visible}>
      <div className={classPrefix}>
        <div
          className={`${classPrefix}-content`}
          onClick={(e) => e.stopPropagation()}
        >
          <header>{title}</header>
          <main>{children}</main>
          <footer>
            <button className={`${classPrefix}-cancel`} onClick={onCancelClose}>
              取消
            </button>
            <button className={`${classPrefix}-ok`} onClick={onOk}>
              确认
            </button>
          </footer>
        </div>
      </div>
    </Mask>
  );
};
