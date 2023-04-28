import { Prisma, PrismaClient } from "@prisma/client";

const client = new PrismaClient();


const main = async ()=>{
    const users = await client.user.findMany();
    console.log("users List :",users)
}