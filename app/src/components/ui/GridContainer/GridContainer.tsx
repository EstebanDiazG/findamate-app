import React from 'react';
import styles from "./GridContainer.module.scss";

interface IGridContainerProps {
  children: React.ReactNode;
  gap?: string;
}

const GridContainer = ({ children, gap }: IGridContainerProps) => {
  return (
    <div className={styles.gridContainer} style={{ gap }}>
      {children}
    </div>
  );
};

export default GridContainer;
