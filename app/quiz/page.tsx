"use client";
import { useGlobalContext } from "@/context/GlobalContext";
import { IOption, IQuestion, IResponse } from "@/types/type";
import { captureRejectionSymbol } from "events";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function page() {
  const router = useRouter();
  const { selectedquiz, quizsetup, setQuizSetup, setQuizResponse } =
    useGlobalContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState(null) as any;
  const [responses, setResponses] = useState<IResponse[]>([]);
  const [shuffledOption, setShuffledOption] =React.useState<IOption[]>([]);
  const [shuffledQuestion, setShuffledQuestion] =React.useState<IQuestion[]>([]) as any;

  if (!selectedquiz) {
    router.push("/");
    return null;
  }

  
  // shuffle question when the quiz started

  useEffect(() => {
    const filterQuestions = selectedquiz.questions.filter(
      (q: { difficulty: string }) => {
        return (
          !quizsetup.difficulty ||
          quizsetup?.difficulty === "unspecified" ||
          q.difficulty === quizsetup?.difficulty
        )
      }
      
    ).slice(0,quizsetup?.questionCount);

    setShuffledQuestion(ShuffledArrays([...filterQuestions]))
  }, [selectedquiz, quizsetup]);

  

  const ShuffledArrays = (array: any[]) => {
    for (let i = array.length - 1; i > 0; --i) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  //shuffle option when the active option 
  useEffect(() => {
    if (shuffledQuestion[currentIndex]) {
      // shuffle options for the current question
      setShuffledOption(ShuffledArrays([...shuffledQuestion[currentIndex].options])
      );
    }
  }, [shuffledQuestion, currentIndex]);


  const handleActiveQuestion=async(option:any)=>{
    if(!shuffledQuestion[currentIndex]) return;
    
    
    const response={
        questionId:shuffledQuestion[currentIndex].id,
        optionId:option.id,
        isCorrect:option.isCorrect
    };
    setResponses((prev)=>{
        const existingIndex=prev.findIndex((res)=>{
            return res.questionId===response.questionId
        })
        if (existingIndex !== -1) {
            // update the response
            const updatedResponses = [...prev];
            updatedResponses[existingIndex] = response;
    
            return updatedResponses;
          }else{
            return [...prev,response]
          }
    })
    setActiveQuestion(option)
}

  return (<div className="py-[2.5rem]">
    {shuffledQuestion[currentIndex] ? (
        <div className="space-y-6">
           <div className="flex flex-col gap-6">
           <p className="py-3 px-6 border-2 text-xl font-bold self-end rounded-lg shadow-[0_.3rem_0_0_rgba(0,0,0,0.1)]">
                Quesstion: <span>{currentIndex + 1} / </span>{" "}
                <span className="text-3xl">{shuffledQuestion.length}</span>
            </p>
            <h1 className="mt-4 px-10 text-5xl font-bold text-center">
                {shuffledQuestion[currentIndex].text}
            </h1>
           </div>
           
           <div className="pt-14 space-y-4">
            {shuffledOption.map((option,index)=>(
                <button key={index}
                className={`relative group py-3 w-full text-center border-2 text-lg font-semibold rounded-lg
                    hover:bg-[rgba(0,0,0,0.03)] transition-all duration-200 ease-in-out
                    ${option.text===activeQuestion.text ?"bg-green-100 border-green-500 shadow-[0_.3rem_0_0_#51bf22] hover:bg-green-100 hover:border-green-500 ":"shadow-[0_.3rem_0_0_rgba(0,0,0,0.1)] "}
                `}
                onClick={()=>handleActiveQuestion(option as any)}
                >{option.text}</button>
            ) )}
           </div>
        </div>
    ):(
        <div></div>
    )}
  </div>
  );
}

export default page;
