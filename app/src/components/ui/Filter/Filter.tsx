import React, { useState } from "react";
import styles from "./Filter.module.scss";

interface FilterProps {
  label: string;
  options: string[];
  onFilterChange: (category: string | null) => void;
}

const Filter: React.FC<FilterProps> = ({ label, options, onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    onFilterChange(category);
  };

  return (
    <div className={styles.filter}>
      <label>{label}</label>
      <div className={styles.options}>
        {options.map((option, index) => (
          <button
            key={index}
            className={`${styles.optionButton} ${selectedCategory === option ? styles.selected : ""}`}
            onClick={() => handleCategoryChange(option)}
          >
            {option}
          </button>
        ))}
        <button
          className={`${styles.optionButton} ${selectedCategory === null ? styles.selected : ""}`}
          onClick={() => handleCategoryChange(null)}
        >
          Todos
        </button>
      </div>
    </div>
  );
};

export default Filter;

