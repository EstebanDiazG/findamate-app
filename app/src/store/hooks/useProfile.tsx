import { shallow } from "zustand/shallow";
import { profileStore } from "../zustand";

const useProfile = () => {
  const {
    profile,
    profileList,
    isLoading,
    isError,
    error,
    profileGetAll,
    profileGetById,
    profileGetByIdPerson,
    profileUpdate,
    profileDeleteById,
    profileReset,
    profileResetAll,
  } = profileStore(
    (state) => ({
      profile: state.profile,
      profileList: state.profileList,
      isLoading: state.isLoading,
      isError: state.isError,
      error: state.error,
      profileGetAll: state.profileGetAll,
      profileGetById: state.profileGetById,
      profileGetByIdPerson: state.profileGetByIdPerson,
      profileUpdate: state.profileUpdate,
      profileDeleteById: state.profileDeleteById,
      profileReset: state.profileReset,
      profileResetAll: state.profileResetAll,
    }),
    shallow
  );

  return {
    profile,
    profileList,
    isLoading,
    isError,
    error,
    profileGetAll,
    profileGetById,
    profileGetByIdPerson,
    profileUpdate,
    profileDeleteById,
    profileReset,
    profileResetAll,
  };
};

export default useProfile;
