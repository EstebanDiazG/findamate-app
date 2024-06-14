import { shallow } from "zustand/shallow";
import { imageStore } from "../zustand";

const useImage = () => {
  const {
    image,
    imageList,
    isLoading,
    isError,
    error,
    imageGetById,
    imageDeleteById,
    imageSearch,
    imageUpload,
    imageReset,
    imageResetAll,
  } = imageStore(
    (state) => ({
      image: state.image,
      imageList: state.imageList,
      isLoading: state.isLoading,
      isError: state.isError,
      error: state.error,
      imageGetById: state.imageGetById,
      imageDeleteById: state.imageDeleteById,
      imageSearch: state.imageSearch,
      imageUpload: state.imageUpload,
      imageReset: state.imageReset,
      imageResetAll: state.imageResetAll,
    }),
    shallow
  );

  return {
    image,
    imageList,
    isLoading,
    isError,
    error,
    imageGetById,
    imageDeleteById,
    imageSearch,
    imageUpload,
    imageReset,
    imageResetAll,
  };
};

export default useImage;
