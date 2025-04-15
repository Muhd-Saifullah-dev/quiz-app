import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,res:NextResponse){
 
    try {
        const {userId}=await auth()
        if(!userId){
            return NextResponse.json({error:"UnAuthorized"},{status:400})
        }
        const user=await prisma.user.findUnique({
            where:{
                clerkId:userId
            }
        })
        if(!user){
            return NextResponse.json({error:"User not found "},{status:404})
        }
        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json({error:"Error getting User  "},{status:500})
    }
}