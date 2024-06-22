import { shallow } from "zustand/shallow";
import { mediaStore } from "../zustand";

const useMedia = () => {
    const {
      media,
      mediaList,
      isLoading,
      isError,
      error,
      mediaGetMediaById,
      mediaDeleteMediaById,
      mediaSearchMedia,
      mediaUploadMedia,
      mediaReset,
      mediaResetAll,
    } = mediaStore(
      (state) => ({
        media: state.media,
        mediaList: state.mediaList,
        isLoading: state.isLoading,
        isError: state.isError,
        error: state.error,
        mediaGetMediaById: state.mediaGetMediaById,
        mediaDeleteMediaById: state.mediaDeleteMediaById,
        mediaSearchMedia: state.mediaSearchMedia,
        mediaUploadMedia: state.mediaUploadMedia,
        mediaReset: state.mediaReset,
        mediaResetAll: state.mediaResetAll,
      }),
      shallow
    );
  
    return {
        media,
        mediaList,
        isLoading,
        isError,
        error,
        mediaGetMediaById,
        mediaDeleteMediaById,
        mediaSearchMedia,
        mediaUploadMedia,
        mediaReset,
        mediaResetAll,
    };
  };
  
  export default useMedia;