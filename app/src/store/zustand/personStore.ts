import { create } from "zustand";

import { apiInstance } from "@/utils/api";

import { IPerson } from "@/interfaces/person";

interface personState {
  person: IPerson | null;
  personList: IPerson[] | null;
  isLoading: boolean;
  isError: boolean;
  error: string;
  personGetAll: () => void;
  personGetById: (id: string) => void;
  personGetByRut: (rut: string) => void;
  personUpsert: (person: IPerson) => void;
  personDeleteById: (id: string) => void;
  personReset: () => void;
  personResetAll: () => void;
}

const initialData: IPerson = {
  id: "",
  rut: "",
  name: "",
  paternalLastName: "",
  maternalLastName: "",
  email: "",
  createdAt: "",
  updatedAt: "",
  deletedAt: "",
};

export const personStore = create<personState>((set) => ({
  person: initialData,
  personList: [],
  isLoading: false,
  isError: false,
  error: "",

  personGetAll: async () => {
    try {
      set({ isLoading: true });
      const response = await apiInstance.get("/person");
      const { data, success, error } = response.data;
      set({ personList: data, isLoading: false });
    } catch (error) {
      set({ isError: true, error: (error as Error).message, isLoading: false });
    }
  },

  personGetById: async (id: string) => {
    try {
      set({ isLoading: true });
      const response = await apiInstance.get(`/person/id/${id}`);
      const { data, success, error } = response.data;
      set({ person: data, isLoading: false });
    } catch (error) {
      set({ isError: true, error: (error as Error).message, isLoading: false });
    }
  },

  personGetByRut: async (rut: string) => {
    try {
      set({ isLoading: true });
      const response = await apiInstance.get(`/person/rut/${rut}`);
      const { data, success, error } = response.data;
      set({ person: data, isLoading: false });
    } catch (error) {
      set({ isError: true, error: (error as Error).message, isLoading: false });
    }
  },

  personUpsert: async (person: IPerson) => {
    try {
      const { rut, name, paternalLastName, maternalLastName, email } = person;
      set({ isLoading: true });
      const response = await apiInstance.post("/person", {
        rut,
        name,
        paternalLastName,
        maternalLastName,
        email,
      });
      const { data, success, error } = response.data;
      set({ person: data, isLoading: false });
    } catch (error) {
      set({ isError: true, error: (error as Error).message, isLoading: false });
    }
  },

  personDeleteById: async (id: string) => {
    try {
      set({ isLoading: true });
      const response = await apiInstance.delete(`/person/id/${id}`);
      const { data, success, error } = response.data;
      set({ person: data, isLoading: false });
    } catch (error) {
      set({ isError: true, error: (error as Error).message, isLoading: false });
    }
  },

  personReset: () =>
    set({ person: initialData, isLoading: false, isError: false, error: "" }),

  personResetAll: () =>
    set({
      person: initialData,
      personList: [],
      isLoading: false,
      isError: false,
      error: "",
    }),
}));
