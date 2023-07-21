import { FastifyInstance } from 'fastify';

const getMemberTypes = async ({ prisma }: FastifyInstance) => {
  return await prisma.post.findMany();
};

const getMemberTypeById = async (id: string, { prisma }: FastifyInstance) => {
  return await prisma.post.findFirst({ where: { id } });
};

export { getMemberTypes, getMemberTypeById };
