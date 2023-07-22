import { Context } from '../types/context.js';

const getMemberTypes = async ({ prisma }: Context) => {
  return await prisma.memberType.findMany();
};

const getMemberTypeById = async (id: string, { prisma }: Context) => {
  return await prisma.memberType.findFirst({ where: { id } });
};

export { getMemberTypes, getMemberTypeById };
