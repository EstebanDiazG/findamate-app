import React from "react";
import styles from "./Title.module.scss";

interface ITitle {
  children?: React.ReactNode;
  text?: string;
  level: "h1" | "h2" | "h3" | "h4" | "p";
  width?: string;
  color?: string;
  height?: string;
  justifyContent?: string;
  alignItems?: string;
  alignContent?: string;
  onClick?: () => void; // Añade la prop onClick de tipo función
}

const Title = ({ children, text = "", level, width = "auto", color = "auto", height = "auto", justifyContent, alignContent, alignItems, onClick }: ITitle) => {
  const Heading = level;

  return (
    <div className={styles.headingContainer} style={{ color, width, height, justifyContent, alignContent, alignItems }} onClick={onClick}>
      <Heading>{text}</Heading>
      {children}
    </div>
  );
};

export default Title;
