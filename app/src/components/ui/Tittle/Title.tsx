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
}

const Title = ({ children, text="", level, width="auto",  color = "auto", height="auto", justifyContent, alignContent, alignItems }: ITitle) => {
  const Heading = level;
  return (
    <div className={styles.headingContainer} style={{ color, width, height, justifyContent, alignContent, alignItems}}>
      <Heading>{text}</Heading>
      {children}
    </div>
  );
};

export default Title;
