import React from "react";

import styles from "./Content.module.scss";

interface IContent {
  children: React.ReactNode;
  gap?: string;
  justifyContent?: string;
  width?: string;
  height?: string;
}

const ContentCol = ({ children, gap, width="auto", height="auto", justifyContent="center" }: IContent) => {
  return (
    <div 
      className={styles.contentCol} 
      style={{ gap, width, height, justifyContent}}>
      {children}
    </div>
  );
};


const ContentRow = ({ children, gap, justifyContent, width="auto", height="auto" }: IContent) => {
  return (
    <div
      className={styles.contentRow}
      style={{ gap, justifyContent, width, height }}>
      {children}
    </div>
  );
};

export { ContentCol, ContentRow };
