import { create } from "zustand";
import { apiInstance } from "@/utils/api";

import { IInterest } from "@/interfaces/interest";

interface InteresrState {
    interest: IInterest | null;
    interestList: IInterest[] | null;
    isLoading: boolean;
    isError: boolean;
    error: string;
    interestGetAll: () => void;
    interestGetById: (id: string) => void;
    interestDeleteById: (id: string) => void;
    interestReset: () => void;
    interestResetAll: () => void;
}

const initialData: IInterest = {
    id: "",
    name: "",
    createdAt: "",
    updatedAt: "",
    deletedAt: "",
};

export const interestStore = create<InteresrState>((set) => ({
    interest: initialData,
    interestList: [],
    isLoading: false,
    isError: false,
    error: "",
  
    interestGetAll: async () => {
      try {
        set({ isLoading: true });
        const response = await apiInstance.get("/interest");
        const { data } = response.data;
        set({ interestList: data, isLoading: false });
      } catch (error) {
        set({ isError: true, error: (error as Error).message, isLoading: false });
      }
    },
  
    interestGetById: async (id: string) => {
      try {
        set({ isLoading: true });
        const response = await apiInstance.get(`/interest/id/${id}`);
        const { data } = response.data;
        set({ interest: data, isLoading: false });
      } catch (error) {
        set({ isError: true, error: (error as Error).message, isLoading: false });
      }
    },
  
    interestDeleteById: async (id: string) => {
      try {
        set({ isLoading: true });
        const response = await apiInstance.delete(`/interest/id/${id}`);
        const { data } = response.data;
        set({ interest: data, isLoading: false });
      } catch (error) {
        set({ isError: true, error: (error as Error).message, isLoading: false });
      }
    },
  
    interestReset: () =>
      set({
        interest: initialData,
        isLoading: false,
        isError: false,
        error: "",
      }),
  
    interestResetAll: () =>
      set({
        interestList: [],
        isLoading: false,
        isError: false,
        error: "",
      }),
  }));
  