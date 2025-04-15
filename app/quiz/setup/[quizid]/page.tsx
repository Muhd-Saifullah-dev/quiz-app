"use client"
import React, { useEffect } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {play} from "@/utils/icons.utils"
import { Select,SelectTrigger,SelectValue,SelectContent,SelectItem } from '@/components/ui/select'
import { useGlobalContext } from '@/context/GlobalContext'
import { useRouter } from 'next/navigation'
import axios from 'axios'

import toast from 'react-hot-toast'


function page() {
  const {quizsetup,setQuizSetup,selectedquiz }=useGlobalContext();
  const router=useRouter()
  useEffect(()=>{
    if(!selectedquiz){
      router.push("/")
    }
  },[selectedquiz,router])

  const handleQuestionChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const value =parseInt(e.target.value,10)
    const maxQuestions=selectedquiz?.questions.length || 1
    const newCount=isNaN(value) || value<1 ?1 : Math.min(value,maxQuestions)
    setQuizSetup((prev:{})=>({...prev,questionCount:newCount}))
  }

  const handleDifficultyChange=(difficulty:string)=>{
    setQuizSetup((prev:{})=>({...prev,difficulty}))
  }


  const startQuiz=async()=>{
    const seletedQuestion=selectedquiz?.questions.slice(0,quizsetup?.questionCount).filter((q:{difficulty:string})=>{
      return quizsetup?.difficulty || q.difficulty.toLowerCase() === selectedquiz?.difficulty.toLowerCase()
    })
    if(seletedQuestion.length > 0){
      try {
        await axios.post(`/api/user/quiz/start`,{
          CategoryId:selectedquiz?.categoryId,
          quizId:selectedquiz?.id
        })
      } catch (error) {
        console.log("eoror starting quiz ",error)
      }
      router.push("/quiz")
    }
    else{
      toast.error("No question found for the selected criteria")
    }
  }
  return (
    <div className=' flex flex-col'>
      {/* Main Content - now using relative positioning */}
      <div className='flex-1 flex items-center justify-center p-4'>
        <div className='w-full max-w-2xl p-6 border-2 rounded-xl shadow-[0_.5rem_0_0_rgba(0,0,0,0.1)]'>
          <h1 className='text-4xl font-bold mb-6'>Quiz setup</h1>
          <div className='space-y-6'>
            <div className='space-y-2'>
              <Label htmlFor='questionCount' className='text-lg'>
                Number of Questions
              </Label>
              <Input type='number' min={1} id='questionCount' value={quizsetup?.questionCount}
              onChange={handleQuestionChange}
              max={selectedquiz?.questions.length}
              />
            </div>
            
            <div className='space-y-2'>
              <Label htmlFor='category' className='text-lg'>
                Category
              </Label>
              <Select disabled>
                <SelectTrigger>
                  <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='general'>General Knowledge</SelectItem>
                  <SelectItem value='science'>Science</SelectItem>
                  <SelectItem value='history'>History</SelectItem>
                  <SelectItem value='geography'>Geography</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='difficulty' className='text-lg'>
                Difficulty
              </Label>
              <Select defaultValue='unspecified' onValueChange={(value)=>handleDifficultyChange(value)}>
                <SelectTrigger id='difficulty'>
                  <SelectValue placeholder="Select Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='unspecified'>Unspecified</SelectItem>
                  <SelectItem value='easy'>Easy</SelectItem>
                  <SelectItem value='medium'>Medium</SelectItem>
                  <SelectItem value='hard'>Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Button Container - now using normal flow with padding */}
      <div className="w-full absolute bottom-0 left-0 py-6 bg-white border-t-2">
  <div className="text-center">
    <Button variant={"blue"} className="px-10 py-6 font-bold text-white rounded-xl text-xl mx-auto" onClick={startQuiz}> 
      <span className="flex items-center justify-center gap-2">
        {play} Start
      </span>
    </Button>
  </div>
</div>
    </div>
  )
}

export default page