"use client"; 
import React,{createContext,useContext, useState} from "react"
import useCategory from "./useCategory.js"
// 1. Create context with undefined default value
const GlobalContext =createContext(); 

// 2. Context Provider Component
export const GlobalContextProvider = ({ children }) => {
    const {loading,categories}=useCategory()
   const [quizsetup,setQuizSetup]=useState({
    questionCount:1,
    Category:null,
    difficulty:null,
   })
   const [selectedquiz,setSelectedQuiz]=useState(null)
   const [quizResponse,setQuizResponse]=useState([])
    return (
        <GlobalContext.Provider value={{
            loading,categories,quizsetup,setQuizSetup,selectedquiz,setSelectedQuiz,quizResponse,setQuizResponse

        }}>
            {children}
        </GlobalContext.Provider>
    );
};

// 3. Custom Hook for consuming context
export const useGlobalContext = () => {
    return useContext(GlobalContext);
};