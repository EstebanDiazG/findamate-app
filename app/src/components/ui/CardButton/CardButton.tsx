import styles from "./CardButton.module.scss";

interface ICardButton {
    width?: string;
    height?: string;
    iconName: string;
    onClick: () => void;
  }


const CardButton = ({onClick, width="auto", height="auto", iconName}: ICardButton) => {
  return (
    <div className={styles.cardButton} >
      <button onClick={onClick} className={styles.button}style={{width, height}}>
        <span className="material-symbols-outlined">{iconName}</span>
      </button>
    </div>
  )
}

export default CardButton;
