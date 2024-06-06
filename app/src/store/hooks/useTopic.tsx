import { shallow } from "zustand/shallow";

import { topicStore} from "../zustand";

const useTopic = () => {
  const {
    topic,
    topicList,
    isLoading,
    isError,
    error,
    topicGetAll,
    topicGetById,
    topicGetByIdPerson,
    topicUpsert,
    topicDeleteById,
    topicReset,
    topicResetAll,
  } = topicStore(
    (state) => ({
        topic: state.topic,
        topicList: state.topicList,
        isLoading: state.isLoading,
        isError: state.isError,
        error: state.error,
        topicGetAll: state.topicGetAll,
        topicGetById: state.topicGetById,
        topicGetByIdPerson: state.topicGetByIdPerson,
        topicUpsert: state.topicUpsert,
        topicDeleteById: state.topicDeleteById,
        topicReset: state.topicReset,
        topicResetAll: state.topicResetAll,
    }),
    shallow
  );

  return {
    topic,
    topicList,
    isLoading,
    isError,
    error,
    topicGetAll,
    topicGetById,
    topicGetByIdPerson,
    topicUpsert,
    topicDeleteById,
    topicReset,
    topicResetAll,
  };
};

export default useTopic;
