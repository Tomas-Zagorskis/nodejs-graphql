import { FastifyInstance } from 'fastify';

const getUsers = async ({ prisma }: FastifyInstance) => {
  return await prisma.user.findMany();
};

const getUserById = async (id: string, { prisma }: FastifyInstance) => {
  return await prisma.user.findFirst({ where: { id } });
};

const getSubscribersOfUser = async (id: string, { prisma }: FastifyInstance) => {
  const subs = await prisma.subscribersOnAuthors.findMany({
    where: { subscriberId: id },
    select: { author: true },
  });
  return subs.map((sub) => sub.author);
};

const getSubscriptionsOfUser = async (id: string, { prisma }: FastifyInstance) => {
  const subs = await prisma.subscribersOnAuthors.findMany({
    where: { authorId: id },
    select: { subscriber: true },
  });
  return subs.map((sub) => sub.subscriber);
};

export { getUsers, getUserById, getSubscribersOfUser, getSubscriptionsOfUser };
