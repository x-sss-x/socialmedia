import {PrismaClient} from "@prisma/client"
import {faker} from "@faker-js/faker"

const prisma = new PrismaClient();

const main = async ()=>{
   
    await prisma.users.deleteMany()
    await prisma.posts.deleteMany()
    
   for(let i=0; i<10; i++){
    await prisma.users.create({
        data:{
            email:faker.internet.email(),
            username:faker.internet.userName(),
            posts:{
                create:{
                    content:faker.lorem.paragraph(),
                    title:faker.lorem.word(),
                }
            }
        }
    })
   }
    
}

main().then((e)=>console.log("seeded")).catch(e=>console.log(e)).finally(async()=> await prisma.$disconnect())