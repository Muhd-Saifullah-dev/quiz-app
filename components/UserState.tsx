"use client"
import { useUser } from "@clerk/nextjs";
import React from "react";
import Loader from "./Loader";
import Image from "next/image";
import { formatedTime } from "@/utils/formatedTime";
import { checkAbc, crosshairs } from "@/utils/icons.utils";
import CategoryBarChart from "./CategoryBarChart";


function UserState({ userState }: any) {
  interface ClerkUser {
    imageUrl?: string;
    hasImage?: boolean;
  }
  const { user, isLoaded } = useUser();
  if (!isLoaded) {
    return <Loader />;
  }
  if (!user) return <div>Please sign in</div>;

  const recentAttemptDate=userState.categoryStats.reduce((acc:any,curr:any)=>
{
    const currentDate=new Date(curr.lastAttempt)
    return currentDate > acc ? currentDate : acc
},
    new Date(0)
)

    console.log("userState :: ",userState)
const totalAttempts = userState?.categoryStats.reduce(
    (acc: number, curr: any) => acc + curr.attempts,
    0
  );
  const totalCompleted = userState?.categoryStats.reduce(
    (acc: number, curr: any) => acc + curr.completed,
    0
  );
  return (
    <div className="flex flex-col gap-4">
      <div className="h-[15rem] px-8 flex items-center justify-center border-2 rounded-xl shadow-[0_.3rem_0_0_rgba(0,0,0,0.1)]">
        <Image
          src={(user as ClerkUser)?.imageUrl ?? "/user.png"}
          alt="profile picture"
          width={200}
          height={200}
          className="rounded-full border-2 shadow-[0_.3rem_0_0_rgba(0,0,0,0.1)]"
        />
      </div>
      <div className="mt-4">
        <h1 className="text-2xl font-bold">Overview</h1>
        <p className="text-muted-foreground">A summary of your recent activity and performance</p>
      </div>

      <div className="grid grid-cols-3 gap-6 font-semibold">
        <div className="py-4 px-4 flex flex-col gap-1 border-2 rounded-lg shadow-[0_.3rem_0_0_rgba(0,0,0,0.1)]">
            <h2 className="font-bold text-xl ">{user?.firstName}</h2>
            <p className="text-gray-400 font-semibold">Recent Attempt</p>
            <p className="text-sm font-semibold text-gray-400">
                {formatedTime(recentAttemptDate)}
            </p>
        </div>


        <div className="py-4 px-4 flex gap-2 border-2 rounded-lg shadow-[0_.3rem_0_0_rgba(0,0,0,0.1)]">
            <div className="text-2xl text-blue-400">{crosshairs}</div>
            <div>
                <p className="font-semibold">Total Attempts</p>
                <p className="mt-2 font-bold text-3xl">{totalAttempts}</p>
            </div>
        </div>


        <div className="py-4 px-4 flex gap-2 border-2 rounded-lg shadow-[0_.3rem_0_0_rgba(0,0,0,0.1)]">
        <div className="text-2xl text-blue-400">{checkAbc}</div> 
        <div >
            <p className="font-bold">Total Completed</p>
            <p className="mt-2 font-bold text-3xl">{totalCompleted}</p>
        </div>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-6">
        {userState?.categoryStats.map((category:any,index:number)=>(
          <CategoryBarChart key={index} categoryData={category} />
        ))}
      </div>
    </div>
  );
}

export default UserState;
