"use client"
import React from 'react'
import { GlobalContextProvider } from '@/context/GlobalContext'
interface props{
    children:React.ReactNode
}

function ContextProvider({children}:props) {
  return (
    <GlobalContextProvider>{children}</GlobalContextProvider>
  )
}

export default ContextProvider