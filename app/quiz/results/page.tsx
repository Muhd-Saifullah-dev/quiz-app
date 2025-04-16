"use client"

import { useGlobalContext } from '@/context/GlobalContext'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from '@/components/ui/button'
import { play } from '@/utils/icons.utils'
function page() {
    const router=useRouter()
    const {quizResponse,selectedquiz }=useGlobalContext()
    if(!quizResponse || quizResponse.length===0){
        return router.push("/")
    }
    
    //calculate score 
    const correctAnswer=quizResponse.filter((res:{isCorrect:boolean})=>res.isCorrect).length
    const totalQuestion=quizResponse.length
    const scorePercentage=(correctAnswer/totalQuestion) *100

    let message=""
    if(scorePercentage <25){
        message="You need to try harder!"
    }else if(scorePercentage >=25 && scorePercentage <50){
        message="you are getting there! keep practicing"
    }
    else if(scorePercentage>=50 && scorePercentage<75){
        message="Good efforts! you are above average "
    }else if(scorePercentage ===100){
        message="Outstanding you got everything Right"
    }
  return (
    <div className='py-20 flex flex-col  gap-4'>
        <h1 className='text-4xl font-bold text-center'>Quiz Result</h1>
        <p className='text-2xl text-center mt-4'>Your Scores  <span>{correctAnswer}</span> out of {" "}{" "}
            <span className='font-bold text-3xl'>{totalQuestion}</span> {" "}
           
        </p>
        <p className='text-blue-400 font-bold text-3xl text-center mt-2'>{scorePercentage.toFixed()}%</p>
        <p className='text-2xl text-center mt-2 font-semibold'>{message}</p>
        <div className='flex justify-center mt-8'>
        <Button variant={"green"} className='px-10 py-6 font-bold texxt-white text-xl rounded-xl' 
        onClick={()=>router.push(`/quiz/setup/${selectedquiz.id}`)}
        >{play} Play Again</Button>
        </div>
    </div>
  )
}

export default page