import React from "react";
import styles from "./TopicText.module.scss";

interface ITopicText {
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

const TopicText = ({ children, text = "", level, width = "100%", color = "auto", height = "auto", justifyContent, alignContent, alignItems }: ITopicText) => {
  const Heading = level;
  return (
    <div className={styles.topicTextContainer} style={{ color, width, height, justifyContent, alignContent, alignItems }}>
      <Heading className={styles.topicText}>{text}</Heading>
      {children}
    </div>
  );
};

export default TopicText;

