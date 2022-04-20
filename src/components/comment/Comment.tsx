import { Icon } from '@/components';
import classNames from 'classnames';
import { ChangeEvent, FC, useRef, useState } from 'react';

const classPrefix = 'bwm-comment';

type CommentProps = {
  data: {
    shareCount: number;
    likeCount: number;
    commentCount: number;
    startCount?: number;
    isLike?: boolean;
  };
  onSubmit?: (text: string) => void;
  onStart?: () => void;
  onLike?: () => void;
  onShare?: () => void;
};

export const Comment: FC<CommentProps> = ({
  onSubmit,
  data,
  onShare,
  onLike,
  onStart,
}) => {
  const textareaEl = useRef<HTMLTextAreaElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState('');

  return (
    <div className={classPrefix}>
      <textarea
        ref={textareaEl}
        className={classNames(`${classPrefix}-test`, {
          [`${classPrefix}-test-editing`]: isEditing,
        })}
        value={content}
        placeholder="写评论..."
        onBlur={() => {
          setIsEditing(false);
          textareaEl.current?.removeAttribute('style');
        }}
        onFocus={() => {
          setIsEditing(true);
          const el = textareaEl.current;
          setTimeout(() => {
            el && (el.style.height = el.scrollHeight + 'px');
          }, 0);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.stopPropagation();
            onSubmit?.(content);
            setTimeout(() => setContent(''), 0);
            textareaEl.current?.removeAttribute('style');
            textareaEl.current?.blur();
          }
        }}
        onInput={(e: ChangeEvent<HTMLTextAreaElement>) => {
          const el = e.target;
          el.style.height = el.scrollHeight + 'px';
          setContent(el.value);
        }}
      />
      {!isEditing && (
        <div className={`${classPrefix}-icon`}>
          <div className={`${classPrefix}-box`} onClick={onShare}>
            <span>{data?.shareCount || 0}</span>
            <Icon name="share" />
          </div>
          <div className={`${classPrefix}-box`} onClick={onStart}>
            <span>{data?.startCount || 0}</span>
            <Icon name="start" />
          </div>
          <div className={`${classPrefix}-box`} onClick={onLike}>
            <span>{data?.likeCount || 0}</span>
            <Icon name={data?.isLike ? 'like-fill' : 'like'} />
          </div>
        </div>
      )}
    </div>
  );
};
