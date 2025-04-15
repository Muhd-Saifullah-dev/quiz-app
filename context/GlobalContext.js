"use client"
import React,{createContext,useContext, useEffect, useState} from "react"
import useCategory from "./useCategory.js"
import { useUser } from "@clerk/nextjs";
import axios from "axios";
// 1. Create context with undefined default value
const GlobalContext =createContext(); 

// 2. Context Provider Component
export const GlobalContextProvider = ({ children }) => {
    const {loading,categories}=useCategory()
    const {user,isLoaded }=useUser()
   const [quizsetup,setQuizSetup]=useState({
    questionCount:1,
    Category:null,
    difficulty:null,
   })
   const [selectedquiz,setSelectedQuiz]=useState(null)
   const [quizResponse,setQuizResponse]=useState([])

   useEffect(() => {
    // Wait until auth state is fully loaded
    if (!isLoaded) return;
    
    // If no user is logged in, exit
    if (!user) {
      console.log("No user logged in");
      return;
    }
  
    // Safely access email with optional chaining
    const userEmail = user?.emailAddresses?.[0]?.emailAddress;
    
    if (!userEmail) {
      console.log("User has no email associated");
      return;
    }
  
    const registerUser = async () => {
      try {
        await axios.post('/api/user/register');
        console.log("i am in register User")
      } catch (error) {
        console.error("Registration failed:", error);
      }
    };
  
    registerUser();
  }, [user, isLoaded]);

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