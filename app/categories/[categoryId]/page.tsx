import { auth } from "@clerk/nextjs/server";
import React from "react";
import prisma from "@/utils/prismaClient";
import { IQuiz,ProtectOptions } from "@/types/type";
import QuizCard from "@/components/quiz/QuizCard";
import { aj } from "@/lib/arcjet";
import {request} from "@arcjet/next"
import CountDown from "@/components/CountDown";

interface ProtectionOptions {
  requested: number;
  userId?: string; // Make optional if needed
  // Add other properties your Arcjet config expects
}

async function page({ params }: any) {
  const { categoryId } = await params;
  const { userId } = await auth();
  const req=await request()
  const optionsForUser: ProtectionOptions = {
    requested: 2,
    userId: userId ?? undefined, // or "anonymous" if you prefer
  };
  const decision = await aj.protect(req,optionsForUser);

    if(decision.isDenied()){
      if(decision.reason.isRateLimit()){
        const resetTime=decision.reason?.resetTime;
          if(!resetTime){
            return(
              <div>
                <h1>Rate Limit exceeded</h1>
              </div>
            )
          }
            // calculate the time left into server 
            const currentTime=new Date()
            const resetTimeStamp=new Date(resetTime).getTime()
            const timeLeft=Math.max(Math.ceil((resetTimeStamp-currentTime.getTime())/1000),0)
          
        return <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl font-bold text-center text-red-400 ">Too many requests :( </h1>
          <p>You have exceeded the rate limit for this request</p>
          <CountDown initialTimeLeft={timeLeft}/>
        </div>
      }
    }
 

  if (!categoryId) {
    return null;
  }
  const quizzes = await prisma.quiz.findMany({
    where: { categoryId },
    include: {
      questions: {
        select: {
          id: true,
          text: true,
          difficulty: true,
          options: {
            select: {
              id: true,
              text: true,
              isCorrect: true,
            },
          },
        },
      },
    },
    orderBy: {
      id: "asc",
    },
  });

  return (
    <div>
      <h1 className="mb-6 text-4xl font-bold">All Quizzes</h1>
      {quizzes.length > 0 ? (
        <div className="mb-8 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
         {quizzes.map((quiz: IQuiz) => (
        <QuizCard key={quiz.id} quiz={quiz} />
      
      ))}
        </div>
      ) : (
        <h1 className="text-2xl text-center mt-4">
          No quize Found for this category{" "}
        </h1>
      )}
    </div>
  );
}

export default page;
