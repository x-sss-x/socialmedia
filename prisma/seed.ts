import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const main = async () => {
  await prisma.comments.deleteMany();
  await prisma.posts.deleteMany();
  await prisma.users.deleteMany();

  for (let i = 0; i < 10; i++) {
    await prisma.users.create({
      data: {
        email: faker.internet.email("jack"),
        username: faker.internet.userName(),
        posts: {
          create: [
            {
              content: faker.lorem.paragraphs(),
              title: faker.lorem.words(10),
            },
            {
              content: faker.lorem.paragraphs(),
              title: faker.lorem.words(10),
            },
          ],
        },
      },
    });
  }

  const users = await prisma.users.findMany();
  const post = await prisma.posts.findFirst();

  await Promise.all(
    //maping the each user from database
    users.map(async (user) => {
      //inserting 2 comments for-each user
      await prisma.comments.createMany({
        data: [
          {
            comment: faker.lorem.sentence(),
            postsId: post?.id!,
            userId: user?.id!,
          },
          {
            comment: faker.lorem.sentence(),
            postsId: post?.id!,
            userId: user?.id!,
          },
        ],
      });
    })
  );
};

main()
  .then(() => console.log("Data seeded successfully 😎🚀"))
  .catch((e) => console.log(e))
  .finally(async () => await prisma.$disconnect());
