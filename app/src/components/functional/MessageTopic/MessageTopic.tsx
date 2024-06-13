import React, { useState, useEffect } from "react";

import { useMessageTopic, useUser, useTopic } from "@/store/hooks";

import styles from "./MessageTopic.module.scss";

import { IMessageTopic } from "@/interfaces/messageTopic";

const MessageTopic = () => {
    const {
      messageTopic,
      messageTopicList,
      messageTopicGetAll,
      messageTopicGetById,
      messageTopicGetByIdPerson,
      messageTopicGetByIdTopic,
      messageTopicCreateMessage,
      messageTopicDeleteById,
      messageTopicReset,
      messageTopicResetAll,
      isLoading,
    } = useMessageTopic();

    //Hook de User
    const { user } = useUser();

    const { topic } = useTopic();
  
    const initialDataMessageTopic= {
      id: "",
      id_person: "",
      id_topic: "",
      creadorMensaje: "",
      content: "",
      createdAt: "",
      updatedAt: "",
      deletedAt: "",
    };
  
    const [formMenssageTopic, setformMenssageTopic] = useState<IMessageTopic>(initialDataMessageTopic);
  
    const handleOnChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setformMenssageTopic({ ...formMenssageTopic, content: e.target.value });
    };
  
    const handleOnClickSave = () => {
        const id_person = user?.personId ?? "";
        const id_topic = topic?.id ?? "";
        const content = formMenssageTopic.content;    
        messageTopicCreateMessage(id_person,id_topic, content);
        setformMenssageTopic(initialDataMessageTopic); // Limpia los campos después de guardar
    };
  
    const handleOnClickDelete = (id: string) => {
        messageTopicDeleteById(id);
        messageTopicReset();
    };
  
    useEffect(() => {
        messageTopicGetAll();
    }, [messageTopicGetAll]);
  
    useEffect(() => {
      if (messageTopic) {
        setformMenssageTopic(messageTopic);
        messageTopicGetAll();
      }
    }, [messageTopic, messageTopicGetAll]);
  
    return (
    <div>Cargando</div>
    );
};
  
  export default MessageTopic;
  