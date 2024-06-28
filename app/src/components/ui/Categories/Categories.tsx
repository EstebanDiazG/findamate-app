import React from 'react';
import styles from './Categories.module.scss';
import Title from '../Tittle';

export type ICategories = {
  text?: string;
  width: string;
  height: string;
  justifyContent?: string;
  alignItems?: string;
  category: 'Ciencias y Tecnología' | 'Ciencias Sociales y Humanidades' | 'Negocios y Economía' | 'Artes y Creatividad' | 'Salud y Bienestar' | 'Hobbies y Ocio' | 'Desarrollo Personal y Profesional';
};

const categoryColors: Record<ICategories['category'], string> = {
  'Ciencias y Tecnología': 'blue',
  'Ciencias Sociales y Humanidades': 'red',
  'Negocios y Economía': 'green',
  'Artes y Creatividad': 'pink',
  'Salud y Bienestar': 'aqua',
  'Hobbies y Ocio': 'orange',
  'Desarrollo Personal y Profesional': 'violet',
};

const truncateText = (text: string, wordLimit: number) => {
  const safeText = text || "";
  const words = safeText.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return safeText;
};

const Categories = ({ text = "", width, height, alignItems, justifyContent, category }: ICategories) => {
  const colorClass = styles[categoryColors[category]];
  const truncatedText = truncateText(text, 3);
  return (
    <div 
      className={`${styles.rectangle} ${colorClass}`} 
      style={{ width, height, alignItems, justifyContent }}
    >
      <Title level="h2" alignItems="center">{truncatedText}</Title>
    </div>
  );
}

export default Categories;
