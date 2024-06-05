import styles from "./Rectangle.module.scss";

interface IRectangle {
    children: React.ReactNode;
    }

const Rectangle = ({children}: IRectangle) => {
  return (
    <div 
        className={styles.rectangle}>
        {children}
    </div>
  )
}

export default Rectangle;   
