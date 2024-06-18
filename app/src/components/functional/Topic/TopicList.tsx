import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

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
import CardButton from "@/components/ui/CardButton";

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

  const filteredTopics = topicList
    ? topicList.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className={styles.container}>
      <ContentCol width="100%" gap="30px" alignItems="center">
        <SearchBox
          height="60px"
          width="1020px"
          placeholder="Buscar por título..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <GridContainer>
          {filteredTopics.length > 0 ? (
            filteredTopics.map((item, idx) => (
              <React.Fragment key={idx}>
                {item.id_person === user?.personId && (
                  <CardButton
                    iconName="close"
                    onClick={() => handleOnClickDelete(item.id)}
                  />
                )}
                <div onClick={() => router.push(`/topic/${item.id}`)}>
                  <Card width="500px" height="440px">
                    <div className={styles.topicItem}>
                      <ContentCol gap="10px" alignItems="center">
                        <Title level="h1" color="#41377D" text={item.title} />
                        <ContentRow width="100%" justifyContent="space-between">
                          <ContentRow gap="10px">
                            <Avatar width="40px" height="40px" />
                            <Title height="40px" level="h4" color="#41377D" alignItems="center" text={item.creadorTopico} />
                          </ContentRow>
                          <Categories 
                            text={item.categoryInterest}
                            width="200px"
                            height="40px"
                            category={item.categoryInterest as ICategories['category']}
                          />
                        </ContentRow>
                        <Title width="100%" height="126px" level="h3" color="#41377D" text={item.content} />
                        <Title 
                          level="h4" 
                          color="#41377D" 
                          text={item.Interest} 
                        />
                      </ContentCol>
                    </div>
                  </Card>
                </div>
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
