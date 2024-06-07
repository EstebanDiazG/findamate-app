import { create } from "zustand";

import { apiInstance } from "@/utils/api";

import { ITopic } from "@/interfaces/topic";

interface topicState {
  topic: ITopic | null;
  topicList: ITopic[] | null;
  isLoading: boolean;
  isError: boolean;
  error: string;
  topicGetAll: () => void;
  topicGetById: (id: string) => void;
  topicGetByIdPerson: (id_person: string) => void;
  topicUpsert: (
    id_person: string,
    title: string,
    content: string,
    id_interest: string
  ) => void;
  topicDeleteById: (id: string) => void;
  topicReset: () => void;
  topicResetAll: () => void;
}

const initialData: ITopic = {
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

export const topicStore = create<topicState>((set) => ({
  topic: initialData,
  topicList: [],
  isLoading: false,
  isError: false,
  error: "",

  topicGetAll: async () => {
    try {
      set({ isLoading: true });
      const response = await apiInstance.get("/topic");
      const { data } = response.data;
      set({ topicList: data, isLoading: false });
    } catch (error) {
      set({ isError: true, error: (error as Error).message, isLoading: false });
    }
  },

  topicGetById: async (id: string) => {
    try {
      set({ isLoading: true });
      const response = await apiInstance.get(`/topic/id/${id}`);
      const { data } = response.data;
      set({ topic: data, isLoading: false });
    } catch (error) {
      set({ isError: true, error: (error as Error).message, isLoading: false });
    }
  },

  topicGetByIdPerson: async (id_person: string) => {
    try {
      set({ isLoading: true });
      const response = await apiInstance.get(`/topic/idPerson/${id_person}`);
      const { data } = response.data;
      set({ topic: data, isLoading: false });
    } catch (error) {
      set({ isError: true, error: (error as Error).message, isLoading: false });
    }
  },

  topicUpsert: async (
    id_person: string,
    title: string,
    content: string,
    id_interest: string
  ) => {
    try {
      set({ isLoading: true });
      const response = await apiInstance.post("/topic", {
        id_person,
        title,
        content,
        id_interest,
      });
      const { data, success, error } = response.data;
      set({ topic: data, isLoading: false });
    } catch (error) {
      set({ isError: true, error: (error as Error).message, isLoading: false });
    }
  },

  topicDeleteById: async (id: string) => {
    try {
      set({ isLoading: true });
      const response = await apiInstance.delete(`/topic/id/${id}`);
      const { data } = response.data;
      set({ topic: data, isLoading: false });
    } catch (error) {
      set({ isError: true, error: (error as Error).message, isLoading: false });
    }
  },

  topicReset: () =>
    set({
      topic: initialData,
      isLoading: false,
      isError: false,
      error: "",
    }),

  topicResetAll: () =>
    set({
      topicList: [],
      isLoading: false,
      isError: false,
      error: "",
    }),
}));
