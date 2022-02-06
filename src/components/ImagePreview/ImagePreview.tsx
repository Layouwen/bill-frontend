import Mask from '../Mask';
import React, { FC } from 'react';

const classPrefix = `bw-image-preview`;

export type ImagePreviewProps = {
  image?: string;
  visible?: boolean;
  onClose?: () => void;
};

const defaultProps = {
  visible: false,
};

export const ImagePreview: FC<ImagePreviewProps> = (p) => {
  const props = Object.assign({}, defaultProps, p);
  const { visible, onClose, image } = props;

  return (
    <Mask onClick={onClose} visible={!!(image && visible)}>
      <div className={classPrefix}>
        <img className={`${classPrefix}-img`} src={image} alt={image} />
      </div>
    </Mask>
  );
};
