import React, { useState, useEffect } from "react";
import { useMessageTopic, useUser, useTopic } from "@/store/hooks";
import styles from "./TopicDetail.module.scss";
import { IMessageTopic } from "@/interfaces/messageTopic";
import Card from "@/components/ui/Card";
import { ContentCol, ContentRow } from "@/components/layout/Content";
import CardTitle from "@/components/ui/CardTitle";
import Avatar from "@/components/ui/Avatar";
import Title from "@/components/ui/Tittle";
import Categories, { ICategories } from "@/components/ui/Categories/Categories";
import TopicText from "@/components/ui/TopicText";
import ForumResponse from "@/components/ui/ForumResponse";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import TextButton from "@/components/ui/TextButton";
import CommentCount from "@/components/ui/CommentCount";
import EmbedContent from "@/components/ui/EmbedContent"; 



const TopicDetail = () => {
  const {
    messageTopic,
    messageTopicList,
    messageTopicGetAll,
    messageTopicCreateMessage,
    messageTopicDeleteById,
    messageTopicUpdate,
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

  const [formMenssageTopic, setFormMessageTopic] = useState<IMessageTopic>(initialDataMessageTopic);
  const [localMessageTopicList, setLocalMessageTopicList] = useState<IMessageTopic[]>([]);

  const handleOnChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormMessageTopic({ ...formMenssageTopic, content: e.target.value });
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

  const filteredComments = localMessageTopicList.filter(comment => comment.id_topic === topic?.id) || [];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const commentsToShow = filteredComments.slice(startIndex, endIndex);

  return (
    <div className={styles.container}>
      <ContentCol width="100%" gap="30px" alignItems="center">
        <Card width="100%" height="auto" padding="26px">
          <ContentCol width="100%">
            <CardTitle
              level="h1"
              color="#41377D"
              height="95px"
              alignItems="center"
              text={topic?.title}
            />
            <ContentRow width="100%" justifyContent="space-between">
              <ContentRow gap="8px">
                <Avatar width="40px" height="40px" />
                <Title
                  height="auto"
                  level="h4"
                  color="#41377D"
                  alignItems="center"
                  text={topic?.creadorTopico}
                />
              </ContentRow>
              <Categories
                text={topic?.categoryInterest}
                width="200px"
                height="40px"
                justifyContent="center"
                category={topic?.categoryInterest as ICategories["category"]}
              />
            </ContentRow>
            <TopicText
              width="100%"
              height="176px"
              level="h3"
              color="#41377D"
              text={topic?.content}
            />
            <CommentCount count={filteredComments.length} />
          </ContentCol>
        </Card>
        <TextArea
          width="100%"
          height="150px"
          name="Respuesta"
          value={formMenssageTopic.content}
          onChange={handleOnChangeContent}
          placeholder="Escribe un comentario..."
        />
        <Button
          width="200px"
          height="40px"
          text="Comentar"
          color="primary"
          onClick={handleOnClickSave}
        />
        <ContentCol width="100%" gap="20px" alignItems="center">
          {commentsToShow.length > 0 ? (
                commentsToShow.map(comment => (
              <ForumResponse  width="100%"  padding="26px">
                <div className={styles.commentCard}>
                  <ContentCol gap="10px">
                    <ContentRow width="100%" gap="10px" justifyContent="space-between">
                      <ContentRow>
                        <Avatar width="40px" height="40px" />
                        <Title
                          height="auto"
                          level="h4"
                          color="#41377D"
                          alignItems="center"
                          text={comment.creadorMensaje}
                        />
                      </ContentRow>
                      {comment.id_person === user?.personId && (
                        <TextButton
                          iconName="delete"
                          text="Eliminar"
                          textSize="16px"
                          textColor="#41377D"
                          onClick={() => handleOnClickDelete(comment.id)}
                        >
                          &times;
                        </TextButton>
                      )}
                    </ContentRow>
                    <EmbedContent content={comment.content} />
                  </ContentCol>
                </div>
              </ForumResponse>
              
            ))
          ) : (
            <p>No se encontraron comentarios.</p>
          )} 
        </ContentCol>
      </ContentCol>
     
    </div>
  );
};
