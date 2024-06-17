import React from "react";

import styles from "./Content.module.scss";

interface IContent {
  children: React.ReactNode;
  gap?: string;
  justifyContent?: string;
  alignItems?: string;
  width?: string;
  height?: string;
}

const ContentCol = ({ children, gap, width="auto", height="auto", justifyContent, alignItems}: IContent) => {
  return (
    <div 
      className={styles.contentCol} 
      style={{ gap, width, height, justifyContent, alignItems}}>
      {children}
    </div>
  );
};


const ContentRow = ({ children, gap, justifyContent, width="auto", height="auto", alignItems }: IContent) => {
  return (
    <div
      className={styles.contentRow}
      style={{ gap, justifyContent, width, height, alignItems}}>
      {children}
    </div>
  );
};

export { ContentCol, ContentRow };
