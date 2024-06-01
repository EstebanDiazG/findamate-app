import React from "react";
import styles from "./Input.module.scss";

interface IInput {
  name: string; // Agregar el atributo name
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
  name, // Agregar el atributo name
  placeholder,
  value,
  width = "auto",
  height = "auto",
  type = "text",
  onChange,
  onBlur,
  readOnly,
}: IInput) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!readOnly && onChange) {
      onChange(e);
    }
  };

  return (
    <div className={styles.inputContainer}>
      <input
        type={type}
        name={name} // Agregar el atributo name
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        readOnly={readOnly}
        className={styles.inputField}
        style={{ width, height }}
      />
    </div>
  );
};

export default Input;
