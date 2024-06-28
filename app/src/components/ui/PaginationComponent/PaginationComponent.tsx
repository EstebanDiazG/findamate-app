// PaginationComponent.tsx

import React from 'react';
import styles from './PaginationComponent.module.scss';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (pageNumber: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  return (
    <div className={styles.pagination}>
      {[...Array(totalPages)].map((_, index) => (
        <button key={index} onClick={() => handlePageChange(index + 1)}>
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default PaginationComponent;
