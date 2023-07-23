import { GraphQLResolveInfo } from 'graphql';
import {
  ResolveTree,
  parseResolveInfo,
  simplifyParsedResolveInfoFragmentWithType,
} from 'graphql-parse-resolve-info';

import { Context } from '../types/context.js';
import { User, UserDTO } from '../types/user.js';

const getUsers = async ({ prisma, loader }: Context, info: GraphQLResolveInfo) => {
  const parsedInfo = parseResolveInfo(info);
  const { fields } = simplifyParsedResolveInfoFragmentWithType(
    parsedInfo as ResolveTree,
    info.returnType,
  );

  const userSubscribedTo = 'userSubscribedTo' in fields;
  const subscribedToUser = 'subscribedToUser' in fields;

  const users = await prisma.user.findMany({
    include: { userSubscribedTo, subscribedToUser },
  });

  users.forEach((user) => loader.user.prime(user.id, user));
  return users;
};

const getUserById = async (id: string, { loader }: Context) => {
  return await loader.user.load(id);
};

const getSubscribersOfUser = async ({ userSubscribedTo }: User, { loader }: Context) => {
  if (Array.isArray(userSubscribedTo)) {
    const authorIdList = userSubscribedTo.map(({ authorId }) => authorId);
    return loader.user.loadMany(authorIdList);
  }
  return null;
};

const getSubscriptionsOfUser = async (
  { subscribedToUser }: User,
  { loader }: Context,
) => {
  if (Array.isArray(subscribedToUser)) {
    const subIdList = subscribedToUser.map(({ subscriberId }) => subscriberId);
    return loader.user.loadMany(subIdList);
  }
  return null;
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
