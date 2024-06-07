import React, { useState, useEffect } from "react";

import { useTopic, useCategoryInterest,useUser  } from "@/store/hooks";

import styles from "./Topic.module.scss";

import { ITopic } from "@/interfaces/topic";

const Topic = () => {
  const {
      topic,
      topicList,
      isLoading,
      isError,
      error,
      topicGetAll,
      topicGetById,
      topicGetByIdPerson,
      topicUpsert,
      topicDeleteById,
      topicReset,
      topicResetAll,
  } = useTopic();

  //Hook de categoria
  const {
    categoryInterest,
    categoryInterestList,
    isLoading: categoryInterestLoading,
    isError: categoryInterestError,
    error: categoryInterestErrorMessage,
    categoryInterestGetAll,
  } = useCategoryInterest();

  //Hook de User
  const { user } = useUser();

  useEffect(() => {
    topicGetAll();
    categoryInterestGetAll(); // Llama a categoryInterestGetAll para obtener las categorías
  }, [topicGetAll, categoryInterestGetAll]);
  
  const initialDataTopic = {
      id:"",
      id_person: "",
      id_imagen: "",
      id_video: "",
      id_file: "",
      title: "",
      creadorTopico:"", 
      imagen: "",
      content: "",
      createdAt: "",
      updatedAt: "",
      deletedAt: "",
      //nueva propiedad
      categoryId: "",
      categoryInterest: "",
  };
  
  const [formTopic, setFormTopic] = useState<ITopic>(initialDataTopic);
  const [selectedCategories, setSelectedCategories] = useState<{ [key: string]: string }>({});

  
  const handleOnChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormTopic({ ...formTopic, title: e.target.value });
  };

  const handleOnChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormTopic({ ...formTopic, content: e.target.value });
  };

  const handleOnChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = categoryInterestList?.find(category => category.id === e.target.value);
    if (selectedCategory) {
      setFormTopic({ ...formTopic, categoryId: e.target.value });
      setSelectedCategories(prev => ({
        ...prev,
        [formTopic.id]: selectedCategory.interes
      }));
    }
  };  

  const handleOnClickSave = () => {
    const id_person = user?.personId ?? "";
    const title = formTopic.title;
    const content = formTopic.content;
    const categoryId = formTopic.categoryId;
    const categoryInterest = formTopic.categoryInterest;

    topicUpsert(id_person, title, content);

    setSelectedCategories(prev => ({
      ...prev,
      [formTopic.id]: categoryInterest
    }));

    setFormTopic(initialDataTopic); // Limpia los campos después de guardar
  };

  const handleOnClickClean = () => {
    topicReset();
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
      <h1 className={styles.title}>Topics</h1>
      <div className={styles.topicList}>
        {topicList?.length &&
          topicList.map((item, idx) => (
            <div key={idx} className={styles.topicItem}>
              <h2>{item.title}</h2>
              <p>{item.content}</p>
              <small>By {item.creadorTopico}</small>
              <button className={`${styles.button} ${styles.deleteButton}`} onClick={() => handleOnClickDelete(item.id)}>X</button>
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
          value={formTopic.categoryId}
          onChange={handleOnChangeCategory}
          className={styles.selectField}
        >
          {categoryInterestList?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.interes}
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