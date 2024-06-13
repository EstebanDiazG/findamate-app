import React, { useState, useEffect } from "react";
import { useMessageTopic, useUser, useTopic } from "@/store/hooks";
import styles from "./TopicDetail.module.scss";
import { IMessageTopic } from "@/interfaces/messageTopic";

const TopicDetail = () => {
  const {
    messageTopic,
    messageTopicList,
    messageTopicGetAll,
    messageTopicCreateMessage,
    messageTopicDeleteById,
  } = useMessageTopic();

  const { user } = useUser();
  const { topic } = useTopic();

  const initialDataMessageTopic = {
    id: "",
    id_person: "",
    id_topic: "",
    creadorMensaje: "",
    content: "",
    createdAt: "",
    updatedAt: "",
    deletedAt: "",
  };

  const [file, setFile] = useState<File | null>(null);
  const [formMenssageTopic, setFormMessageTopic] = useState<IMessageTopic>(initialDataMessageTopic);
  const [localMessageTopicList, setLocalMessageTopicList] = useState<IMessageTopic[]>([]);

  const handleOnChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormMessageTopic({ ...formMenssageTopic, content: e.target.value });
  };

  const handleOnChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleOnClickSave = async () => {
    const id_person = user?.personId ?? "";
    const id_topic = topic?.id ?? "";
    const content = formMenssageTopic.content;

    try {
      await messageTopicCreateMessage(id_person, id_topic, content);
      messageTopicGetAll();
      setFormMessageTopic(initialDataMessageTopic);
    } catch (error) {
      console.error("Error creating message:", error);
    }
  };

  const handleOnClickDelete = async (id: string) => {
    await messageTopicDeleteById(id);
    setLocalMessageTopicList(localMessageTopicList.filter((message) => message.id !== id));
  };

  useEffect(() => {
    messageTopicGetAll();
  }, [messageTopicGetAll]);

  useEffect(() => {
    if (messageTopicList) {
      setLocalMessageTopicList(messageTopicList);
    }
  }, [messageTopicList]);

  const linkify = (text: string) => {
    const urlPattern = /https?:\/\/[^\s]+/g;
    const youtubePattern = /https?:\/\/(www\.)?youtube\.com\/watch\?v=([^\s&]+)/;

    return text.split(urlPattern).reduce((acc, part, index, array) => {
      if (index < array.length - 1) {
        const match = text.match(urlPattern)?.[index];
        if (match && youtubePattern.test(match)) {
          const videoId = match.match(youtubePattern)?.[2];
          acc.push(<span key={index}>{part}</span>);
          acc.push(
            <div key={`${index}-video`} className={styles.videoWrapper}>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${videoId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          );
        } else {
          acc.push(
            <span key={index}>{part}</span>,
            <a key={`${index}-link`} href={match} target="_blank" rel="noopener noreferrer">
              {match}
            </a>
          );
        }
      } else {
        acc.push(<span key={index}>{part}</span>);
      }
      return acc;
    }, [] as JSX.Element[]);
  };

  const filteredComments = localMessageTopicList.filter(comment => comment.id_topic === topic?.id) || [];

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Comentarios del Tópico {topic?.id}</h3>
      <div className={styles.commentList}>
        {filteredComments.length > 0 ? (
          filteredComments.map((comment, idx) => (
            <div key={idx} className={styles.commentCard}>
              {comment.id_person === user?.personId && (
                <button className={styles.deleteButton} onClick={() => handleOnClickDelete(comment.id)}>
                  &times;
                </button>
              )}
              <h2>{comment.creadorMensaje}</h2>
              <p>{linkify(comment.content)}</p>
            </div>
          ))
        ) : (
          <p>No se encontraron comentarios.</p>
        )}
      </div>
      <div className={styles.commentForm}>
        <textarea
          value={formMenssageTopic.content}
          onChange={handleOnChangeContent}
          placeholder="Escribe un comentario..."
        />
        <input type="file" className={styles.fileInput} onChange={handleOnChangeFile} />
        <button onClick={handleOnClickSave}>Enviar</button>
      </div>
    </div>
  );
};

export default TopicDetail;
