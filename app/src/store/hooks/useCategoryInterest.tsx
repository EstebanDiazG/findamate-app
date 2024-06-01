import { shallow } from "zustand/shallow";
import { categoryInterestStore } from "../zustand";

const useCategoryInterest = () => {
    const{
        categoryInterest,
        categoryInterestList,
        isLoading,
        isError,
        error,
        categoryInterestGetAll,
        categoryInterestGetById,
        categoryInterestDeleteById,
        categoryInterestReset,
        categoryInterestResetAll,
    } = categoryInterestStore(
        (state) => ({
            categoryInterest:state.categoryInterest,
            categoryInterestList:state.categoryInterestList,
            isLoading:state.isLoading,
            isError:state.isError,
            error:state.error,
            categoryInterestGetAll: state.categoryInterestGetAll,
            categoryInterestGetById: state.categoryInterestGetById,
            categoryInterestDeleteById: state.categoryInterestDeleteById,
            categoryInterestReset: state.categoryInterestReset,
            categoryInterestResetAll: state.categoryInterestResetAll,            
        }),
        shallow
    );

    return{
        categoryInterest,
        categoryInterestList,
        isLoading,
        isError,
        error,
        categoryInterestGetAll,
        categoryInterestGetById,
        categoryInterestDeleteById,
        categoryInterestReset,
        categoryInterestResetAll,
    };    
};

export default useCategoryInterest;