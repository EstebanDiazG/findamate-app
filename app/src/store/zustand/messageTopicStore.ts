import { create } from "zustand";

import { apiInstance } from "@/utils/api";

import { IMessageTopic } from "@/interfaces/messageTopic";

interface messageTopicState {
    messageTopic: IMessageTopic | null;
    messageTopicList: IMessageTopic[] | null;
    isLoading: boolean;
    isError: boolean;
    error: string;
    messageTopicGetAll: () => void;
    messageTopicGetById: (id: string) => void;
    messageTopicGetByIdPerson: (id_person: string) => void;
    messageTopicGetByIdTopic: (id_topic: string) => void;
    messageTopicCreateMessage: (
      id_person: string,
      id_topic: string,
      content: string,
    ) => void;
    messageTopicDeleteById: (id: string) => void;
    messageTopicUpdate: (id: string, content: string) => Promise<void>;
    messageTopicReset: () => void;
    messageTopicResetAll: () => void;
}

const initialData: IMessageTopic = {
    id: "",
    id_person: "",
    id_topic: "",
    creadorMensaje: "",
    content: "",
    createdAt: "",
    updatedAt: "",
    deletedAt: "",
};

export const messageTopicStore = create<messageTopicState>((set) => ({
    messageTopic: initialData,
    messageTopicList: [],
    isLoading: false,
    isError: false,
    error: "",
  
    messageTopicGetAll: async () => {
      try {
        set({ isLoading: true });
        const response = await apiInstance.get("/message_topic");
        const { data } = response.data;
        set({ messageTopicList: data, isLoading: false });
      } catch (error) {
        set({ isError: true, error: (error as Error).message, isLoading: false });
      }
    },
  
    messageTopicGetById: async (id: string) => {
      try {
        set({ isLoading: true });
        const response = await apiInstance.get(`/message_topic/id/${id}`);
        const { data } = response.data;
        set({ messageTopic: data, isLoading: false });
      } catch (error) {
        set({ isError: true, error: (error as Error).message, isLoading: false });
      }
    },
  
    messageTopicGetByIdPerson: async (id_person: string) => {
      try {
        set({ isLoading: true });
        const response = await apiInstance.get(`/message_topic/idPerson/${id_person}`);
        const { data } = response.data;
        set({ messageTopic: data, isLoading: false });
      } catch (error) {
        set({ isError: true, error: (error as Error).message, isLoading: false });
      }
    },

    messageTopicGetByIdTopic: async (id_topic: string) => {
        try {
          set({ isLoading: true });
          const response = await apiInstance.get(`/message_topic/idTopic/${id_topic}`);
          const { data } = response.data;
          set({ messageTopic: data, isLoading: false });
        } catch (error) {
          set({ isError: true, error: (error as Error).message, isLoading: false });
        }
    },
  
    messageTopicCreateMessage: async (
      id_person: string,
      id_topic: string,
      content: string,
    ) => {
      try {
        set({ isLoading: true });
        const response = await apiInstance.post("/message_topic", {
          id_person,
          id_topic,
          content,
        });
        const { data, success, error } = response.data;
        set({ messageTopic: data, isLoading: false });
      } catch (error) {
        set({ isError: true, error: (error as Error).message, isLoading: false });
      }
    },
  
    messageTopicDeleteById: async (id: string) => {
      try {
        set({ isLoading: true });
        const response = await apiInstance.delete(`/message_topic/id/${id}`);
        const { data } = response.data;
        set({ messageTopic: data, isLoading: false });
      } catch (error) {
        set({ isError: true, error: (error as Error).message, isLoading: false });
      }
    },

    messageTopicUpdate: async (id: string, content: string) => {
      try {
        set({ isLoading: true });
        const response = await apiInstance.put(`/message_topic/id/${id}`, { content });
        const { data, success, error } = response.data;
        if (success) {
          set((state) => ({
            messageTopicList: state.messageTopicList?.map((message) =>
              message.id === id ? { ...message, content } : message
            ) || [],
            isLoading: false,
          }));
        } else {
          set({ isError: true, error, isLoading: false });
        }
      } catch (error) {
        set({ isError: true, error: (error as Error).message, isLoading: false });
      }
    },
  
    messageTopicReset: () =>
      set({
        messageTopic: initialData,
        isLoading: false,
        isError: false,
        error: "",
      }),
  
      messageTopicResetAll: () =>
      set({
        messageTopicList: [],
        isLoading: false,
        isError: false,
        error: "",
      }),
}));
  