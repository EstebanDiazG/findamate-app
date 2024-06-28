import React from 'react';
import styles from './CommentCount.module.scss';

interface CommentCountProps {
  count: number;
}

const CommentCount: React.FC<CommentCountProps> = ({ count }) => {
  return (
    <div className={styles.commentCount}>
      <span>{count} comentarios</span>
    </div>
  );
};

export default CommentCount;
