import { shallow } from "zustand/shallow";
import { userStore } from "../zustand";

const useUser = () => {
  const {
    user,
    userList,
    isLoading,
    isError,
    error,
    userGetAll,
    userGetById,
    userGetByRut,
    userUpsert,
    userDelete,
    userUpdatePassword,
    userValidate,
    userAssignRol,
    userRemoveRol,
    userReset,
    userResetAll,
  } = userStore(
    (state) => ({
      user: state.user,
      userList: state.userList,
      isLoading: state.isLoading,
      isError: state.isError,
      error: state.error,
      userGetAll: state.userGetAll,
      userGetById: state.userGetById,
      userGetByRut: state.userGetByRut,
      userUpsert: state.userUpsert,
      userDelete: state.userDelete,
      userUpdatePassword: state.userUpdatePassword,
      userValidate: state.userValidate,
      userAssignRol: state.userAssignRol,
      userRemoveRol: state.userRemoveRol,
      userReset: state.userReset,
      userResetAll: state.userResetAll,
    }),
    shallow
  );

  return {
    user,
    userList,
    isLoading,
    isError,
    error,
    userGetAll,
    userGetById,
    userGetByRut,
    userUpsert,
    userDelete,
    userUpdatePassword,
    userValidate,
    userAssignRol,
    userRemoveRol,
    userReset,
    userResetAll,
  };
};

export default useUser;
