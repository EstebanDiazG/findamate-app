import React from "react";
import styles from "./TextArea.module.scss"

interface ITextArea {
  name: string;
  placeholder: string;
  value: string;
  width?: string;
  height?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: () => void;
  readOnly?: boolean;
}

const TextArea = ({
  name,
  placeholder,
  value,
  width = "auto",
  height = "auto",
  onChange,
  onBlur,
  readOnly,
}: ITextArea) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!readOnly && onChange) {
      onChange(e);
    }
  };

  return (
    <div className={styles.inputContainer}>
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        readOnly={readOnly}
        className={styles.textAreaField}
        style={{ width, height }}
      />
    </div>
  );
};

export default TextArea;
