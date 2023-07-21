import { FastifyInstance } from 'fastify';

const getMemberTypes = async ({ prisma }: FastifyInstance) => {
  return await prisma.memberType.findMany();
};

const getMemberTypeById = async (id: string, { prisma }: FastifyInstance) => {
  return await prisma.memberType.findFirst({ where: { id } });
};

export { getMemberTypes, getMemberTypeById };
