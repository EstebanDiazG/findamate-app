import React from 'react';

import styles from './Categories.module.scss';
import Title from '../Tittle';

interface ICategories {
  text: string;
  width: string;
  height: string;
  color: 'purple' | 'red' | 'green' | 'blue' | 'pink' | 'aqua' | 'orange' | 'violet';
}

const Categories = ({ text, width, height, color }: ICategories) => {
  const colorClass = styles[color];

  return (
    <div 
      className={`${styles.rectangle} ${colorClass}`} 
      style={{ width, height }}
    >
      <Title level="h2">{text}</Title>
    </div>
  );
}

export default Categories;
