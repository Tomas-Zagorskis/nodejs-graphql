import { Context } from '../types/context.js';
import { UserDTO } from '../types/user.js';

const getUsers = async ({ prisma }: Context) => {
  return await prisma.user.findMany();
};

const getUserById = async (id: string, { prisma }: Context) => {
  return await prisma.user.findUnique({ where: { id } });
};

const getSubscribersOfUser = async (id: string, { loader }: Context) => {
  return loader.userSubscribedTo.load(id);
};

const getSubscriptionsOfUser = async (id: string, { loader }: Context) => {
  return loader.subscribedToUser.load(id);
};

const createUser = async (user: UserDTO, { prisma }: Context) => {
  return await prisma.user.create({ data: user });
};

const updateUser = async (id: string, user: Partial<UserDTO>, { prisma }: Context) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data: user,
  });
};

const deleteUser = async (id: string, { prisma }: Context) => {
  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });
    return true;
  } catch {
    return false;
  }
};

const subscribeTo = async (userId: string, authorId: string, { prisma }: Context) => {
  await prisma.subscribersOnAuthors.create({
    data: {
      subscriberId: userId,
      authorId,
    },
  });

  return await prisma.user.findUnique({ where: { id: userId } });
};

const unsubscribeFrom = async (userId: string, authorId: string, { prisma }: Context) => {
  try {
    await prisma.subscribersOnAuthors.deleteMany({
      where: {
        subscriberId: userId,
        authorId,
      },
    });
    return true;
  } catch {
    return false;
  }
};

export {
  createUser,
  deleteUser,
  getSubscribersOfUser,
  getSubscriptionsOfUser,
  getUserById,
  getUsers,
  subscribeTo,
  unsubscribeFrom,
  updateUser,
};
