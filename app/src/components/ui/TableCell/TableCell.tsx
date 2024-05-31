import React from "react";

import { ContentRow } from "@/components/layout/Content";

import styles from "./TableCell.module.scss";

interface ITableCell {
  children: React.ReactNode;
}

export const TableCell = ({ children }: ITableCell) => {
  return (
    <div className={styles.tableCell}>
      <ContentRow gap="10px">{children}</ContentRow>
    </div>
  );
};

export default TableCell;
