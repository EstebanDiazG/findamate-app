

import React from "react";
import styles from "./ClickableTitle.module.scss";

interface IClickableTitle {
  children?: React.ReactNode;
  text?: string;
  level: "h1" | "h2" | "h3" | "h4" | "p";
  width?: string;
  color?: string;
  height?: string;
  justifyContent?: string;
  alignItems?: string;
  alignContent?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const ClickableTitle: React.FC<IClickableTitle> = ({
  children,
  text = "",
  level,
  width = "auto",
  color = "auto",
  height = "auto",
  justifyContent,
  alignContent,
  alignItems,
  onClick,
  style,
}: IClickableTitle) => {
  const Heading = level;

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      className={styles.clickableTitleContainer}
      style={{ color, width, height, justifyContent, alignContent, alignItems, ...style }}
      onClick={handleClick}
    >
      <Heading>{text}</Heading>
      {children}
    </div>
  );
};

export default ClickableTitle;
