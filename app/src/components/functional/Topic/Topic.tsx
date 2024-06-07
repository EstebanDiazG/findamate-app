import React, { useState, useEffect } from "react";

import { useTopic, useInterest, useUser } from "@/store/hooks";

import styles from "./Topic.module.scss";
import Container from "@/components/layout/Container";

import { ITopic } from "@/interfaces/topic";

const Topic = () => {
  const {
    topic,
    topicList,
    topicGetAll,
    topicGetById,
    topicGetByIdPerson,
    topicUpsert,
    topicDeleteById,
    topicReset,
    topicResetAll,
  } = useTopic();

  //hook de interes
  const {
    interest,
    interestList,
    isLoading: interestLoading,
    isError: interestError,
    error: interestErrorMessage,
    interestGetAll,
  } = useInterest();

  //Hook de User
  const { user } = useUser();

  useEffect(() => {
    topicGetAll();
    interestGetAll(); // Llama a categoryInterestGetAll para obtener las categorías
  }, [topicGetAll, interestGetAll]);

  const initialDataTopic = {
    id: "",
    id_person: "",
    id_imagen: "",
    id_video: "",
    id_file: "",
    title: "",
    creadorTopico: "",
    imagen: "",
    content: "",
    createdAt: "",
    updatedAt: "",
    deletedAt: "",
    //nueva propiedad
    interestId: "",
    categoryInterest: "",
    Interest: "",
  };

  const [formTopic, setFormTopic] = useState<ITopic>(initialDataTopic);
  const [selectedCategories, setSelectedCategories] = useState<{
    [key: string]: string;
  }>({});

  const handleOnChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormTopic({ ...formTopic, title: e.target.value });
  };

  const handleOnChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormTopic({ ...formTopic, content: e.target.value });
  };

  const handleOnChangeInterest = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = interestList?.find(
      (category) => category.id === e.target.value
    );
    if (selectedCategory) {
      setFormTopic({ ...formTopic, interestId: e.target.value });
      setSelectedCategories((prev) => ({
        ...prev,
        [formTopic.id]: selectedCategory.id,
      }));
    }
  };

  const handleOnClickSave = () => {
    const id_person = user?.personId ?? "";
    const title = formTopic.title;
    const content = formTopic.content;
    const id_interest = formTopic.interestId;

    topicUpsert(id_person, title, content, id_interest);
    setFormTopic(initialDataTopic); // Limpia los campos después de guardar
  };

  const handleOnClickDelete = (id: string) => {
    topicDeleteById(id);
    topicReset();
  };

  useEffect(() => {
    topicGetAll();
  }, [topicGetAll]);

  useEffect(() => {
    if (topic) {
      setFormTopic(topic);
      topicGetAll();
    }
  }, [topic, topicGetAll]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Foros</h1>
      <div className={styles.topicList}>
        {topicList?.length &&
          topicList.map((item, idx) => (
            <div key={idx} className={styles.topicItem}>
              <h2>{item.title}</h2>
              <p>{item.content}</p>
              <small>{item.Interest}</small>
              <br />
              <small>{item.categoryInterest}</small>
              <br />
              <small>By {item.creadorTopico}</small>

              <button
                className={`${styles.button} ${styles.deleteButton}`}
                onClick={() => handleOnClickDelete(item.id)}
              >
                X
              </button>
            </div>
          ))}
      </div>
      <button
        className={styles.floatingButton}
        onClick={() => setFormTopic(initialDataTopic)}
      >
        +
      </button>
      <div className={styles.topicForm}>
        <input
          type="text"
          value={formTopic.title}
          placeholder="Title"
          onChange={handleOnChangeTitle}
          className={styles.inputField}
        />
        <textarea
          value={formTopic.content}
          placeholder="Content"
          onChange={handleOnChangeContent}
          className={styles.textArea}
        />
        <select
          value={formTopic.interestId}
          onChange={handleOnChangeInterest}
          className={styles.selectField}
        >
          {interestList?.map((interest) => (
            <option key={interest.id} value={interest.id}>
              {interest.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={user?.name}
          placeholder="Creator"
          readOnly
          className={styles.inputField}
        />
        <input
          type="text"
          value={user?.personId}
          placeholder="Person ID"
          readOnly
          className={styles.inputField}
        />

        <button className={styles.button} onClick={handleOnClickSave}>
          Guardar
        </button>
      </div>
    </div>
  );
};

export default Topic;
