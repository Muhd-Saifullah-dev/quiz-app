import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";

export async function POST(req:NextRequest,res:NextResponse){
try {
    const {userId:clerkId}=await auth()
    const {categoryId, quizId, score, response}=await req.json()
    if(!clerkId){
        return NextResponse.json({error:"UnAuthorized"},{status:401})
    }
    if(!categoryId || !quizId || !score || !Array.isArray(response)){
        return NextResponse.json({error:"Invalid Request"},{status:400})
    }
    const user=await prisma.user.findUnique({
        where:{
            clerkId
        }
    })
    if(!user) return  NextResponse.json({error:"User not found"},{status:404})

        let stat=await prisma.categoryStats.findUnique({
            where:{
                userId_categoryId:{
                    userId:user.id,
                    categoryId
                }
            }
        })
        if(stat){
            const totalScore=(stat.averageScore || 0) * stat.completed +score
            const NewAverageScore=totalScore/(stat.completed+1)
            stat=await prisma.categoryStats.update({
                where:{id:stat.id},
                data:{
                    completed:stat.completed+1,
                    averageScore:NewAverageScore,
                    lastAttempt:new Date()
                }
            })
        }else{
            stat=await prisma.categoryStats.create({
                data:{
                    userId:user.id,
                    categoryId,
                    attempts:1,
                    completed:1,
                    averageScore:score,
                    lastAttempt:new Date()
                }
            })
        }

        return NextResponse.json(stat)
} catch (error) {
    console.log("error in finish quizing :: ",error)
    return NextResponse.json({error:"error in finish quizing"},{status:500});
}
}