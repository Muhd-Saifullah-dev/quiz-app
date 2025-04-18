"use client"
import React, { useState,useEffect } from 'react'

interface Props{
    initialTimeLeft:number
}
function CountDown({initialTimeLeft}:Props) {
    const [timeLeft,setTimeLeft]=useState(initialTimeLeft)
    useEffect(()=>{
        const timer=setInterval(()=>{
            setTimeLeft((prev)=>{
                if(prev <=1){
                    clearInterval(timer)
                    window.location.reload()
                }
                return prev-1
            })
        },1000)

        return ()=>clearInterval(timer)
    },[])
  return (
    <p >Please try again in <span className='text-2xl text-blue-400 font-bold'>{timeLeft}</span> seconds
    
        this page will  automatically refresh when the  time is up 
     </p>

  )
}

export default CountDown