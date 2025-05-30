import { PrismaClient } from "@prisma/client"

  let prisma:PrismaClient
  declare global{
    var prisma:PrismaClient
  }
    if(process.env.NODE_ENV==="production"){
         prisma=new PrismaClient({
            log:['query','info']
        })
    }else{
        if(!global.prisma){
            global.prisma=new PrismaClient({
                log:['query']
            })
        }
        prisma=global.prisma
    }

export default prisma



