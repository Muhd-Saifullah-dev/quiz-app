import  questions from "@/data/programmingQuestion"
import prisma from "@/utils/prismaClient"
import { error } from "console"

async function seedQuestion() {
        console.log("seeding question ...")
        for(const question of questions){
            const createdQuestion=await prisma.question.create({
                data:{
                    text:question.text,
                    quizId:"67fce5728713d1400c88401f",
                    options:{
                        create:question.options
                    },
                    difficulty:question.difficulty ||  "easy",
                }
                
            })
            console.log(`created question :: ${createdQuestion.text} `)
        }
        console.log(`seeding question is completed`)
}

seedQuestion().catch((e)=>console.log("error in question",error))
.finally(async()=>{
    await prisma.$disconnect()
})