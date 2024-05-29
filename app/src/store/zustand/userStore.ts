import { create } from "zustand";
import { apiInstance } from "@/utils/api";

import { IUser, IRol } from "@/interfaces/user";

interface UserState {
  user: IUser | null;
  userList: IUser[] | null;
  isLoading: boolean;
  isError: boolean;
  error: string;
  userGetAll: () => void;
  userGetById: (id: string) => void;
  userGetByRut: (rut: string) => void;
  userUpsert: (user: IUser) => void;
  userDelete: (id: string) => void;
  userUpdatePassword: (id: string, password: string) => void;
  userValidate: (email: string, password: string) => void;
  userAssignRol: (id: string, roles: { id: string }) => void;
  userRemoveRol: (id: string, roles: { id: string }) => void;
  userReset: () => void;
  userResetAll: () => void;
}

const initialData: IUser = {
  id: "",
  personId: "",
  rut: "",
  name: "",
  paternalLastName: "",
  maternalLastName: "",
  email: "",
  password: "",
  roles: [],
  createdAt: "",
  updatedAt: "",
  deletedAt: "",
};

export const userStore = create<UserState>((set) => ({
  user: initialData,
  userList: [],
  isLoading: false,
  isError: false,
  error: "",

  userGetAll: async () => {
    try {
      set({ isLoading: true });
      const response = await apiInstance.get("/user");
      const { data } = response.data;
      set({ userList: data, isLoading: false });
    } catch (error) {
      set({ isError: true, error: (error as Error).message, isLoading: false });
    }
  },

  userGetById: async (id: string) => {
    try {
      set({ isLoading: true });
      const response = await apiInstance.get(`/user/id/${id}`);
      const { data } = response.data;
      set({ user: data, isLoading: false });
    } catch (error) {
      set({ isError: true, error: (error as Error).message, isLoading: false });
    }
  },

  userGetByRut: async (rut: string) => {
    try {
      set({ isLoading: true });
      const response = await apiInstance.get(`/user/rut/${rut}`);
      const { data } = response.data;
      set({ user: data, isLoading: false });
    } catch (error) {
      set({ isError: true, error: (error as Error).message, isLoading: false });
    }
  },

  userUpsert: async (user: IUser) => {
    try {
      const { rut, name, paternalLastName, maternalLastName, email, password } =
        user;
      set({ isLoading: true });
      const response = await apiInstance.post("/user", {
        rut,
        name,
        paternalLastName,
        maternalLastName,
        email,
        password,
      });
      const { data, success, error } = response.data;
      set({ user: data, isLoading: false });
    } catch (error) {
      set({ isError: true, error: (error as Error).message, isLoading: false });
    }
  },

  userDelete: async (id: string) => {
    try {
      set({ isLoading: true });
      const response = await apiInstance.delete(`/user/id/${id}`);
      const { data } = response.data;
      set({ user: data, isLoading: false });
    } catch (error) {
      set({ isError: true, error: (error as Error).message, isLoading: false });
    }
  },

  userUpdatePassword: async (personId: string, password: string) => {
    try {
      set({ isLoading: true });
      const response = await apiInstance.put(`/user/update`, {
        personId,
        password,
      });
      const { data } = response.data;
      set({ user: data, isLoading: false });
    } catch (error) {
      set({ isError: true, error: (error as Error).message, isLoading: false });
    }
  },

  userValidate: async (email: string, password: string) => {
    try {
      set({ isLoading: true });
      const response = await apiInstance.post("/user/validate", {
        email,
        password,
      });
      const { data } = response.data;
      if ("error" in data) {
        throw new Error(data.error);
      }

      set({ user: data, isLoading: false });
    } catch (error) {
      set({ isError: true, error: (error as Error).message, isLoading: false });
      throw error;
    }
  },

  userAssignRol: async (id: string, role: { id: string }) => {
    try {
      set({ isLoading: true });
      const response = await apiInstance.put(`/user/rol/${id}`, {
        rolId: role.id,
      });
      const { data } = response.data;
      set({ user: data, isLoading: false });
    } catch (error) {
      set({ isError: true, error: (error as Error).message, isLoading: false });
    }
  },

  userRemoveRol: async (id: string, role: { id: string }) => {
    try {
      set({ isLoading: true });
      const response = await apiInstance.delete(`/user/rol/${id}`, {
        data: { rolId: role.id },
      });

      const { data } = response.data;
      set({ user: data, isLoading: false });
    } catch (error) {
      set({ isError: true, error: (error as Error).message, isLoading: false });
    }
  },

  userReset: () =>
    set({
      user: initialData,
      isLoading: false,
      isError: false,
      error: "",
    }),

  userResetAll: () =>
    set({
      userList: [],
      isLoading: false,
      isError: false,
      error: "",
    }),
}));
