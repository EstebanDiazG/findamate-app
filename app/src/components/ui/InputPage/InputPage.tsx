import React from "react";
import styles from "./InputPage.module.scss";

interface IInputPage {
  placeholder: string;
  value: string;
  width?: string;
  height?: string;
  type?: "text" | "password";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  readOnly?: boolean;
  label?: string;  // Añadido para incluir una etiqueta
}

const InputPage = ({
  placeholder,
  value,
  width = "auto",
  height = "auto",
  type = "text",
  onChange,
  onBlur,
  readOnly,
  label,  // Añadido para incluir una etiqueta
}: IInputPage) => {
  return (
    <div className={styles.inputContainer}>
      {label && <label className={styles.inputLabel}>{label}</label>}  {/* Añadido para mostrar la etiqueta */}
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

export default InputPage;
