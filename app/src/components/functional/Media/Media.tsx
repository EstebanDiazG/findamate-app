import React, { useState, useEffect } from "react";
import { useMedia } from "@/store/hooks";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");

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

  const openModal = (mediaUrl: string, mediaTitle: string) => {
    setModalContent(mediaUrl);
    setModalTitle(mediaTitle);
    setIsModalOpen(true);
  };

  const renderModal = () =>
    isModalOpen && (
      <div className="modal">
        <h2>{modalTitle}</h2>
        <img src={modalContent} alt={modalTitle} />
        <button onClick={() => setIsModalOpen(false)}>Cerrar</button>
      </div>
    );

  const renderMedia = (media: IMedia) => {
    if (media.mimetype && media.mimetype.startsWith("image/")) {
      return (
        <img
          src={`http://localhost:3000/uploads/media/${media.internal_name}`}
          alt={media.original_name}
          onClick={() =>
            openModal(
              `http://localhost:3000/uploads/media/${media.internal_name}`,
              media.original_name
            )
          }
        />
      );
    } else if (media.mimetype && media.mimetype.startsWith("video/")) {
      return (
        <video
          controls
          src={`http://localhost:3000/uploads/media/${media.internal_name}`}
          onClick={() =>
            openModal(
              `http://localhost:3000/uploads/media/${media.internal_name}`,
              media.original_name
            )
          }
        />
      );
    } else if (media.mimetype && media.mimetype.startsWith("audio/")) {
      return (
        <audio
          controls
          src={`http://localhost:3000/uploads/media/${media.internal_name}`}
          onClick={() =>
            openModal(
              `http://localhost:3000/uploads/media/${media.internal_name}`,
              media.original_name
            )
          }
        />
      );
    } else {
      return (
        <a
          href={`http://localhost:3000/uploads/media/${media.internal_name}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Descargar {media.original_name}
        </a>
      );
    }
  };

  const handleReset = () => {
    setFormMedia(initialData);
    mediaReset();
  };

  useEffect(() => {
    mediaSearchMedia();
  }, [mediaSearchMedia]);

  useEffect(() => {
    if (Array.isArray(mediaList)) {
      setLocalMediaList(mediaList);
    }
  }, [mediaList]);

  return (
    <div className={styles.imageContainer}>
      <h1>Archivos</h1>
      {isLoading && <p>Cargando...</p>}
      {isError && <p>Error: {error}</p>}
      <div className={styles.imageGrid}>
        {Array.isArray(mediaList) &&
          mediaList.map((media) => {
            let mediaElement = renderMedia(media);
            let mediaUrl = `http://localhost:3000/uploads/media/${media.internal_name}`;

            return (
              <div key={media.id} className={styles.imageItem}>
                {mediaElement}
                <img src={media ? mediaUrl : ""} alt={media.original_name} />
              </div>
            );
          })}
      </div>
      {renderModal()}
      <div className={styles.uploadContainer}>
        <input type="file" className="input-file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Subir File</button>
        <button onClick={handleReset}>Resetear</button>
      </div>
    </div>
  );
};

export default Media;
