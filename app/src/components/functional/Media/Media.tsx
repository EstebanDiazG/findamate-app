import React, { useState, useEffect } from "react";
import { useMedia} from "@/store/hooks";
import styles from "./Media.module.scss";
import { IMedia } from "@/interfaces/media";

const initialData: IMedia = {
    id: "",
    type: "",
    original_name: "",
    internal_name: "",
    mimetype: "",
    format: "",
    encoding: "",
    path: "",
    size: "",
    width: "",
    height: "",
    status_code: "",
    url: "",
    createdAt: "",
    updatedAt: "",
    deletedAt: "",
    statusCode: "",
};

interface Media {
    id: string;
    url: string;
};

const Media: React.FC = () => {
    const {
        media,
        mediaList,
        isLoading,
        isError,
        error,
        mediaSearchMedia,
        mediaUploadMedia,
        mediaResetAll,
        mediaReset,
    } = useMedia();

  const [formMedia, setFormMedia] = useState<IMedia>(initialData);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [localMediaList, setLocalMediaList] = useState<IMedia[]>([]);

  useEffect(() => {
    mediaSearchMedia();
  }, [mediaSearchMedia]);

  useEffect(() => {
    if (Array.isArray(mediaList)) {
        setLocalMediaList(mediaList);
    }
  }, [mediaList]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      await mediaUploadMedia(selectedFile);
      mediaSearchMedia();
      setSelectedFile(null);
    }
  };

  const handleReset = () => {
    setFormMedia(initialData);
    mediaReset();
  };

  return (
    <div className={styles.imageContainer}>
      <h1>Archivos</h1>
      {isLoading && <p>Cargando...</p>}
      {isError && <p>Error: {error}</p>}
      <div className={styles.imageGrid}>
        {Array.isArray(mediaList) &&
          mediaList.map((media) => {
            return (
              <div key={media.id} className={styles.imageItem}>
                <img
                  src={`http://localhost:3000/uploads/media/${media.internal_name}`}
                />
                <h3>{media.id}</h3>
              </div>
            );
          })}
      </div>
      <div className={styles.uploadContainer}>
        <input type="file" className="input-file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Subir File</button>
        <button onClick={handleReset}>Resetear</button>
      </div>
    </div>
  );
};

export default Media;