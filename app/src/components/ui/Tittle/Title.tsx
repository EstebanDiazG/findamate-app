import React from "react";
import styles from "./Title.module.scss";

interface ITitle {
  text: string;
  level: "h1" | "h2" | "h3" | "h4" | "p";
  width?: string;
  color?: string;
}

const Title = ({ text, level, width="auto",  color = "auto" }: ITitle) => {
  const Heading = level;
  return (
    <div className={styles.headingContainer} style={{ color, width}}>
      <Heading>{text}</Heading>
    </div>
  );
};

export default Title;
