import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useRecentTopics } from "@/context/RecentTopicsContext";
import { useTopic, useInterest, useUser } from "@/store/hooks";
import Window from "@/components/ui/Window";
import { ContentCol, ContentRow } from "@/components/layout/Content";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import FloatMenu from "@/components/ui/FloatMenu";
import styles from "./Topic.module.scss";
import { ITopic } from "@/interfaces/topic";
import Card from "@/components/ui/Card";
import SearchBox from "@/components/ui/SearchBox/SearchBox";
import Title from "@/components/ui/Tittle";
import GridContainer from "@/components/ui/GridContainer";
import Categories from "@/components/ui/Categories";
import Avatar from "@/components/ui/Avatar";
import TextButton from "@/components/ui/TextButton";
import TopicText from "@/components/ui/TopicText";
import ComboBox from "@/components/ui/ComboBox";
import CardTitle from "@/components/ui/CardTitle";
import TextArea from "@/components/ui/TextArea";

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

  const {
    interest,
    interestList,
    isLoading: interestLoading,
    isError: interestError,
    error: interestErrorMessage,
    interestGetAll,
  } = useInterest();

  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    topicGetAll();
    interestGetAll();
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
    interestId: "",
    categoryInterest: "",
    Interest: "",
  };

  const [formTopic, setFormTopic] = useState<ITopic>(initialDataTopic);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<{ [key: string]: string }>({});
  const [isDisplayWindow, setIsDisplayWindow] = useState(false);
  const [windowTitle, setWindowTitle] = useState("Nuevo Foro");
  const { recentTopics, setRecentTopics } = useRecentTopics(); 

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
    const selectedCategory = interestList?.find((category) => category.id === e.target.value);
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
    console.log("Saving topic with:", { id_person, title, content, id_interest });

    topicUpsert(id_person, title, content, id_interest);
    setIsDisplayWindow(false);
    setFormTopic(initialDataTopic);
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

  useEffect(() => {
    if (topicList) {
      const sortedTopics = topicList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setRecentTopics(sortedTopics.slice(0, 6)); // Mostrar los primeros 6 tópicos
    }
  }, [topicList]);
  

  useEffect(() => {
    const intervalTime = 20 * 60 * 1000; // 20 minutos
  
    const interval = setInterval(() => {
      setRecentTopics((prevTopics) => {
        if (topicList && topicList.length > 0) {
          const currentIndex = topicList.findIndex(topic => topic.id === prevTopics[0].id);
          if (currentIndex !== -1) {
            const newIndex = (currentIndex + 6) % topicList.length; // Avanzar 6 tópicos cada vez
            return topicList.slice(newIndex, newIndex + 6); // Mostrar los siguientes 6 tópicos
          }
        }
        return prevTopics; // Si no hay cambios, mantener los tópicos actuales
      });
    }, intervalTime);
  
    return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonta o actualiza
  }, [topicList]);

  const filteredTopics = topicList
    ? topicList.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className={styles.container}>
      <ContentCol width="100%"  gap="30px" alignItems="center">
        <SearchBox
          height="60px"
          width="100%"
          placeholder="Buscar por título..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <GridContainer >
          {filteredTopics.length > 0 ? (
            filteredTopics.map((item, idx) => (
              <React.Fragment key={idx}>
                <Card width="100%" height="440px" padding="26px">
                  <div className={styles.topicItem}>
                    <ContentCol gap="10px" alignItems="center">
                      <CardTitle level="h1" color="#41377D" height="95px" alignItems="center" text={item.title} />
                      <ContentRow width="100%" justifyContent="space-between">
                        <ContentRow gap="8px">
                          <Avatar width="40px" height="40px" />
                          <Title height="40px" level="h4" color="#41377D" alignItems="center" text={item.creadorTopico} />
                        </ContentRow>
                        <Categories 
                          text={item.categoryInterest}
                          width="200px"
                          height="40px"
                          justifyContent="center"
                          category={item.categoryInterest as ICategories['category']}
                        />
                      </ContentRow>
                      <TopicText width="100%" height="176px" level="h3" color="#41377D" text={item.content} />
                      <ContentRow gap="10px" width="100%" justifyContent="space-between">
                        <Button
                          width="200px"
                          text="Ir a discusión"
                          color="primary"
                          onClick={() => router.push(`/topic/${item.id}`)}
                        />
                        {item.id_person === user?.personId && (
                          <TextButton
                            iconName="delete"
                            text="Eliminar"
                            textSize="16px"
                            textColor="#6153B6"
                            onClick={() => handleOnClickDelete(item.id)}
                          />
                        )}
                      </ContentRow>
                    </ContentCol>
                  </div>
                </Card>
              </React.Fragment>
            ))
          ) : (
            <p>No se encontraron temas.</p>
          )}
        </GridContainer>
      </ContentCol>

      <FloatMenu menu={dataMenu} />
      <Window
        title="Nuevo tema"
        display={isDisplayWindow}
        setClose={() => setIsDisplayWindow(false)}
      >
        <ContentCol gap="20px">
          <ContentCol gap="10px">
            <Input
              name="title"
              value={formTopic.title}
              placeholder="Título"
              onChange={handleOnChangeTitle}
              width="479px"
            />
            <ComboBox
              value={formTopic.interestId}
              onChange={handleOnChangeInterest}
              width="479px"
              data={interestList}
              optionValueName="id"
              optionTextName="name"
              placeholder="::Selecciona una categoría::"
              label="Categorías"
            />
            <TextArea
              name="content"
              value={formTopic.content}
              placeholder="Ingresa aquí tu pregunta..."
              onChange={handleOnChangeContent}
              width="479px"
              height="300px"
            />
          </ContentCol>
          <ContentRow gap="20px" justifyContent="space-between">
            <Button
              width="220px"
              text="Guardar"
              color="primary"
              onClick={handleOnClickSave}
            />
            <Button
              width="220px"
              text="Salir"
              color="primary"
              onClick={() => setIsDisplayWindow(false)}
            />
          </ContentRow>
        </ContentCol>
      </Window>
    </div>
  );
};

export default Topic;
