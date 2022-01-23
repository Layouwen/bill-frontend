import { ChangeEventHandler, FC } from 'react';
import './index.scss';

const classPrefix = `bw-input`;

type InputProps = {
  className?: string;
  label?: string;
  value?: string | number;
  type?: string;
  placeholder?: string;
  onChange?: ChangeEventHandler;
};

const Input: FC<InputProps> = ({
  className = '',
  label = 'input',
  type = 'text',
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
        type={type}
        placeholder={placeholder}
        value={value}
      />
    </label>
  );
};

export default Input;
