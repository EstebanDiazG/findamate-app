import React from 'react'
import styles from "./ContentHeader.module.scss";

interface IContentHeader {
    children: React.ReactNode;
    gap?: string;
    justifyContent?: string;
    alignItems?: string;
    width?: string;
    height?: string;
}

const ContentHeader = ({ children, gap, justifyContent, width="auto", height="auto", alignItems }: IContentHeader) => {
  return (
    <div
    className={styles.content}
    style={{ gap, justifyContent, width, height, alignItems}}>
    {children}
  </div>
  )
}

export default ContentHeader;