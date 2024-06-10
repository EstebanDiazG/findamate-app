import React, { useState, useEffect } from "react";

import { useTopic, useInterest, useUser } from "@/store/hooks";

import Window from "@/components/ui/Window";
import { ContentCol, ContentRow } from "@/components/layout/Content";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import FloatMenu from "@/components/ui/FloatMenu";

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
  const [searchTerm, setSearchTerm] = useState(""); //estado de busqueda
  const [selectedCategories, setSelectedCategories] = useState<{
    [key: string]: string;
  }>({});
  const [isDisplayWindow, setIsDisplayWindow] = useState(false);
  const [windowTitle, setWindowTitle] = useState("Nuevo Foro");

  const dataMenu = [
    {
      icon: "add",
      onClick: () => handleOnClickAdd(),
    },
  ];

  const handleOnClickAdd = () => {
    setFormTopic(initialDataTopic);
    topicReset();
    setIsDisplayWindow(true);
    setWindowTitle("Nuevo Foro");
  };

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
    console.log("Saving topic with:", {
      id_person,
      title,
      content,
      id_interest,
    });

    topicUpsert(id_person, title, content, id_interest);
    setIsDisplayWindow(false);
    setFormTopic(initialDataTopic); // Limpia los campos después de guardar
  };

  useEffect(() => {
    if (interestList?.length && !formTopic.interestId) {
      setFormTopic((prevForm) => ({
        ...prevForm,
        interestId: interestList[0].id,
      }));
    }
  }, [interestList]);

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

  //filta la lista segun lo buscado
  const filteredTopics = topicList
    ? topicList.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Foros</h1>

      {/* Campo de entrada para la búsqueda */}
      <input
        type="text"
        placeholder="Buscar por título..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchField}
      />

      <div className={styles.topicList}>
        {filteredTopics.length > 0 ? (
          filteredTopics.map((item, idx) => (
            <div key={idx} className={styles.topicItem}>
              <h2>{item.title}</h2>
              <p>{item.content}</p>
              <small>{item.Interest}</small>
              <br />
              <small>{item.categoryInterest}</small>
              <br />
              <small>By {item.creadorTopico}</small>

              {item.id_person === user?.personId && (
                <button
                  className={`${styles.button} ${styles.deleteButton}`}
                  onClick={() => handleOnClickDelete(item.id)}
                >
                  X
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No se encontraron temas.</p>
        )}
      </div>
      <FloatMenu menu={dataMenu} />
      <Window
        title="Nuevo tema"
        display={isDisplayWindow}
        setClose={() => setIsDisplayWindow(false)}
      >
        <ContentCol gap="20px">
          <ContentCol gap="5px">
            <Input
              name="title"
              value={formTopic.title}
              placeholder="Title"
              onChange={handleOnChangeTitle}
              width="479px"
            />
            <select
              value={formTopic.interestId}
              onChange={handleOnChangeInterest}
              style={{ width: "479px" }}
            >
              {interestList?.map((interest) => (
                <option key={interest.id} value={interest.id}>
                  {interest.name}
                </option>
              ))}
            </select>
            <textarea
              value={formTopic.content}
              placeholder="Content"
              onChange={handleOnChangeContent}
              style={{ width: "479px" }}
            />
          </ContentCol>
          <Button
            width="300px"
            text="Guardar"
            color="tertiary"
            onClick={handleOnClickSave}
          />
        </ContentCol>
      </Window>
    </div>
  );
};

export default Topic;
