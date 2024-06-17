import styles from "./Avatar.module.scss";

interface IAvatar {
    src?: string;
    alt?: string;
    width?: string;
    height?: string;
    
}

const Avatar = ({src, alt, width="auto", height="auto"}: IAvatar) => {
  return (
    <div>
        {src? (
        <img src={src} alt={alt} className={styles.avatar} ></img> 
        ) : (
            <img 
                src= {
                    "https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png" 
                }
                alt={alt} 
                className={styles.avatar}
                style={{width, height}}
                />
            )}
    </div>
  )
}

export default Avatar;
