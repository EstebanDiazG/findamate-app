import React from "react";
import styles from "./Input.module.scss";

interface IInput {
  placeholder: string;
  value: string;
  width?: string;
  height?: string;
  type?: "text" | "password";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  readOnly?: boolean;
}

const Input = ({
  placeholder,
  value,
  width = "auto",
  height = "auto",
  type = "text",
  onChange,
  onBlur,
  readOnly,
}: IInput) => {
  return (
    <div className={styles.inputContainer}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        readOnly={readOnly}
        className={styles.inputField}
        style={{ width, height }}
      />
    </div>
  );
};

export default Input;
