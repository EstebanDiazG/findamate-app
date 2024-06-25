import React from "react";
import styles from "./Button.module.scss";

interface IButton {
  text: string;
  color: string;
  width?: string;
  height?: string;
  onClick: () => void;
}

const Button = ({ text, color, onClick, width = "auto", height = "auto" }: IButton) => {
  return (
    <div className={styles.buttonContainer}>
      <button onClick={onClick} className={`${styles.button} ${styles[color]}`} style={{ width, height }}>
        {text}
      </button>
    </div>
  );
};

export default Button;
