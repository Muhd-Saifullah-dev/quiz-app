"use client"
import { useUser } from "@clerk/nextjs";
import React from "react";
import Loader from "./Loader";
import Image from "next/image";
import { formatedTime } from "@/utils/formatedTime";
import { checkAbc, crosshairs } from "@/utils/icons.utils";
import CategoryBarChart from "./CategoryBarChart";
import { Table,TableBody,TableCell,TableHead,TableHeader, TableRow } from "./ui/table";
import { ICategoryStats } from "@/types/type";

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

  const latestStats=userState.categoryStats.slice(0,2).sort((a:any,b:any)=>{
    return new Date(b.lastAttempt).getTime() - new Date(a.lastAttempt).getTime()
  })
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
        {latestStats.map((category:any,index:number)=>(
          <CategoryBarChart key={index} categoryData={category} />
        ))}
      </div>
        <div className="mt-4">
          <h1 className="font-bold text-2xl">Detailed Category Stats</h1>
          <p className="text-muted-foreground">Breakdown of performance by category</p>
        </div>
        <div className="border-2 rounded-lg  shadow-[0._3rem_0_0_rgba(0,0,0,0.1)]">
          <Table>
              <TableHeader className="text-center">
                <TableRow>
                  <TableHead className="text-center">Category</TableHead>
                  <TableHead className="text-center">Attempts</TableHead>
                  <TableHead className="text-center">Completed</TableHead>
                  <TableHead className="text-center">Average Score</TableHead>
                  <TableHead className="text-center">last Attempt</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userState.categoryStats.map((category:ICategoryStats)=>(
                  <TableRow key={category.id} className="text-center">
                  <TableCell className="font-semibold py-4 ">{category.category.name}</TableCell>
                  <TableCell className="font-semibold ">{category.attempts}</TableCell>
                  <TableCell className="font-semibold  ">{category.completed}</TableCell>
                  <TableCell className="font-semibold  ">{category.averageScore!==null?category.averageScore.toFixed(2):"N/A"}</TableCell>
                  <TableCell className="font-semibold  ">{formatedTime(category.lastAttempt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </div>
    </div>
  );
}

export default UserState;
