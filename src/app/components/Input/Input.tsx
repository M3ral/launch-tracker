import React from "react";
import style from "./Input.module.scss";
export interface InputProps {
  value: string;
  id: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({
  value,
  id,
  onChange,
  label,
  ...props
}) => {
  return (
    <div className={style["form-group"]}>
      <label htmlFor={id}>{label}</label>
      <input type="date" id={id} onChange={onChange} value={value} {...props} />
    </div>
  );
};
