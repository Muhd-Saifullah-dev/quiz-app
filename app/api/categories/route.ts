import { NextRequest,NextResponse } from "next/server";
import prisma from "../../../utils/prismaClient"


export async function GET(req:NextRequest,res:NextResponse) {
    try {
        const categories=await prisma.category.findMany({})
        return NextResponse.json(categories)
    } catch (error) {
        console.log("there was an error in gettingg categories :: ",error)
        return NextResponse.json({error:"there was an error in gettingg categories"},{status:500})
    }
}