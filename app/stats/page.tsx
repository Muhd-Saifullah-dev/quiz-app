import { auth } from '@clerk/nextjs/server'
import React from 'react'
import prisma from '@/utils/prismaClient'
import UserState from '@/components/UserState'
async function page() {
  const {userId}=await auth()
  if(!userId){
    return {error:"You need to Logged in to view this page"}
  }
  const user=await prisma.user.findUnique({
    where:{
      clerkId:userId
    },
    include:{
      categoryStats:{
       include:{
        category:true
       }
      }
    }
  })
  return (
    <div>
      <UserState userState={user}/>
       </div>
  )
}

export default page