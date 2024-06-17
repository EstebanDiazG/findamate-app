import styles from "./Card.module.scss";

interface ICard {
  children: React.ReactNode;
  width?: string;
  height?: string;
  gap?: string;
  justifyContent?: string;
}



const Card = ({children, width="auto", height="auto", gap, justifyContent="auto"}: ICard) => {
  return (
    <div className={styles.card} style={{gap, width, height, justifyContent}}>
        <div className={styles.rectangle} >
            {children}
        </div>
    </div>
  )
}

export default Card;

