import { auth } from "@clerk/nextjs/server";
import { NextRequest,NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";

export async function POST(req:NextRequest,res:NextResponse){
    try {
        const {userId:clerkId}=await auth()
        const {categoryId}=await  req.json()
        if(!clerkId){
            return NextResponse.json({error:"UnAuthorized"},{status:400})
        }
        const user=await prisma.user.findUnique({
            where:{clerkId}
        })
        if(!user){
            return NextResponse.json({error:"User not found"},{status:404})
        }
        const userId=user.id
        let stat=await prisma.categoryStats.findUnique({
            where:{
                userId_categoryId:{
                    categoryId,
                    userId
                }
            }
        })
        if(!stat){
            stat=await prisma.categoryStats.create({
                data:{
                    userId,
                    categoryId,
                    attempts:1,
                    lastAttempt:new Date()
                }
            })
        }else{
            await prisma.categoryStats.update({
                where:{
                    userId_categoryId:{
                        userId,
                        categoryId
                    }
                },
                data:{
                    attempts:stat.attempts+1,
                    lastAttempt:new Date()
                }
            })
        }

        return NextResponse.json(stat)
    } catch (error) {
        console.log(`error starting in quizzing ${error}`)
        return NextResponse.json({error:"Error satrting quiz"},{status:500})
    }
}