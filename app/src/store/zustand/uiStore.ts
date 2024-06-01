import { create } from "zustand";

interface IUi {
  isOpenMenu: boolean;
}

interface UiState {
  ui: IUi;
  isLoading: boolean;
  isError: boolean;
  uiTogleOpenMenu: () => void;
  error: string;
  uiReset: () => void;
}

const initialData: IUi = {
  isOpenMenu: false,
};

export const uiStore = create<UiState>((set) => ({
  ui: initialData,
  userList: [],
  isLoading: false,
  isError: false,
  error: "",

  uiTogleOpenMenu: () =>
    set((state) => ({
      ...state,
      ui: { ...state.ui, isOpenMenu: !state.ui.isOpenMenu },
    })),

  uiReset: () =>
    set({
      ui: initialData,
      isLoading: false,
      isError: false,
      error: "",
    }),
}));
