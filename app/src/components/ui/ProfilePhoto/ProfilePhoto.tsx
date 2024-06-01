import styles from "./ProfilePhoto.module.scss";

interface IProfilePhoto {
  src?: string;
  alt?: string;
}

const ProfilePhoto = ({ src, alt }: IProfilePhoto) => {
  return (
    <div className={styles.profilePhotoContainer}>
      {src ? (
        <img src={src} alt={alt} className={styles.profilePhoto} />
      ) : (
        <img
          src="https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png"
          alt={alt}
          className={styles.profilePhoto}
        />
      )}
    </div>
  );
};

export default ProfilePhoto;

