import { create } from "zustand";
import { apiInstance } from "@/utils/api";

import { IProfile } from "@/interfaces/profile";

interface ProfileState {
  profile: IProfile | null;
  profileList: IProfile[] | null;
  isLoading: boolean;
  isError: boolean;
  error: string;
  profileGetAll: () => void;
  profileGetById: (id: string) => void;
  profileGetByIdPerson: (id_person: string) => void;
  profileUpdate: (
    id: string,
    description: string,
    name: string,
    paternalLastName: string,
    maternalLastName: string
  ) => void;
  profileDeleteById: (id: string) => void;
  profileReset: () => void;
  profileResetAll: () => void;
}

const initialData: IProfile = {
  id: "",
  description: "",
  personId: "",
  name: "",
  paternalLastName: "",
  maternalLastName: "",
  password: "",
  id_media: "",
  createdAt: "",
  updatedAt: "",
  deletedAt: "",
};

export const profileStore = create<ProfileState>((set) => ({
  profile: initialData,
  profileList: [],
  isLoading: false,
  isError: false,
  error: "",

  profileGetAll: async () => {
    try {
      set({ isLoading: true });
      const response = await apiInstance.get("/profile");
      const { data } = response.data;
      set({ profileList: data, isLoading: false });
    } catch (error) {
      set({ isError: true, error: (error as Error).message, isLoading: false });
    }
  },

  profileGetById: async (id: string) => {
    try {
      set({ isLoading: true });
      const response = await apiInstance.get(`/profile/id/${id}`);
      const { data } = response.data;
      set({ profile: data, isLoading: false });
    } catch (error) {
      set({ isError: true, error: (error as Error).message, isLoading: false });
    }
  },

  profileGetByIdPerson: async (id_person: string) => {
    try {
      set({ isLoading: true });
      const response = await apiInstance.get(`/profile/id_person/${id_person}`);
      const { data } = response.data;
      set({ profile: data, isLoading: false });
    } catch (error) {
      set({ isError: true, error: (error as Error).message, isLoading: false });
    }
  },

  profileUpdate: async (
    id: string,
    description: string,
    name: string,
    paternalLastName: string,
    maternalLastName: string
  ) => {
    try {
      set({ isLoading: true });
      const response = await apiInstance.put(`/profile/id/${id}`, {
        description,
        name,
        paternalLastName,
        maternalLastName,
      });
      const { data } = response.data;
      set({ profile: data, isLoading: false });
    } catch (error) {
      set({ isError: true, error: (error as Error).message, isLoading: false });
    }
  },

  profileDeleteById: async (id: string) => {
    try {
      set({ isLoading: true });
      const response = await apiInstance.delete(`/profile/id/${id}`);
      const { data } = response.data;
      set({ profile: data, isLoading: false });
    } catch (error) {
      set({ isError: true, error: (error as Error).message, isLoading: false });
    }
  },

  profileReset: () =>
    set({
      profile: initialData,
      isLoading: false,
      isError: false,
      error: "",
    }),

  profileResetAll: () =>
    set({
      profileList: [],
      isLoading: false,
      isError: false,
      error: "",
    }),
}));
