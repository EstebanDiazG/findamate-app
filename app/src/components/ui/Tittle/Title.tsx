import React from "react";
import styles from "./Title.module.scss";

interface ITitle {
  text: string;
  level: "h1" | "h2" | "h3" | "h4" | "p";
  color?: string;
}

const Title = ({ text, level, color = "auto" }: ITitle) => {
  const Heading = level;
  return (
    <div className={styles.headingContainer} style={{ color }}>
      <Heading>{text}</Heading>
    </div>
  );
};

export default Title;
