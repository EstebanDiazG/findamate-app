import { shallow } from "zustand/shallow";
import { interestStore } from "../zustand";

const useInterest = () => {
    const{
        interest,
        interestList,
        isLoading,
        isError,
        error,
        interestGetAll,
        interestGetById,
        interestDeleteById,
        interestReset,
        interestResetAll,
    } = interestStore(
        (state) => ({
            interest:state.interest,
            interestList:state.interestList,
            isLoading:state.isLoading,
            isError:state.isError,
            error:state.error,
            interestGetAll: state.interestGetAll,
            interestGetById: state.interestGetById,
            interestDeleteById: state.interestDeleteById,
            interestReset: state.interestReset,
            interestResetAll: state.interestResetAll,            
        }),
        shallow
    );

    return{
        interest,
        interestList,
        isLoading,
        isError,
        error,
        interestGetAll,
        interestGetById,
        interestDeleteById,
        interestReset,
        interestResetAll,
    };    
};

export default useInterest;