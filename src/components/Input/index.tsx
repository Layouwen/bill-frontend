import { ChangeEventHandler, FC } from 'react';
import './index.scss';

const classPrefix = `bw-input`;

type InputProps = {
  className?: string;
  label?: string;
  value?: string | number;
  placeholder?: string;
  onChange?: ChangeEventHandler;
};

const Input: FC<InputProps> = ({
  className = '',
  label,
  value,
  placeholder,
  onChange,
}) => {
  return (
    <label className={`${classPrefix}-wrapper ${className}`}>
      {label && <span className={`${classPrefix}-name`}>{label}</span>}
      <input
        onChange={onChange}
        className={classPrefix}
        type="text"
        placeholder={placeholder}
        value={value}
      />
    </label>
  );
};

export default Input;
