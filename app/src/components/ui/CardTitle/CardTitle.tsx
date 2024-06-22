import React from "react";
import styles from "./CardTitle.module.scss";

interface ICardTitle {
  children?: React.ReactNode;
  text?: string;
  level: "h1" | "h2" | "h3" | "h4" | "p";
  width?: string;
  color?: string;
  height?: string;
  justifyContent?: string;
  alignItems?: string;
  alignContent?: string;
}


const CardTitle = ({ children, text = "", level, width = "100%", color = "auto", height = "auto", justifyContent, alignContent, alignItems }: ICardTitle) => {
  const Heading = level;
  return (
    <div className={styles.cardTitleContainer} style={{ color, width, height, justifyContent, alignContent, alignItems }}>
      <Heading className={styles.cardTitle}>{text}</Heading>
      {children}
    </div>
  );
};

export default CardTitle;
