import React from "react";
import styles from "./CheckboxGroup.module.scss";

interface ICheckboxGroup {
  name: string;
  selectedValues: string[];
  onChange: (value: string) => void;
  options: Array<{ id: string; name: string }>;
}

const CheckboxGroup: React.FC<ICheckboxGroup> = ({
  name,
  selectedValues,
  onChange,
  options,
}) => {
  return (
    <div className={styles.checkboxGroup}>
      {options.map((option) => (
        <div key={option.id} className={styles.checkboxItem}>
          <input
            type="checkbox"
            id={`checkbox-${option.id}`}
            name={name}
            value={option.id}
            checked={selectedValues.includes(option.id)}
            onChange={() => onChange(option.id)}
          />
          <label htmlFor={`checkbox-${option.id}`}>
            {option.name}
          </label>
       
        </div>
      ))}
    </div>
  );
};

export default CheckboxGroup;
