import { Context } from '../types/context.js';

const getMemberTypes = async ({ prisma }: Context) => {
  return await prisma.memberType.findMany();
};

const getMemberTypeById = async (id: string, { prisma }: Context) => {
  return await prisma.memberType.findFirst({ where: { id } });
};

const getMemberTypeByMemberId = async (id: string, { loader }: Context) => {
  return await loader.member.load(id);
};

export { getMemberTypes, getMemberTypeById, getMemberTypeByMemberId };
