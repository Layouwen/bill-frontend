import { FC } from 'react';

const classPrefix = 'bw-mask';

type MaskProps = {
  visible?: boolean;
  onClick?: () => void;
};

const defaultProps = {
  visible: false,
};

export const Mask: FC<MaskProps> = (p) => {
  const props = Object.assign({}, defaultProps, p);
  const { visible, onClick, children } = props;

  return (
    <>
      {visible ? (
        <div className={`${classPrefix}`} onClick={onClick}>
          {children}
        </div>
      ) : null}
    </>
  );
};
