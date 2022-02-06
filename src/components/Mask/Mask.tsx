import { FC, useMemo } from 'react';

const classPrefix = 'bw-mask';

type MaskProps = {
  visible?: boolean;
  color?: 'white' | 'black';
  opacity?: 'default' | 'thin' | 'thick' | number;
  onClick?: () => void;
};

const defaultProps = {
  visible: false,
  color: 'black',
  opacity: 'default',
};

const opacityMap = {
  default: 0.55,
  thin: 0.35,
  thick: 0.75,
} as {
  default: number;
  thin: number;
  thick: number;
  [number: number]: undefined;
};

export const Mask: FC<MaskProps> = (p) => {
  const props = Object.assign({}, defaultProps, p);
  const { visible, onClick, children, color, opacity } = props;

  const background = useMemo(() => {
    const o = opacityMap[opacity] ?? props.opacity;
    const rgb = color === 'white' ? '255, 255, 255' : '0, 0, 0';
    return `rgba(${rgb}, ${o})`;
  }, [color, opacity]);

  return (
    <>
      {visible ? (
        <div
          className={`${classPrefix}`}
          style={{ background }}
          onClick={onClick}
        >
          {children}
        </div>
      ) : null}
    </>
  );
};
