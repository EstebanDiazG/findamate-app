import { create } from "zustand";
import { apiInstance } from "@/utils/api";

import { IImage } from "@/interfaces/image";

interface ImageState {
  image: IImage | null;
  imageList: IImage[] | null;
  isLoading: boolean;
  isError: boolean;
  error: string;
  imageDeleteById: (id: string) => void;
  imageGetById: (id: string) => void;
  imageSearch: () => void;
  imageUpload: (file: File) => void;
  imageReset: () => void;
  imageResetAll: () => void;
}

const initialData: IImage = {
  id: "",
  fieldname: "",
  originalname: "",
  encoding: "",
  mimetype: "",
  format: "",
  width: "",
  height: "",
  size: "",
  url: "",
  createdAt: "",
  updatedAt: "",
  deletedAt: "",
  statusCode: "",
};

export const imageStore = create<ImageState>((set) => ({
  image: initialData,
  imageList: [],
  isLoading: false,
  isError: false,
  error: "",

  imageGetById: async (id: string) => {
    try {
      set({ isLoading: true });
      const response = await apiInstance.get(`/image/id/${id}`);
      const { data } = response.data;
      set({ image: data, isLoading: false });
    } catch (error) {
      set({ isError: true, error: (error as Error).message, isLoading: false });
    }
  },

  imageDeleteById: async (id: string) => {
    try {
      set({ isLoading: true });
      const response = await apiInstance.delete(`/image/id/${id}`);
      const { data } = response.data;
      set({ image: data, isLoading: false });
    } catch (error) {
      set({ isError: true, error: (error as Error).message, isLoading: false });
    }
  },

  imageSearch: async () => {
    try {
      set({ isLoading: true });
      const response = await apiInstance.get(`/image/search`);
      const { data } = response.data;
      set({ imageList: data, isLoading: false });
    } catch (error) {
      set({ isError: true, error: (error as Error).message, isLoading: false });
    }
  },

  imageUpload: async (file: File) => {
    try {
      set({ isLoading: true });
      const formData = new FormData();
      formData.append("file", file);
      const response = await apiInstance.post("/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const { data } = response.data;
      set({ image: data, isLoading: false });
    } catch (error) {
      set({ isError: true, error: (error as Error).message, isLoading: false });
    }
  },

  imageReset: () => {
    set({ image: initialData });
  },

  imageResetAll: () => {
    set({ image: initialData, imageList: [] });
  },
}));
