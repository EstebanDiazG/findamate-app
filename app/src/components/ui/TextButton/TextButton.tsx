import React from 'react';
import styles from './TextButton.module.scss';

interface ITextButton {
  text: string;
  iconName: string;
  onClick: () => void;
  textSize?: string;
  textColor?: string;
}

const TextButton = ({
  text,
  iconName,
  onClick,
  textSize = '16px',
  textColor = 'black',
}: ITextButton) => {
  return (
    <button className={styles.textButtonWithIcon} onClick={onClick} style={{ fontSize: textSize, color: textColor }}>
      <span className={styles.text}>{text}</span>
      <span className={`material-symbols-outlined ${styles.icon}`} style={{ fontSize: textSize, color: textColor }}>
        {iconName}
      </span>
    </button>
  );
};

export default TextButton;
