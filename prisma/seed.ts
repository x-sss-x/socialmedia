import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const main = async () => {
  await prisma.comments.deleteMany();
  await prisma.users.deleteMany();

  for (let i = 0; i < 5; i++) {
    await prisma.users.create({
      data: {
        username: faker.internet.userName(),
        comments: {
          createMany: {
            data: [
              {
                content: faker.lorem.sentence(),
              },
              {
                content: faker.lorem.sentence(),
              },
              {
                content: faker.lorem.sentence(),
              },
            ],
          },
        },
      },
    });
  }
};

main()
  .then(() => console.log("Data seeded successfully 😎🚀"))
  .catch((e) => console.log(e))
  .finally(async () => await prisma.$disconnect());
