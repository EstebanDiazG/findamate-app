import React from "react";
import styles from "./ComboBox.module.scss";

interface IComboBox {
  label: string;
  value: string;
  onChange: any;
  data: any;
  optionValueName: string;
  optionTextName: string;
  placeholder?: string;
  width?: string;
  disabled?: boolean;
}

const ComboBox: React.FC<IComboBox> = ({
  label,
  value,
  onChange,
  data,
  optionValueName,
  optionTextName,
  placeholder,
  disabled,
  width = "200px",
}) => {
  return (
    <div className={styles.comboBox} style={{ width }}>
      <label>{label}</label>
      <select 
        onChange={onChange} 
        disabled={disabled}
        value={value}>
        {placeholder && <option 
        value="0">{placeholder}</option>}
        {data?.length &&
          data.map((item: any, idx: any) => (
            <option key={idx} 
        value={item[optionValueName]}>
              {item[optionTextName]}
            </option>
          ))}
      </select>
    </div>
  );
};

export default ComboBox;
