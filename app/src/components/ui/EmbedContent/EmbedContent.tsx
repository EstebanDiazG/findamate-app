import React from "react";
import styles from "./EmbedContent.module.scss";

interface EmbedContentProps {
  content: string;
}

const EmbedContent: React.FC<EmbedContentProps> = ({ content }) => {
  const urlPattern = /https?:\/\/[^\s]+/g;
  const youtubePattern = /https?:\/\/(www\.)?youtube\.com\/watch\?v=([^\s&]+)/;
  const imagePattern = /\.(jpeg|jpg|gif|png)$/;

  const renderContent = (text: string) => {
    return text.split(urlPattern).reduce((acc, part, index, array) => {
      if (index < array.length - 1) {
        const match = text.match(urlPattern)?.[index];
        if (match && youtubePattern.test(match)) {
          const videoId = match.match(youtubePattern)?.[2];
          acc.push(<span key={index}>{part}</span>);
          acc.push(
            <div key={`${index}-video`} className={styles.videoWrapper}>
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          );
        } else if (match && imagePattern.test(match)) {
          acc.push(<span key={index}>{part}</span>);
          acc.push(
            <div key={`${index}-image`} className={styles.imageWrapper}>
              <img src={match} alt="Image" />
            </div>
          );
        } else {
          acc.push(
            <span key={index}>{part}</span>,
            <a key={`${index}-link`} href={match} target="_blank" rel="noopener noreferrer">
              {match}
            </a>
          );
        }
      } else {
        acc.push(<span key={index}>{part}</span>);
      }
      return acc;
    }, [] as JSX.Element[]);
  };

  return <div className={styles.embedContent}>{renderContent(content)}</div>;
};

export default EmbedContent;
