import React from "react"
import useCategory from "./useCategory.js"
// 1. Create context with undefined default value
const GlobalContext = React.createContext(); 

// 2. Context Provider Component
export const GlobalContextProvider = ({ children }) => {
    const {loading,categories}=useCategory()
    console.log("categoriess :: ",categories)
    return (
        <GlobalContext.Provider value={{
            loading,categories
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

// 3. Custom Hook for consuming context
export const useGlobalContext = () => {
    return React.useContext(GlobalContext);
};