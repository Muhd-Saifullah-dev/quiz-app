"use client"
import axios from 'axios'
import React,{useEffect,useState} from "react"

const useCategory = () => {
  const [loading,setLoading]=useState(true)
  const [categories,setCategories]=useState([])
  const getCategories=async()=>{
    setLoading(true)
    try {
        const res=await axios.get("/api/categories")
        const data =await res.data
        setCategories(data)
        setLoading(false)
    } catch (error) {
        console.log("error fetching categories :: ",error)
    }
  }
  useEffect(()=>{
    getCategories()
},[])

return {loading,categories}
}


export default useCategory