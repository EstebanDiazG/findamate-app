import { create } from "zustand";
import { apiInstance } from "@/utils/api";

import { IMedia } from "@/interfaces/media";

interface MediaState {
    media: IMedia | null;
    mediaList: IMedia[] | null;
    isLoading: boolean;
    isError: boolean;
    error: string;
    mediaDeleteMediaById: (id: string) => void;
    mediaGetMediaById: (id: string) => void;
    mediaSearchMedia: () => void;
    mediaUploadMedia: (file: File) => Promise<string | null>;
    mediaReset: () => void;
    mediaResetAll: () => void;
}

const initialData: IMedia = {
    id: "",
    type: "",
    original_name: "",
    internal_name: "",
    mimetype: "",
    format: "",
    encoding: "",
    path: "",
    size: "",
    width: "",
    height: "",
    status_code: "",
    url: "",
    createdAt: "",
    updatedAt: "",
    deletedAt: "",
    statusCode: "",
};

export const mediaStore = create<MediaState>((set) => ({
    media: initialData,
    mediaList: [],
    isLoading: false,
    isError: false,
    error: "",
  
    mediaGetMediaById: async (id: string) => {
      try {
        set({ isLoading: true });
        const response = await apiInstance.get(`/media/id/${id}`);
        const { data } = response.data;
        set({ media: data, isLoading: false });
      } catch (error) {
        set({ isError: true, error: (error as Error).message, isLoading: false });
      }
    },
  
    mediaDeleteMediaById: async (id: string) => {
      try {
        set({ isLoading: true });
        const response = await apiInstance.delete(`/media/id/${id}`);
        const { data } = response.data;
        set({ media: data, isLoading: false });
      } catch (error) {
        set({ isError: true, error: (error as Error).message, isLoading: false });
      }
    },
  
    mediaSearchMedia: async () => {
      try {
        set({ isLoading: true });
        const response = await apiInstance.get(`/media/search`);
        const { data } = response.data;
        set({ mediaList: data, isLoading: false });
      } catch (error) {
        set({ isError: true, error: (error as Error).message, isLoading: false });
      }
    },
  
    mediaUploadMedia: async (file: File): Promise<string | null> => {
      try {
          set({ isLoading: true });
          const formData = new FormData();
          formData.append("file", file);
          const response = await apiInstance.post("/media", formData, {
              headers: {
                  "Content-Type": "multipart/form-data",
              },
          });
          const { data } = response.data;
          set({ media: data, isLoading: false });
          return data.id; // Suponiendo que el ID del archivo se llama 'id'
      } catch (error) {
          set({ isError: true, error: (error as Error).message, isLoading: false });
          return null;
      }
  },
  
    mediaReset: () => {
      set({ media: initialData });
    },
  
    mediaResetAll: () => {
      set({ media: initialData, mediaList: [] });
    },
}));