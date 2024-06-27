import React from "react";
import styles from "./RadioButtonGroup.module.scss";

interface IRadioButtonGroup {
  name: string;
  selectedValue: string;
  onChange: (value: string) => void;
  options: Array<{ id: string; name: string }>;
}

const RadioButtonGroup: React.FC<IRadioButtonGroup> = ({
  name,
  selectedValue,
  onChange,
  options,
}) => {
  return (
    <div className={styles.radioButtonGroup}>
      {options.map((option) => (
        <div key={option.id} className={styles.radioButtonItem}>
          <input
            type="radio"
            id={`radio-${option.id}`}
            name={name}
            value={option.id}
            checked={selectedValue === option.id}
            onChange={() => onChange(option.id)}
          />
          <label htmlFor={`radio-${option.id}`}>
            {option.name}
          </label>
        </div>
      ))}
    </div>
  );
};

export default RadioButtonGroup;
