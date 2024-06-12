import React, { useState, useEffect } from "react";
import { useImage } from "@/store/hooks"; // Asegúrate de que la ruta sea correcta
import styles from "./Image.module.scss";
import { IImage } from "@/interfaces/image";

const initialData: IImage = {
  id: "",
  fieldname: "",
  originalname: "",
  encoding: "",
  mimetype: "",
  format: "",
  width: "",
  height: "",
  size: "",
  url: "",
  createdAt: "",
  updatedAt: "",
  deletedAt: "",
  statusCode: "",
};

interface Image {
  id: string;
  url: string;
}

const Image: React.FC = () => {
  const {
    imageList,
    isLoading,
    isError,
    error,
    imageSearch,
    imageUpload,
    imageResetAll,
    imageReset,
  } = useImage();

  const [formImage, setFormImage] = useState<IImage>(initialData);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [results, setResults] = useState<Image[]>([]);

  useEffect(() => {
    imageSearch();
    console.log(imageList);
  }, [imageSearch]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      imageUpload(selectedFile);
      setSelectedFile(null);
    }
  };

  const handleReset = () => {
    setFormImage(initialData);
    imageReset();
  };

  return (
    <div className={styles.imageContainer}>
      <h1>Galería de Imágenes</h1>
      {isLoading && <p>Cargando...</p>}
      {isError && <p>Error: {error}</p>}
      <div className={styles.imageGrid}>
        {Array.isArray(imageList) &&
          imageList.map((image) => {
            return (
              <div key={image.id} className={styles.imageItem}>
                <img
                  src={`http://localhost:3000/${image.url}`}
                  alt={image.id}
                  width={100} // Ajusta el ancho según tus necesidades
                  height={100} // Ajusta la altura según tus necesidades
                />
                <p>{image.id}</p>
              </div>
            );
          })}
      </div>
      <div className={styles.uploadContainer}>
        <input type="file" className="input-file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Subir Imagen</button>
        <button onClick={handleReset}>Resetear</button>
      </div>
    </div>
  );
};

export default Image;
