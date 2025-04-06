import  prisma from "../utils/prismaClient"


async function addCategory() {
    try {
        console.log("adding category ")
        const categories = [
            {
              name: "Science",
              description:
                "Science is the pursuit and application of knowledge and understanding of the natural and social world following a systematic methodology based on evidence.",
            },
            {
              name: "Technology",
              description: "Dive into the latest technological advancements.",
            },
            {
              name: "Programming",
              description: "Learn about coding and software development.",
            },
            {
              name: "Computer Science",
              description: "Understand the fundamentals of computers and algorithms.",
            },
            {
              name: "Mathematics",
              description: "Master the language of numbers and patterns.",
            },
            {
              name: "History",
              description: "Discover the events that shaped our world.",
            },
            {
              name: "Art",
              description: "Appreciate creativity through various forms of art.",
            },
            {
              name: "Geography",
              description: "Explore the physical features of our planet.",
            },
            {
              name: "Physics",
              description: "Unravel the laws governing the universe.",
            },
            { name: "Biology", description: "Study the science of living organisms." },
          ];
          for(const category of categories){
            await prisma.category.create({
                data:category

            })
          }
          console.log("add Categories successfully")
    } catch (error) {
        console.log("error",error)
        process.exit(1)
    }
}

addCategory()
.catch((error)=>{
    console.log(`ERROR IN ADD CATEGORY FUNCTION :: ${error}`)
}).finally(async ()=>{
    await prisma.$disconnect()
})