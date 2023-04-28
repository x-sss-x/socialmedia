import { Prisma, PrismaClient } from "@prisma/client";

const client = new PrismaClient();

const getUsers = (): Prisma.userCreateInput[] => [
  {
    username: "jacksparrow",
    email: "jack@gmail.com",
  },
  {
    username: "will turner",
    email: "will@gmail.com",
  },
  {
    username: "barbossa",
    email: "barbossa@gmail.com",
  },
  {
    username: "Captain",
    email: "captain@gmail.com",
  },
  {
    username: "Davy Jhones",
    email: "davy@gmail.com",
  },
];

const getPosts = (userId: string): Prisma.postsCreateManyInput[] => [
  {
    content: "some cool post 1",
    title: "Cool Post 1",
    userId: userId,
  },
  {
    content: "some cool post 2",
    title: "Cool Post 2",
    userId: userId,
  },
];

const getComments = (
  postsId: string,
  userId: string
): Prisma.commentsCreateManyInput[] => [
  {
    comment: "Nice",
    postsId:postsId,
    userId:userId,
  },
  {
    comment: "Nice One jack",
    postsId:postsId,
    userId:userId,
  },
];

const main = async () => {
    
  //inserting users data
  await client.user.createMany({
    data: getUsers(),
  });

  //we are fetching first record in users entity
  const users = await client.user.findUnique({
    where: {
      username: "jacksparrow",
    },
  });

  //creating many post
  await client.posts.createMany({
    data: getPosts(users?.id!),
  });

  const posts = await client.posts.findFirst();

  //we are fetching first record in users entity
  await client.comments.createMany({
    data: getComments(posts!.id!, users!.id!),
  });
};

main()
  .then(() => {
    console.log("Successfully Seeded");
  })
  .catch((e) => {
    console.log(e);
  });
