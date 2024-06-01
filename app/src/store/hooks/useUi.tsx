import shallow from "zustand/shallow";
import { uiStore} from "../zustand/uiStore"

const useUi = () => {
  const { ui, isLoading, isError, error, uiTogleOpenMenu, uiReset } = uiStore(
    (state) => ({
      ui: state.ui,
      isLoading: state.isLoading,
      isError: state.isError,
      error: state.error,
      uiTogleOpenMenu: state.uiTogleOpenMenu,
      uiReset: state.uiReset,
    }),
    shallow
  );

  return { ui, isLoading, isError, error, uiTogleOpenMenu, uiReset };
};

export default useUi;
