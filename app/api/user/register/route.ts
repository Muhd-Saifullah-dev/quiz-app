import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";


export async function POST(req:NextRequest,res:NextResponse) {
    try {
        const {userId}=await auth()
        if(!userId){
            return NextResponse.json({error:"UnAuthorized"},{status:400})
        }
        let user=await prisma.user.findUnique({
            where:{
                clerkId:userId
            }
        })
        if(!user){
            user=await prisma.user.create({
                data:{
                    clerkId:userId
                }
            })
        }
        else{
            console.log("user is already exist")
        }
        return NextResponse.json(user)
    } catch (error) {
        console.log(``)
        return NextResponse.json({error:"error in Creating User "},{status:500})

    }
    
}