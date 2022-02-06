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
    <>
      {visible && image ? (
        <div className={classPrefix} onClick={onClose}>
          <img className={`${classPrefix}-img`} src={image} alt={image} />
        </div>
      ) : null}
    </>
  );
};
