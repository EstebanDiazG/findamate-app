import React from "react";

import styles from "./Container.module.scss";

interface IContainer {
  children: React.ReactNode;
  gap?: string;
  width?: string;
  height?: string;
  
}

const Container = ({ children, gap, width, height }: IContainer) => {
  return (
    <div className={styles.container} style={{ gap, width, height }}>
      {children}
    </div>
  );
};

export default Container;
