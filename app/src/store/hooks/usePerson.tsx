import { shallow } from "zustand/shallow";

import { personStore } from "../zustand";

const usePerson = () => {
  const {
    person,
    personList,
    isLoading,
    isError,
    error,
    personGetAll,
    personGetById,
    personGetByRut,
    personUpsert,
    personDeleteById,
    personReset,
    personResetAll,
    persongGetInterestsByPersonId,
    personAssignInterest,
    personRemoveInterest,
  } = personStore(
    (state) => ({
      person: state.person,
      personList: state.personList,
      isLoading: state.isLoading,
      isError: state.isError,
      error: state.error,
      personGetAll: state.personGetAll,
      personGetById: state.personGetById,
      personGetByRut: state.personGetByRut,
      personUpsert: state.personUpsert,
      personDeleteById: state.personDeleteById,
      personReset: state.personReset,
      personResetAll: state.personResetAll,
      persongGetInterestsByPersonId: state.persongGetInterestsByPersonId,
      personAssignInterest: state.personAssignInterest,
      personRemoveInterest: state.personRemoveInterest,
    }),
    shallow
  );

  return {
    person,
    personList,
    isLoading,
    isError,
    error,
    personGetAll,
    personGetById,
    personGetByRut,
    personUpsert,
    personDeleteById,
    personReset,
    personResetAll,
    persongGetInterestsByPersonId,
    personAssignInterest,
    personRemoveInterest,
  };
};

export default usePerson;
