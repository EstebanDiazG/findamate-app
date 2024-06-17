import React from "react";

import styles from "./ButtonIcon.module.scss";

interface IButtonIcon {
  iconName: string;
  onClick: () => void;
  hasBorder?: boolean;
}

const ButtonIcon = ({ iconName, onClick, hasBorder = true }: IButtonIcon) => {
  return (
    <div className={styles.buttonIcon}>
      <button
        onClick={onClick}
        className={
          styles[hasBorder ? "buttonIcon-border" : "buttonIcon-no-border"]
        }
      >
        <span className="material-symbols-outlined">{iconName}</span>
      </button>
    </div>
  );
};

export default ButtonIcon;
