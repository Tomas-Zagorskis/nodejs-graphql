import { FastifyInstance } from 'fastify';
import { UserDTO } from '../types/user.js';

const getUsers = async ({ prisma }: FastifyInstance) => {
  return await prisma.user.findMany();
};

const getUserById = async (id: string, { prisma }: FastifyInstance) => {
  return await prisma.user.findUnique({ where: { id } });
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

const createUser = async (user: UserDTO, { prisma }: FastifyInstance) => {
  return await prisma.user.create({ data: user });
};

const updateUser = async (id: string, user: Partial<UserDTO>, ctx: FastifyInstance) => {
  return await ctx.prisma.user.update({
    where: {
      id,
    },
    data: user,
  });
};

const deleteUser = async (id: string, ctx: FastifyInstance) => {
  return await ctx.prisma.user.delete({
    where: {
      id,
    },
  });
};

export {
  createUser,
  deleteUser,
  getSubscribersOfUser,
  getSubscriptionsOfUser,
  getUserById,
  getUsers,
  updateUser,
};
