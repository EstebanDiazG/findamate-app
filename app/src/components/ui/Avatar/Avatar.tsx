import styles from "./Avatar.module.scss";

interface IAvatar {
    src?: string;
    alt?: string;
}

const Avatar = ({src, alt}: IAvatar) => {
  return (
    <div>
        {src? (
        <img src={src} alt={alt} className={styles.avatar} />
        ) : (
            <img 
                src= {
                    "https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png" 
                }
                alt={alt} 
                className={styles.avatar}
                />
            )}
    </div>
  )
}

export default Avatar;
