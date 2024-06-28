import React from 'react'
import styles from "./ForumResponse.module.scss";

interface IForumResponse {
    children: React.ReactNode;
    width?: string;
    height?: string;
    gap?: string;
    padding?: string;
    justifyContent?: string;
  }

const ForumResponse = ({
    children,
    width = "auto",
    height = "auto",
    gap,
    justifyContent = "auto",
    padding
  }: IForumResponse) => {
    return (
      <div className={styles.card} style={{ gap, width, height, justifyContent, padding }}>
        <div className={styles.rectangle}>
          {children}
        </div>
      </div>
    );
  }

export default ForumResponse;