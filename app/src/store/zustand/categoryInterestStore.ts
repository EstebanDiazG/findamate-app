import { create } from "zustand";
import { apiInstance } from "@/utils/api";

import { ICategoryInterest } from "@/interfaces/categoryInterest";

interface CategoryInteresrState {
    categoryInterest: ICategoryInterest | null;
    categoryInterestList: ICategoryInterest[] | null;
    isLoading: boolean;
    isError: boolean;
    error: string;
    categoryInterestGetAll: () => void;
    categoryInterestGetById: (id: string) => void;
    categoryInterestDeleteById: (id: string) => void;
    categoryInterestReset: () => void;
    categoryInterestResetAll: () => void;
}

const initialData: ICategoryInterest = {
    id: "",
    name: "",
    interes: "",
    createdAt: "",
    updatedAt: "",
    deletedAt: "",
};

export const categoryInterestStore = create<CategoryInteresrState>((set) => ({
    categoryInterest: initialData,
    categoryInterestList: [],
    isLoading: false,
    isError: false,
    error: "",
  
    categoryInterestGetAll: async () => {
      try {
        set({ isLoading: true });
        const response = await apiInstance.get("/categoryInterest");
        const { data } = response.data;
        set({ categoryInterestList: data, isLoading: false });
      } catch (error) {
        set({ isError: true, error: (error as Error).message, isLoading: false });
      }
    },
  
    categoryInterestGetById: async (id: string) => {
      try {
        set({ isLoading: true });
        const response = await apiInstance.get(`/categoryInterest/id/${id}`);
        const { data } = response.data;
        set({ categoryInterest: data, isLoading: false });
      } catch (error) {
        set({ isError: true, error: (error as Error).message, isLoading: false });
      }
    },
  
    categoryInterestDeleteById: async (id: string) => {
      try {
        set({ isLoading: true });
        const response = await apiInstance.delete(`/categoryInterest/id/${id}`);
        const { data } = response.data;
        set({ categoryInterest: data, isLoading: false });
      } catch (error) {
        set({ isError: true, error: (error as Error).message, isLoading: false });
      }
    },
  
    categoryInterestReset: () =>
      set({
        categoryInterest: initialData,
        isLoading: false,
        isError: false,
        error: "",
      }),
  
    categoryInterestResetAll: () =>
      set({
        categoryInterestList: [],
        isLoading: false,
        isError: false,
        error: "",
      }),
  }));