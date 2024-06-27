import React, { useState } from "react";
import styles from "./Avatar.module.scss";

interface IAvatar {
  src?: string;
  alt?: string;
  width?: string;
  height?: string;
  onImageChange?: (file: File) => void;
}

const Avatar = ({ src, alt, width = "auto", height = "auto", onImageChange }: IAvatar) => {
  const [imageSrc, setImageSrc] = useState<string | undefined>(src);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
        onImageChange && onImageChange(file);
      };
      reader.readAsDataURL(file);
    }
  };

 
  const handleEditClick = () => {
    const fileInput = document.getElementById("avatar-upload-input");
    if (fileInput) {
      fileInput.click(); // Simula el clic en el input de tipo archivo
    }
  };

  return (
    <div className={styles.avatarContainer}>
      <div className={styles.avatarWrapper} style={{ width, height }}>
        <img src={imageSrc || "https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png"} alt={alt} className={styles.avatar} />
        {width === "170px" && height === "170px" && ( 
          <label htmlFor="avatar-upload-input" className={styles.editButton} onClick={handleEditClick}>
            Editar
          </label>
        )}
        <input
          id="avatar-upload-input"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className={styles.fileInput}
        />
      </div>
    </div>
  );
};

export default Avatar;
