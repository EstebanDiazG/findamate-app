import styles from "./Card.module.scss";

interface ICard {
  children: React.ReactNode;
  width?: string;
  height?: string;
  gap?: string;
  padding?: string;
  justifyContent?: string;
}



const Card = ({children, width="auto", height="auto", gap, justifyContent="auto", padding}: ICard) => {
  return (
    <div className={styles.card} style={{gap, width, height, justifyContent, padding}}>
        <div className={styles.rectangle} >
            {children}
        </div>
    </div>
  )
}

export default Card;

