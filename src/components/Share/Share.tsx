import Button from '../Button';
import { FC } from 'react';
import Mask from '../Mask';

const classPrefix = 'bw-share';

type ShareProps = {
  visible?: boolean;
  shares: ItemData[];
  onClose?: () => void;
  onStart?: () => void;
  onDelete?: () => void;
  onCopyUrl?: () => void;
};

const defaultProps = {
  visible: false,
};

export const Share: FC<ShareProps> = (p) => {
  const props = Object.assign({}, defaultProps, p);
  const { visible, onClose, onStart, onCopyUrl, onDelete, shares } = props;

  const opts = [
    {
      id: 1,
      name: '搜藏',
      onClick: onStart,
    },
    {
      id: 2,
      name: '删除',
      onClick: onDelete,
    },
    {
      id: 3,
      name: '复制链接',
      onClick: onCopyUrl,
    },
  ];

  return (
    <Mask visible={visible} onClick={onClose}>
      <div className={classPrefix} onClick={(e) => e.stopPropagation()}>
        <div className={`${classPrefix}-content`}>
          <div className={`${classPrefix}-shares`}>
            {shares.map((i) => (
              <Item key={i.name} data={i} />
            ))}
          </div>
          <div className={`${classPrefix}-opts`}>
            {opts.map((i) => (
              <Item key={i.id} data={i} />
            ))}
          </div>
        </div>
        <Button
          className={`${classPrefix}-btn`}
          size="full"
          block
          onClick={onClose}
        >
          取消
        </Button>
      </div>
    </Mask>
  );
};

type ItemData = {
  id: number;
  name: string;
  icon?: string;
  color?: string;
  onClick?: () => void;
};

type ItemProps = {
  data: ItemData;
};

const Item: FC<ItemProps> = ({ data }) => {
  return (
    <div key={data.id} className={`${classPrefix}-opt`} onClick={data.onClick}>
      <div
        style={{
          height: 47,
          width: 47,
          borderRadius: '50%',
          backgroundColor: data.color ?? '#f6f6f6',
        }}
      />
      <span>{data.name}</span>
    </div>
  );
};
