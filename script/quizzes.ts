import prisma from "@/utils/prismaClient"

const quizzess=[
    {
        title: "Computer Science Basics",
        description: "A quiz about fundamental computer science concepts.",
        categoryId: "67f227474e5c93d7b60683df", // Replace with the actual category ID
      },
      {
        title: "Programming Fundamentals",
        description: "Test your knowledge of basic programming concepts.",
        categoryId: "67f227474e5c93d7b60683de",
      },
      {
        title: "Data Structures",
        description: "Assess your understanding of data structures.",
        categoryId: "67f227474e5c93d7b60683df",
      },
      {
        title: "Physics",
        description: "Test your knowledge of physics",
        categoryId: "67f227494e5c93d7b60683e4",
      },
      {
        title: "Biology",
        description: "Test your knowledge of physics",
        categoryId: "67f227494e5c93d7b60683e5",
      },
      {
        title: "Chemistry",
        description: "Test your knowledge of physics",
        categoryId: "67f227474e5c93d7b60683dc",
      },
]

async function seedQuizes(){
    try {
        console.log("seeding quizes")
        for(const quiz of quizzess){
            const createdQuiz=await prisma.quiz.create({
                data:quiz
        
            })
            console.log(`quiz created successfully : ${createdQuiz.title}`)
        }
        console.log("seeding quizes completed")
    } catch (error) {
        console.log("erorr in seedquiz ::",error)
        process.exit(1)
    }
}

seedQuizes().finally(async function (){
    await prisma.$disconnect()
})