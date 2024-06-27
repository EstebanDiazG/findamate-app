import { shallow } from "zustand/shallow";

import { messageTopicStore } from "../zustand";

const useMessageTopic = () => {
    const {
      messageTopic,
      messageTopicList,
      isLoading,
      isError,
      error,
      messageTopicGetAll,
      messageTopicGetById,
      messageTopicGetByIdPerson,
      messageTopicGetByIdTopic,
      messageTopicCreateMessage,
      messageTopicDeleteById,
      messageTopicUpdate,
      messageTopicReset,
      messageTopicResetAll,
    } = messageTopicStore(
      (state) => ({
          messageTopic: state.messageTopic,
          messageTopicList: state.messageTopicList,
          isLoading: state.isLoading,
          isError: state.isError,
          error: state.error,
          messageTopicGetAll: state.messageTopicGetAll,
          messageTopicGetById: state.messageTopicGetById,
          messageTopicGetByIdPerson: state.messageTopicGetByIdPerson,
          messageTopicGetByIdTopic: state.messageTopicGetByIdTopic,
          messageTopicCreateMessage: state.messageTopicCreateMessage,
          messageTopicDeleteById: state.messageTopicDeleteById,
          messageTopicUpdate: state.messageTopicUpdate,
          messageTopicReset: state.messageTopicReset,
          messageTopicResetAll: state.messageTopicResetAll,
      }),
      shallow
    );
  
    return {
        messageTopic,
        messageTopicList,
        isLoading,
        isError,
        error,
        messageTopicGetAll,
        messageTopicGetById,
        messageTopicGetByIdPerson,
        messageTopicGetByIdTopic,
        messageTopicCreateMessage,
        messageTopicDeleteById,
        messageTopicUpdate,
        messageTopicReset,
        messageTopicResetAll,
    };
  };
  
  export default useMessageTopic;